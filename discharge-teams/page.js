/* Lumane Health — /discharge-teams page behavior
   Offset smooth-scroll to anchors, hero plan status reveal, and the Early Access
   form (POSTs to the Apps Script endpoint in config.js). */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollToTarget(id, focusEl) {
    var el = document.getElementById(id);
    if (!el) return;
    var nav = document.querySelector('.cm-nav');
    var offset = (nav ? nav.offsetHeight : 72) + 16;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (focusEl) focusEl.focus({ preventScroll: true });
  }

  function goToForm() {
    var done = document.getElementById('ea-done');
    scrollToTarget('request-form', done && !done.hidden ? done : document.getElementById('ea-name'));
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-scroll],[data-goto-form]');
    if (!t) return;
    e.preventDefault();
    if (t.hasAttribute('data-goto-form')) goToForm();
    else scrollToTarget(t.getAttribute('data-scroll'));
  });

  // Hero plan: statuses rise in once the card is on screen.
  var plan = document.querySelector('[data-plan]');
  if (plan) {
    if (!('IntersectionObserver' in window)) {
      plan.classList.add('is-in');
    } else {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) {
          plan.classList.add('is-in');
          io.disconnect();
        }
      }, { threshold: 0.35 });
      io.observe(plan);
    }
  }

  // Early Access form.
  var form = document.querySelector('[data-ea-form]');
  if (!form) return;
  var FIELDS = ['name', 'email', 'role', 'setting', 'org', 'city'];
  var MSG = {
    name: 'Enter your name.',
    email: 'Enter your work email.',
    role: 'Choose your role.',
    setting: 'Choose your setting.',
    org: 'Enter your facility or organization.',
    city: 'Enter your city and state.',
  };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var touched = false;

  function values() {
    var v = {};
    FIELDS.concat('phone').forEach(function (k) { v[k] = form.elements[k].value.trim(); });
    return v;
  }

  function validate(v) {
    var errs = {};
    FIELDS.forEach(function (k) { if (!v[k]) errs[k] = MSG[k]; });
    if (!errs.email && !EMAIL_RE.test(v.email)) errs.email = 'Enter an email address like name@facility.org.';
    return errs;
  }

  function show(errs) {
    FIELDS.forEach(function (k) {
      var input = form.elements[k];
      var help = document.getElementById('ea-' + k + '-err');
      if (errs[k]) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      help.textContent = errs[k] || '';
    });
  }

  form.addEventListener('input', function () { if (touched) show(validate(values())); });
  form.addEventListener('change', function () { if (touched) show(validate(values())); });

  var formErr = form.querySelector('[data-form-err]');
  var button = form.querySelector('button[type="submit"]');
  var label = button.innerHTML;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    touched = true;
    var v = values();
    var errs = validate(v);
    show(errs);
    var first = FIELDS.filter(function (k) { return errs[k]; })[0];
    if (first) { form.elements[first].focus(); return; }

    var url = (window.LUMANE_CONFIG || {}).DISCHARGE_EARLY_ACCESS_URL;
    if (!url) {
      formErr.textContent = 'Submission is temporarily unavailable. Please email team@lumane.health.';
      return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="btn-spin"></span><span>Request Early Access</span>';
    formErr.textContent = '';

    var params = new URLSearchParams(location.search);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        formType: 'discharge-early-access',
        name: v.name,
        email: v.email,
        role: v.role,
        setting: v.setting,
        organization: v.org,
        cityState: v.city,
        phone: v.phone,
        utmSource: params.get('utm_source') || '',
        utmCampaign: params.get('utm_campaign') || '',
        userAgent: navigator.userAgent,
      }),
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (json) {
        if (!res.ok || !json.ok) throw new Error((json && json.error) || 'Something went wrong. Please try again.');
        var done = document.getElementById('ea-done');
        form.hidden = true;
        done.hidden = false;
        done.focus();
      });
    }).catch(function (err) {
      formErr.textContent = err instanceof TypeError || !err || !err.message
        ? 'Network error. Please check your connection and try again.'
        : err.message;
      button.disabled = false;
      button.innerHTML = label;
    });
  });
})();
