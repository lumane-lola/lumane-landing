/* Lumane Health — shared site behavior
   Reveal-on-scroll, header nav fade, hero parallax, and soft page transitions. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header center links fade out once the page is scrolled.
  var onScroll = function () {
    var links = document.querySelector('[data-nav-links]');
    if (links) {
      var hide = window.scrollY > 60;
      links.style.opacity = hide ? '0' : '1';
      links.style.pointerEvents = hide ? 'none' : 'auto';
    }
    var media = document.querySelector('[data-parallax]');
    if (media && !reduceMotion) {
      var y = Math.min(window.scrollY * 0.1, 46);
      media.style.transform = 'translateY(' + y + 'px) scale(1.14)';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal-on-scroll. When arriving via an internal nav click, render instantly
  // so the two pages feel like one continuous site.
  var fastNav = false;
  try {
    fastNav = sessionStorage.getItem('lu-nav') === '1';
    if (fastNav) sessionStorage.removeItem('lu-nav');
  } catch (err) {}

  if (fastNav) {
    document.documentElement.classList.add('lu-instant');
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-in');
    });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  // Soft cross-fade between internal pages (links marked with data-nav).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-nav]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    var norm = function (p) { return p.replace(/index\.html$/, ''); };
    if (norm(new URL(href, location.href).pathname) === norm(location.pathname)) return;
    try { sessionStorage.setItem('lu-nav', '1'); } catch (err) {}
    document.documentElement.classList.add('lu-page-out');
    setTimeout(function () { location.href = href; }, 150);
  }, true);

  // "Let's talk" modal — same demo-booking backend as before (Apps Script via
  // config.js); links keep their mailto: href as the no-JS fallback.
  var FACILITY_TYPES = [
    { id: 'skilled-nursing', label: 'Skilled Nursing' },
    { id: 'assisted-living', label: 'Assisted Living' },
    { id: 'home-health', label: 'Home Health' },
    { id: 'hospital', label: 'Hospital' },
    { id: 'other', label: 'Other' },
  ];
  var overlay = null;
  var submitted = false;
  var lastFocus = null;

  function fieldError(input, help, message) {
    input && input.classList.toggle('has-error', !!message);
    if (help) {
      help.textContent = message || '';
      help.classList.toggle('error', !!message);
    }
  }

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'talk-overlay';
    overlay.innerHTML =
      '<div class="talk-modal" role="dialog" aria-modal="true" aria-labelledby="talk-title">' +
        '<button type="button" class="talk-close" aria-label="Close">&#10005;</button>' +
        '<div class="talk-body">' +
          '<div class="eyebrow">Book a demo</div>' +
          '<h2 id="talk-title">Let’s talk.</h2>' +
          '<p class="sub">Tell us a little about your facility. We’ll reach out within one business day to schedule a 15-minute demo.</p>' +
          '<form class="talk-form" novalidate>' +
            '<div>' +
              '<label class="field-label" for="talk-name">Your name</label>' +
              '<input id="talk-name" name="name" type="text" class="form-input" placeholder="Maria Reyes" autocomplete="name">' +
              '<div class="form-help" data-help="name"></div>' +
            '</div>' +
            '<div class="talk-row-2">' +
              '<div>' +
                '<label class="field-label" for="talk-facility">Facility name</label>' +
                '<input id="talk-facility" name="facilityName" type="text" class="form-input" placeholder="Mercy Manor" autocomplete="organization">' +
                '<div class="form-help" data-help="facilityName"></div>' +
              '</div>' +
              '<div>' +
                '<label class="field-label" for="talk-role">Your role</label>' +
                '<input id="talk-role" name="role" type="text" class="form-input" placeholder="Director of Nursing" autocomplete="organization-title">' +
                '<div class="form-help" data-help="role"></div>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<label class="field-label">Facility type</label>' +
              '<div class="seg-group" role="radiogroup" aria-label="Facility type"></div>' +
              '<div class="form-help" data-help="facilityType"></div>' +
            '</div>' +
            '<div>' +
              '<label class="field-label" for="talk-email">Work email</label>' +
              '<input id="talk-email" name="email" type="email" class="form-input" placeholder="you@facility.org" autocomplete="email">' +
              '<div class="form-help" data-help="email"></div>' +
            '</div>' +
            '<div>' +
              '<label class="field-label" for="talk-phone">Phone <span class="optional">— optional</span></label>' +
              '<input id="talk-phone" name="phone" type="tel" class="form-input" placeholder="(555) 123-4567" autocomplete="tel">' +
            '</div>' +
            '<div>' +
              '<button type="submit" class="btn-pill talk-submit">Book my demo →</button>' +
              '<div class="form-help" data-help="submit" style="text-align: center;"></div>' +
            '</div>' +
            '<div class="talk-alt">or email <a href="mailto:team@lumane.health">team@lumane.health</a></div>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var seg = overlay.querySelector('.seg-group');
    FACILITY_TYPES.forEach(function (t) {
      var opt = document.createElement('div');
      opt.className = 'seg-option';
      opt.setAttribute('role', 'radio');
      opt.setAttribute('aria-checked', 'false');
      opt.setAttribute('tabindex', '0');
      opt.dataset.value = t.id;
      opt.textContent = t.label;
      var select = function () {
        seg.querySelectorAll('.seg-option').forEach(function (o) {
          o.classList.toggle('is-selected', o === opt);
          o.setAttribute('aria-checked', o === opt ? 'true' : 'false');
        });
        fieldError(null, overlay.querySelector('[data-help="facilityType"]'), '');
      };
      opt.addEventListener('click', select);
      opt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
      });
      seg.appendChild(opt);
    });

    overlay.querySelector('.talk-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('form').addEventListener('submit', handleSubmit);
  }

  function openModal() {
    if (!overlay) buildModal();
    if (submitted) {
      overlay.remove();
      overlay = null;
      submitted = false;
      buildModal();
    }
    lastFocus = document.activeElement;
    overlay.style.display = 'flex';
    void overlay.offsetHeight; /* flush styles so the open transition still plays */
    overlay.classList.add('is-open');
    document.body.classList.add('talk-lock');
    var first = overlay.querySelector('#talk-name');
    if (first) setTimeout(function () { first.focus(); }, 120);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('talk-lock');
    setTimeout(function () { if (overlay) overlay.style.display = 'none'; }, 200);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    var form = overlay.querySelector('form');
    var get = function (name) { return form.querySelector('[name="' + name + '"]'); };
    var help = function (key) { return overlay.querySelector('[data-help="' + key + '"]'); };
    var selected = overlay.querySelector('.seg-option.is-selected');
    var values = {
      name: get('name').value.trim(),
      facilityName: get('facilityName').value.trim(),
      role: get('role').value.trim(),
      facilityType: selected ? selected.dataset.value : '',
      email: get('email').value.trim(),
      phone: get('phone').value.trim(),
    };

    var hasError = false;
    ['name', 'facilityName', 'role', 'email'].forEach(function (key) {
      var message = !values[key] ? 'Required' : '';
      if (key === 'email' && values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        message = 'Enter a valid email';
      }
      fieldError(get(key), help(key), message);
      if (message) hasError = true;
    });
    if (!values.facilityType) {
      fieldError(null, help('facilityType'), 'Required');
      hasError = true;
    }
    if (hasError) return;

    var url = (window.LUMANE_CONFIG || {}).SIGNUP_URL;
    if (!url) {
      fieldError(null, help('submit'), 'Submission is temporarily unavailable. Please email team@lumane.health.');
      return;
    }

    var button = overlay.querySelector('.talk-submit');
    button.disabled = true;
    button.textContent = 'Submitting…';
    fieldError(null, help('submit'), '');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        formType: 'facility-demo',
        name: values.name,
        facilityName: values.facilityName,
        role: values.role,
        facilityType: values.facilityType,
        email: values.email,
        phone: values.phone,
        userAgent: navigator.userAgent,
      }),
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (json) {
        if (!res.ok || !json.ok) {
          throw new Error((json && json.error) || 'Something went wrong. Please try again.');
        }
        submitted = true;
        overlay.querySelector('.talk-body').innerHTML =
          '<div class="talk-success">' +
            '<div class="check">✓</div>' +
            '<h2>Thanks — we’ll be in touch.</h2>' +
            '<p>We’ll reach out to <strong>' + values.email.replace(/</g, '&lt;') + '</strong> within one business day to schedule your 15-minute demo.</p>' +
          '</div>';
      });
    }).catch(function (err) {
      var message = err && err.message ? err.message : 'Network error. Please check your connection and try again.';
      if (err instanceof TypeError) message = 'Network error. Please check your connection and try again.';
      fieldError(null, help('submit'), message);
    }).then(function () {
      if (!submitted && button) {
        button.disabled = false;
        button.textContent = 'Book my demo →';
      }
    });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-talk]');
    if (!t) return;
    e.preventDefault();
    openModal();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) closeModal();
  });

  // Keep a hero video playing if one is present.
  var video = document.querySelector('.hero-media video');
  if (video) {
    setInterval(function () {
      if (video.paused) {
        video.muted = true;
        video.loop = true;
        video.play().catch(function () {});
      }
    }, 800);
  }
})();
