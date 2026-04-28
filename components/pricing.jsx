/* global React */

// ─── Warmth Photo Section (full-bleed editorial) ─────────
function WarmthPhotoSection({ caption, shotTitle, shotDescription, reverse, tone = 'warm-2', src }) {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: reverse ? '1fr 1.4fr' : '1.4fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {!reverse && (
            <Photo
              tone={tone}
              src={src}
              label={shotTitle.toUpperCase()}
              shot={shotDescription}
              style={{ width: '100%', aspectRatio: '5/4', minHeight: 460 }}
            />
          )}
          <div>
            <div className="mono" style={{ marginBottom: 18 }}>◦ &nbsp; A note on imagery</div>
            <p className="font-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.18, color: 'var(--ink)', maxWidth: '22ch' }}>
              {caption}
            </p>
          </div>
          {reverse && (
            <Photo
              tone={tone}
              src={src}
              label={shotTitle.toUpperCase()}
              shot={shotDescription}
              style={{ width: '100%', aspectRatio: '5/4', minHeight: 460 }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Process Steps ───────────────────────────────────────
function ProcessSteps() {
  const steps = [
    { n: '01', title: 'Create your circle', body: 'Add your parent, with their consent. Invite a sibling or your dad if you want shared access. One household, one record.' },
    { n: '02', title: 'Connect their providers', body: 'Search for their doctors, hospitals, pharmacies. We pull records over secure clinical channels — no faxing, no portals to remember.' },
    { n: '03', title: 'Walk into the next visit ready', body: 'A reconciled, one-page brief is waiting 24 hours before each appointment. Print it, email it, or hand it to the nurse.' },
  ];
  return (
    <section id="how" style={{ padding: '120px 0', background: 'var(--sand)' }}>
      <div className="wrap">
        <div style={{ maxWidth: '40ch', marginBottom: 64 }}>
          <div className="mono" style={{ marginBottom: 22 }}>◦ &nbsp; How it works</div>
          <h2 className="h-1">Three steps. Then it just runs in the background.</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
        }}>
          {steps.map((s) => (
            <div key={s.n} style={{
              padding: '32px 28px',
              background: 'var(--card)',
              border: '1px solid var(--tan)',
              borderRadius: 12,
              minHeight: 280,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                color: 'var(--teal)', letterSpacing: '0.14em',
              }}>{s.n}</div>
              <h3 className="font-display" style={{ fontSize: 22, marginTop: 16, marginBottom: 14, lineHeight: 1.2 }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 14.5 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────
function PricingSection() {
  const [billing, setBilling] = React.useState('annual');
  const features = [
    '1 parent, unlimited caregivers',
    'Unlimited connected providers',
    'Reconciled medications',
    'Pre-visit briefs',
  ];

  return (
    <section id="pricing" style={{ padding: '120px 0 60px' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          {/* Left: title + trial stamp */}
          <div>
            <h2 className="h-1" style={{ marginBottom: 20 }}>Try Lumane free, then keep it for less than a co-pay.</h2>
            <p className="body" style={{ fontSize: 14.5, marginTop: 10 }}>
              One plan. Everything included from day one. Cancel anytime during your trial and you won't be charged.
            </p>
          </div>

          {/* Right: single plan card */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--tan)',
            borderRadius: 16,
            padding: 36,
            position: 'relative',
            boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 48px -28px rgba(33, 38, 47, 0.18)',
          }}>
            {/* Headline price */}
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: 'Lora, serif',
                fontSize: 64, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1,
                color: 'var(--ink)',
              }}>$0</span>
              <span style={{ fontSize: 16, color: 'var(--muted)' }}>for the first 30 days</span>
            </div>

            <div style={{
              marginTop: 8, fontSize: 13, color: 'var(--muted)',
            }}>
              For 1 parent and unlimited caregivers. No charge until day 31.
            </div>

            {/* Divider */}
            <div style={{
              margin: '28px 0',
              height: 1, background: 'var(--tan)',
            }}></div>

            {/* Feature list */}
            <div className="mono" style={{ marginBottom: 14 }}>EVERYTHING INCLUDED</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px',
              marginBottom: 4,
            }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 14, color: 'var(--ink)',
                }}>
                  <Check />
                  {f}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ margin: '28px 0', height: 1, background: 'var(--tan)' }}></div>

            {/* Billing toggle */}
            <div className="mono" style={{ marginBottom: 14 }}>THEN, AFTER YOUR TRIAL</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            }}>
              <BillingOption
                selected={billing === 'monthly'}
                onClick={() => setBilling('monthly')}
                label="Monthly"
                price="$14"
                priceNote="/ month"
                sub="Billed monthly"
              />
              <BillingOption
                selected={billing === 'annual'}
                onClick={() => setBilling('annual')}
                label="Annual"
                price="$99"
                priceNote="/ year"
                sub="Equivalent to $8.25 / month"
                badge="SAVE 41%"
              />
            </div>

            {/* CTA */}
            <a href="signup.html" className="btn btn-primary" style={{
              marginTop: 24, width: '100%', justifyContent: 'center',
              padding: '14px 20px', fontSize: 14.5, textDecoration: 'none',
            }}>
              Start free trial →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 18, height: 18, borderRadius: '50%',
      background: 'var(--teal-soft)', color: 'var(--teal-deep)',
      flexShrink: 0,
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1.5 5.5L4 8L8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function BillingOption({ selected, onClick, label, price, priceNote, sub, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '18px 18px 16px',
        borderRadius: 12,
        border: selected ? '1.5px solid var(--teal)' : '1.5px solid var(--tan)',
        background: selected ? 'rgba(50, 127, 119, 0.06)' : 'var(--card)',
        cursor: 'pointer',
        transition: 'all .15s ease',
        fontFamily: 'inherit',
      }}
    >
      {badge && (
        <div style={{
          position: 'absolute', top: -10, right: 14,
          padding: '5px 10px',
          background: 'var(--teal)', color: '#fff',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10.5, fontWeight: 600,
          letterSpacing: '0.14em',
          borderRadius: 999,
          boxShadow: '0 6px 14px -4px rgba(50, 127, 119, 0.5)',
        }}>{badge}</div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 16, height: 16, borderRadius: '50%',
          border: selected ? '1.5px solid var(--teal)' : '1.5px solid var(--muted)',
          background: selected ? 'var(--teal)' : 'transparent',
          flexShrink: 0,
        }}>
          {selected && <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#fff',
          }}></span>}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 12 }}>
        <span style={{
          fontFamily: 'Lora, serif', fontSize: 30, fontWeight: 500,
          letterSpacing: '-0.022em', color: 'var(--ink)', lineHeight: 1,
        }}>{price}</span>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{priceNote}</span>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 8 }}>{sub}</div>
    </button>
  );
}

Object.assign(window, { WarmthPhotoSection, ProcessSteps, PricingSection });
