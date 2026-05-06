/* global React */

// ─── HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{ padding: '140px 0 100px' }}>
      <div className="wrap">
        <h1 className="h-display rise rise-2" style={{ maxWidth: '14ch' }}>
          The whole picture of <em style={{ fontStyle: 'italic', color: 'var(--teal-deep)', position: 'relative', display: 'inline-block' }}>
            their health
            <svg
              aria-hidden="true"
              style={{ position: 'absolute', left: '-2%', bottom: -10, width: '104%', height: 18, overflow: 'visible', pointerEvents: 'none' }}
              viewBox="0 0 200 18"
              preserveAspectRatio="none"
            >
              <path
                d="M 4 9 Q 50 13, 100 10 T 196 8"
                fill="none"
                stroke="var(--teal-deep)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </em>, for the family who love them most.
        </h1>

        <p className="lede rise rise-3" style={{ marginTop: 28, maxWidth: '52ch' }}>
          Lumane gathers your parent's records from every doctor they see —
          specialists, hospitals, pharmacies, even small offices that still use paper.
          Walk into every appointment knowing exactly what's going on.
        </p>

        <div className="rise rise-4" style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          <a href="/signup.html" className="btn btn-primary">Get started →</a>
          <a
            href="#how"
            className="btn btn-outline"
            onClick={(e) => {
              const el = document.getElementById('how');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          >
            See how it works
          </a>
        </div>

        {/* Imagery + proof bar — fit one viewport, preserve rhythm */}
        <div id="how" style={{
          marginTop: 160,
          display: 'flex',
          flexDirection: 'column',
          gap: 64,
        }}>
          {/* Imagery composition: photo + floating ui */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr',
            gap: 28,
            alignItems: 'stretch',
          }}>
            {/* Left: large warmth photo */}
            <div style={{ position: 'relative' }}>
              <Photo
                tone="warm-1"
                src="assets/hero-kitchen.png"
                label="EDITORIAL PLACEHOLDER · 4:5"
                shot="Adult daughter (40s), sitting beside her mother (70s) on a sun-warmed kitchen banquette. Late-morning light from the left. Both leaning toward a tablet. The daughter's hand resting on her mother's wrist. Unposed, mid-conversation."
                style={{ width: '100%', height: '100%', minHeight: 460 }}
              />
              {/* Floating med chip on photo */}
              <div className="ui-card" style={{
                position: 'absolute', right: -36, bottom: 48,
                padding: '12px 14px', width: 240,
              }}>
                <div className="mono" style={{ fontSize: 9.5, color: 'var(--green-deep)' }}>NOW SYNCED</div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: 14, fontWeight: 500, marginTop: 4, lineHeight: 1.3 }}>
                  Mercy General · 14 records
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>
                  Last visit: April 2, 2026
                </div>
              </div>
            </div>

            {/* Right: stacked product fragments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'space-between' }}>
              <MedListFragment />
              <VisitPrepCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
