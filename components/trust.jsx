/* global React */

// ─── Trust Section ────────────────────────────────────────
function TrustSection() {
  const points = [
    { k: <>Patient consent at <br className="trust-br" />the core</>, v: 'The patient gives informed consent before any record is pulled.' },
    { k: 'No record sharing without you', v: 'We never share data without your consent.' },
    { k: 'Built on the substrate hospitals trust', v: 'HL7 FHIR R4, USCDI v3, HIPAA. The same data standards your hospital already uses.' },
  ];
  return (
    <section style={{ padding: '120px 0', background: 'var(--beige)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="mono" style={{ marginBottom: 22, fontSize: 18 }}>Trust</div>
            <h2 className="h-1">Health records are personal. We treat them that way.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {points.map((p, i) => (
              <div key={i} style={{
                padding: '28px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--tan)',
                display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32,
              }}>
                <div className="font-display" style={{ fontSize: 19, color: 'var(--ink)', maxWidth: '24ch', lineHeight: 1.25 }}>{p.k}</div>
                <div className="body" style={{ fontSize: 14.5 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { q: 'Is my parent\'s data ever sold?', a: 'No. We don\'t sell, share, or resell any clinical data. Lumane is paid by families, not advertisers or brokers.' },
    { q: 'Will my parent\'s doctors know I\'m using this?', a: 'Only if you choose to share. The pre-visit brief is yours to email, print, or hand over. Doctors don\'t see Lumane unless you bring it to them.' },
    { q: 'What if a provider doesn\'t connect electronically?', a: 'We still bring them in — through fax, paper, and PDF uploads — and reconcile what they send into the same view as the digital sources.' },
    { q: 'Can my siblings use it too?', a: 'Yes. The Household plan supports up to four caregivers in one shared circle, with audit trails for who did what.' },
    { q: 'Does Lumane replace my parent\'s patient portal?', a: 'No — it sits beside the portals. Lumane is the unified view across all of them, with reconciliation the portals can\'t do on their own.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ padding: '120px 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="mono" style={{ marginBottom: 22 }}>◦ &nbsp; Questions</div>
            <h2 className="h-1">A few things people ask first.</h2>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--tan)' }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: '100%', padding: '22px 0', background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span className="font-display" style={{ fontSize: 18.5, color: 'var(--ink)' }}>{f.q}</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: 'var(--muted)',
                    transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                {open === i && (
                  <div className="body" style={{ paddingBottom: 26, maxWidth: '64ch', fontSize: 15 }}>{f.a}</div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--tan)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Institutional callout ────────────────────────────────
function InstitutionalCallout() {
  return (
    <section id="for-facilities" style={{ padding: '60px 0 30px' }}>
      <div className="wrap">
        <div style={{
          padding: '44px 48px',
          background: 'var(--sand)',
          border: '1px solid var(--tan)',
          borderRadius: 14,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 40, alignItems: 'center',
        }}>
          <div>
            <div className="mono" style={{ marginBottom: 14, color: 'var(--teal-deep)' }}>◦ &nbsp; For facilities & care teams</div>
            <h3 className="font-display" style={{ fontSize: 26, lineHeight: 1.2, marginBottom: 12, maxWidth: '32ch' }}>
              The same substrate, deployed inside skilled nursing, assisted living, and home health.
            </h3>
            <p className="body" style={{ fontSize: 14.5, maxWidth: '52ch' }}>
              If you operate a care facility, Lumane reduces admission intake from 90 minutes to 20, and gives your staff one clean medication list per resident.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <a href="/facility-demo.html" className="btn btn-primary">Book a 15-min demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────
function CTABlock() {
  return (
    <section id="start" style={{ padding: '140px 0 100px' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <div className="mono" style={{ marginBottom: 22 }}>◦ &nbsp; Begin</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(36px, 4.6vw, 60px)', maxWidth: '20ch', margin: '0 auto', lineHeight: 1.06 }}>
          Bring it all into <em style={{ fontStyle: 'italic', color: 'var(--teal-deep)' }}>one place</em>. Tonight.
        </h2>
        <p className="lede" style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto' }}>
          Free for one parent and one caregiver, forever. No card. Most families connect their first provider in under five minutes.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36 }}>
          <a href="signup.html" className="btn btn-primary">Start free →</a>
          <a href="#talk" className="btn btn-outline">Talk to us first</a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Company', links: [
      { label: 'About', href: '/about.html' },
      { label: 'For facilities', href: '/for-facilities.html' },
    ]},
    { title: 'Legal', links: [
      { label: 'Privacy', href: '/Lumane_Privacy_Policy.pdf', target: '_blank' },
      { label: 'Terms', href: '/Lumane_Terms_of_Service.pdf', target: '_blank' },
    ]},
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 80, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Brand />
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              © 2026 Lumane Health, Inc.
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 96 }}>
            {cols.map((c) => (
              <div key={c.title} style={{ minWidth: 120 }}>
                <div className="mono" style={{ marginBottom: 18 }}>{c.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {c.links.map((l) => (
                    <li key={l.label}><a href={l.href} target={l.target} rel={l.target === '_blank' ? 'noopener noreferrer' : undefined} style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.78 }}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { TrustSection, FAQSection, InstitutionalCallout, CTABlock, Footer });
