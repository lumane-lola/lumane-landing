/* global React */

// ─── Editorial Photo Placeholder ─────────────────────────
function Photo({ tone = 'warm-1', label, shot, src, className = '', style }) {
  return (
    <div className={`photo ${tone} ${className}`} style={{
      ...style,
      ...(src ? { backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
    }}>
      {src && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(33,38,47,0.18))' }}></div>}
      {(label || shot) && !src && (
        <div className="photo-label">
          {label && <span className="lbl-key">{label}</span>}
          {shot}
        </div>
      )}
    </div>
  );
}

// ─── Logo lockup ─────────────────────────────────────────
function Brand() {
  return (
    <a className="brand" href="/" aria-label="Lumane home">
      <img src="/LumaneLogo.png" alt="Lumane" className="brand-logo" />
    </a>
  );
}

// ─── Header ──────────────────────────────────────────────
function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Brand />
        <div className="nav-links">
          <a href="/about.html">About</a>
          <a href="/facility-demo.html" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13, color: '#ffffff' }}>
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}

// ─── Floating UI fragments used in hero ──────────────────
function MedListFragment() {
  const meds = [
    { name: 'Metoprolol', dose: '25 mg · 2× day', src: 'Cardiology · Dr. Patel', state: 'active' },
    { name: 'Atorvastatin', dose: '20 mg · nightly', src: 'PCP · Dr. Hwang', state: 'active' },
    { name: 'Lisinopril', dose: '10 mg · daily', src: 'PCP · Dr. Hwang', state: 'flag', flag: 'Discontinued by cardiology Mar 14' },
  ];
  return (
    <div className="ui-card" style={{ padding: 18, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted-2)' }}>RECONCILED MEDICATIONS</div>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 17, fontWeight: 500, marginTop: 2, letterSpacing: '-0.01em' }}>Mom · Margaret R.</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>3 sources · synced 2m ago</div>
      </div>
      {meds.map((m, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '12px 0', borderTop: '1px solid var(--tan)',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
              {m.name} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>· {m.dose}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{m.src}</div>
            {m.flag && (
              <div style={{
                marginTop: 8, fontSize: 11.5, color: 'var(--ink)',
                background: 'rgba(220, 40, 40, 0.06)',
                border: '1px solid rgba(220, 40, 40, 0.2)',
                padding: '7px 10px', borderRadius: 6, lineHeight: 1.45,
              }}>
                <span style={{
                  display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--red)', marginRight: 8, verticalAlign: 'middle',
                }}></span>
                {m.flag}
              </div>
            )}
          </div>
          <div style={{
            fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: m.state === 'flag' ? 'var(--red)' : 'var(--green)',
            marginLeft: 12, paddingTop: 2,
          }}>
            {m.state === 'flag' ? 'mismatch' : 'active'}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisitPrepCard() {
  return (
    <div className="ui-card" style={{ padding: 16, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="mono" style={{ fontSize: 9.5 }}>VISIT PREP</div>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 15, fontWeight: 500, marginTop: 4 }}>
            Endocrinology — Tue, May 5
          </div>
        </div>
        <div style={{
          fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
          background: 'var(--green-soft)', color: 'var(--green-deep)',
          padding: '4px 8px', borderRadius: 4, letterSpacing: '0.08em',
        }}>READY</div>
      </div>
      <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--slate)', lineHeight: 1.55 }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: 'var(--muted)' }}>1.</span> &nbsp;A1C trend since Jan — share latest reading?
        </div>
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: 'var(--muted)' }}>2.</span> &nbsp;Confirm Metformin is still indicated
        </div>
        <div>
          <span style={{ color: 'var(--muted)' }}>3.</span> &nbsp;Ask about new fatigue (3 weeks)
        </div>
      </div>
    </div>
  );
}

function ConnectedProvidersFragment() {
  const sources = [
    { name: 'Mercy General Hospital', tag: 'EPIC · FHIR', count: 142, status: 'synced' },
    { name: 'Riverside Cardiology', tag: 'Athenahealth', count: 38, status: 'synced' },
    { name: 'Westside Family Medicine', tag: 'eClinicalWorks', count: 87, status: 'synced' },
    { name: 'Mountain View Pharmacy', tag: 'Surescripts', count: 24, status: 'synced' },
    { name: 'Dr. Patel — Endocrinology', tag: 'Fax · Paper', count: 6, status: 'pending' },
  ];
  return (
    <div className="ui-card" style={{ padding: 18, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted-2)' }}>CONNECTED PROVIDERS</div>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 17, fontWeight: 500, marginTop: 2, letterSpacing: '-0.01em' }}>Mom · Margaret R.</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>5 sources · synced 2m ago</div>
      </div>
      <div>
        {sources.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 0', borderTop: '1px solid var(--tan)',
          }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{s.name}</div>
              <div style={{
                fontSize: 10.5, color: 'var(--muted)', marginTop: 2,
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em',
              }}>{s.tag} · {s.count} records</div>
            </div>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: s.status === 'synced' ? 'var(--green)' : 'var(--tan)',
              boxShadow: s.status === 'synced' ? '0 0 0 4px rgba(50, 127, 119, 0.12)' : 'none',
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Photo, Brand, Header, MedListFragment, VisitPrepCard, ConnectedProvidersFragment });
