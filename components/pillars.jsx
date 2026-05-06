/* global React */

// ─── Pillar Section wrapper ──────────────────────────────
function Pillar({ id, number, eyebrow, header, body, visual, reverse, accent }) {
  return (
    <section id={id} style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 80,
          alignItems: 'center',
          direction: reverse ? 'rtl' : 'ltr',
        }}>
          <div style={{ direction: 'ltr' }}>
            {(number || eyebrow) && (
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 14,
                marginBottom: 22,
              }}>
                {number && (
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                    color: 'var(--teal)', letterSpacing: '0.1em',
                  }}>{number}</span>
                )}
                {eyebrow && (
                  <span className="mono" style={{ color: 'var(--muted)' }}>{number ? '/ ' : ''}{eyebrow}</span>
                )}
              </div>
            )}
            <h2 className="h-1" style={{ marginBottom: 22 }}>{header}</h2>
            <div className="body" style={{ maxWidth: '46ch' }}>{body}</div>
          </div>
          <div style={{ direction: 'ltr' }}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

// ─── 01 · Unification visual ─────────────────────────────
function UnificationVisual() {
  const sources = [
    { name: 'Mercy General Hospital', tag: 'EPIC · FHIR', count: 142, status: 'synced' },
    { name: 'Riverside Cardiology', tag: 'Athenahealth', count: 38, status: 'synced' },
    { name: 'Westside Family Medicine', tag: 'eClinicalWorks', count: 87, status: 'synced' },
    { name: 'Mountain View Pharmacy', tag: 'Surescripts', count: 24, status: 'synced' },
    { name: 'Dr. Patel — Endocrinology', tag: 'Fax · Paper', count: 6, status: 'pending' },
  ];
  return (
    <div style={{ position: 'relative' }}>
      {/* Backing photo */}
      <Photo
        tone="warm-2"
        src="assets/papers-sorting.png"
        label="EDITORIAL · Hands sorting through paper records"
        shot="Top-down. A wooden table. A small stack of discharge summaries, an after-visit summary, a pill bottle. Daughter's hands at the edge of frame, holding a phone. Late-afternoon window light."
        style={{ width: '100%', aspectRatio: '5/4', minHeight: 420 }}
      />
      <div className="ui-card" style={{
        position: 'absolute', right: -28, top: 36, width: 360, padding: 18,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="mono" style={{ fontSize: 9.5 }}>CONNECTED SOURCES</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>5 of 5</div>
        </div>
        <div style={{ marginTop: 14 }}>
          {sources.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 0', borderTop: i === 0 ? 'none' : '1px solid var(--tan)',
            }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>{s.tag} · {s.count} records</div>
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
    </div>
  );
}

// ─── 02 · Reconciliation visual ──────────────────────────
function ReconciliationVisual() {
  return (
    <div style={{ position: 'relative' }}>
      <Photo
        tone="warm-2"
        src="assets/papers-sorting.png"
        label="EDITORIAL · Hands sorting through paper records"
        shot="Top-down. A wooden table. A small stack of discharge summaries, an after-visit summary, a pill bottle. Daughter's hands at the edge of frame, holding a phone. Late-afternoon window light."
        style={{ width: '100%', aspectRatio: '5/4', minHeight: 420 }}
      />
      <div className="ui-card" style={{
        position: 'absolute', left: -32, bottom: -32, width: 380, padding: 18,
      }}>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>1 MISMATCH FOUND</div>
        <div style={{ fontFamily: 'Lora, serif', fontSize: 16, fontWeight: 500, marginTop: 6, letterSpacing: '-0.01em' }}>
          Lisinopril 10 mg
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ padding: 12, background: 'var(--sand)', borderRadius: 6, border: '1px solid var(--tan)' }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>PCP CHART</div>
            <div style={{ fontSize: 12.5, marginTop: 6, color: 'var(--ink)', fontWeight: 500 }}>Active · daily</div>
            <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 4 }}>Updated Jan 12</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(220, 40, 40, 0.04)', borderRadius: 6, border: '1px solid rgba(220, 40, 40, 0.25)' }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--red)' }}>CARDIOLOGY</div>
            <div style={{ fontSize: 12.5, marginTop: 6, color: 'var(--ink)', fontWeight: 500 }}>Discontinued</div>
            <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 4 }}>Updated Mar 14</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button className="btn btn-primary" style={{ padding: '7px 12px', fontSize: 12 }}>Resolve</button>
          <button className="btn btn-outline" style={{ padding: '7px 12px', fontSize: 12 }}>Ask provider</button>
        </div>
      </div>
    </div>
  );
}

// ─── 03 · Readiness visual — phone mock ──────────────────
function ReadinessVisual() {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', minHeight: 560 }}>
      {/* Backing photo strip */}
      <Photo
        tone="warm-3"
        label=""
        shot=""
        style={{
          position: 'absolute', inset: '40px 0 40px 0',
          width: '100%', borderRadius: 8,
        }}
      />
      {/* Phone */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: 300, height: 600,
        background: '#1a1d22',
        borderRadius: 42, padding: 10,
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.06) inset, 0 40px 80px -20px rgba(33,38,47,0.45), 0 8px 24px -8px rgba(33,38,47,0.2)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'var(--card)', borderRadius: 34,
          padding: '46px 18px 24px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 22, background: '#1a1d22', borderRadius: 14,
          }}></div>

          <div className="mono" style={{ fontSize: 8.5, color: 'var(--muted)' }}>VISIT BRIEF · 1 PAGE</div>
          <div style={{ fontFamily: 'Lora, serif', fontSize: 17, fontWeight: 500, marginTop: 8, letterSpacing: '-0.012em', lineHeight: 1.2 }}>
            Mom · Endocrinology
          </div>
          <div className="mono" style={{ fontSize: 8.5, marginTop: 4, color: 'var(--muted)' }}>
            TUE, MAY 5 · DR. PATEL
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="mono" style={{ fontSize: 8.5, color: 'var(--muted)' }}>RECONCILED MEDS</div>
            {[
              { name: 'Metformin 500 mg', sub: '2× DAY · ACTIVE', active: true },
              { name: 'Metoprolol 25 mg', sub: '2× DAY · ACTIVE', active: true },
              { name: 'Atorvastatin 20 mg', sub: 'NIGHTLY · ACTIVE', active: true },
              { name: 'Lisinopril 10 mg', sub: 'CHANGED MAR 14', active: false },
            ].map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '7px 0', borderTop: '1px solid var(--tan)',
              }}>
                <div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.2 }}>{m.name}</div>
                  <div className="mono" style={{ fontSize: 8, color: 'var(--muted)', marginTop: 2 }}>{m.sub}</div>
                </div>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: m.active ? 'var(--green)' : 'var(--tan)',
                  boxShadow: m.active ? '0 0 0 3px rgba(50, 127, 119, 0.12)' : 'none',
                }}></div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 4 }}>
            <div className="mono" style={{ fontSize: 8.5, color: 'var(--muted)' }}>RECENT LABS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
              <div style={{ padding: 10, background: 'var(--sand)', borderRadius: 6, border: '1px solid var(--tan)' }}>
                <div className="mono" style={{ fontSize: 8, color: 'var(--muted)' }}>A1C</div>
                <div style={{ fontSize: 13, marginTop: 4, color: 'var(--ink)', fontWeight: 500 }}>
                  7.2 <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>↓ 0.4</span>
                </div>
                <div style={{ fontSize: 9.5, color: 'var(--muted)', marginTop: 3 }}>Apr 22</div>
              </div>
              <div style={{ padding: 10, background: 'var(--sand)', borderRadius: 6, border: '1px solid var(--tan)' }}>
                <div className="mono" style={{ fontSize: 8, color: 'var(--muted)' }}>EGFR</div>
                <div style={{ fontSize: 13, marginTop: 4, color: 'var(--ink)', fontWeight: 500 }}>
                  68 <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 11 }}>stable</span>
                </div>
                <div style={{ fontSize: 9.5, color: 'var(--muted)', marginTop: 3 }}>Apr 22</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 8, padding: 10, background: 'var(--green-soft)', borderRadius: 8 }}>
            <div className="mono" style={{ fontSize: 8.5, color: 'var(--green-deep)' }}>QUESTIONS TO ASK</div>
            <div style={{ fontSize: 10.5, marginTop: 6, color: 'var(--ink)', lineHeight: 1.5 }}>
              · A1C trend since January — adjust Metformin?<br/>
              · New fatigue, ~3 weeks. Related to Lisinopril change?
            </div>
          </div>

          <div style={{
            marginTop: 16,
            display: 'flex', gap: 8,
          }}>
            <button style={{
              flex: 1, padding: '10px', borderRadius: 999, border: 'none',
              background: 'var(--green)', color: 'var(--on-dark)',
              fontSize: 11.5, fontWeight: 500,
            }}>Email to nurse</button>
            <button style={{
              padding: '10px 14px', borderRadius: 999,
              background: 'var(--card)', border: '1px solid var(--tan)',
              fontSize: 11.5, color: 'var(--ink)', fontWeight: 500,
            }}>Print</button>
          </div>
        </div>
      </div>

      {/* Floating tag — desktop only; hidden on mobile via CSS. */}
      <div className="ui-card auto-prepared-floating" style={{
        position: 'absolute', right: '1%', top: 60, padding: '12px 14px', width: 200, zIndex: 3,
      }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--teal-deep)' }}>AUTO-PREPARED</div>
        <div style={{ fontSize: 12.5, marginTop: 6, color: 'var(--ink)', lineHeight: 1.4 }}>
          Generated 24 hours before each appointment.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Pillar, UnificationVisual, ReconciliationVisual, ReadinessVisual });
