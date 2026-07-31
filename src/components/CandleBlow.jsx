import { useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

// One realistic candle flame: glow halo + layered teardrop + blue base
function Flame({ x, y, delay, blown }) {
  return (
    <g
      className={`c-flame ${blown ? 'blown' : ''}`}
      style={{ animationDelay: blown ? '0s' : delay }}
      transform={`translate(${x} ${y})`}
    >
      <ellipse className="c-halo" cx="0" cy="-6" rx="22" ry="26" fill="url(#flameGlow)" />
      <path
        d="M0 -20 C 7 -9 8.5 -1 0 7 C -8.5 -1 -7 -9 0 -20 Z"
        fill="url(#flameGrad)"
      />
      <ellipse cx="0" cy="-1" rx="3.6" ry="7.5" fill="#fdeea8" />
      <ellipse cx="0" cy="5" rx="2.6" ry="3.4" fill="#7ab8f0" opacity="0.75" />
    </g>
  )
}

// Curling smoke wisps that appear after the flames go out
function Smoke({ x, y, show, delay }) {
  return (
    <g className={`c-smoke ${show ? 'show' : ''}`} style={{ animationDelay: delay }}>
      <path
        d={`M${x} ${y} c -6 -10 4 -14 -1 -24 c -4 -9 5 -13 1 -22`}
        stroke="#adaba8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d={`M${x + 5} ${y - 4} c 5 -9 -3 -13 2 -21 c 4 -8 -3 -12 0 -19`}
        stroke="#c4c1bd"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  )
}

function Cake({ blown }) {
  return (
    <svg viewBox="0 0 340 330" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* chocolate tiers */}
        <linearGradient id="chocBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7d4a2b" />
          <stop offset="55%" stopColor="#5e3319" />
          <stop offset="100%" stopColor="#46230f" />
        </linearGradient>
        <linearGradient id="pinkBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9c9d8" />
          <stop offset="60%" stopColor="#f2a9c1" />
          <stop offset="100%" stopColor="#e88fae" />
        </linearGradient>
        <linearGradient id="creamDrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="100%" stopColor="#f3e9cd" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce9a3" />
          <stop offset="45%" stopColor="#eec649" />
          <stop offset="100%" stopColor="#c99a22" />
        </linearGradient>
        <radialGradient id="plate" cx="0.5" cy="0.42">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#eef1ef" />
          <stop offset="100%" stopColor="#d7dedb" />
        </radialGradient>
        <radialGradient id="flameGrad" cx="0.5" cy="0.72">
          <stop offset="0%" stopColor="#ffdf6b" />
          <stop offset="60%" stopColor="#ffab2e" />
          <stop offset="100%" stopColor="#f47b20" />
        </radialGradient>
        <radialGradient id="flameGlow">
          <stop offset="0%" stopColor="#ffcf6e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffcf6e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* plate & shadow */}
      <ellipse cx="170" cy="308" rx="142" ry="17" fill="#00000012" />
      <ellipse cx="170" cy="300" rx="132" ry="19" fill="url(#plate)" />
      <ellipse cx="170" cy="297" rx="114" ry="14" fill="#f8fbfa" />

      {/* ── bottom tier (chocolate) ── */}
      <path d="M56 216 v 62 q 0 16 114 16 t 114 -16 v -62 z" fill="url(#chocBody)" />
      <ellipse cx="170" cy="216" rx="114" ry="20" fill="#8a563a" />
      {/* cream drip over bottom tier */}
      <path
        d="M56 216 q 0 -20 114 -20 t 114 20 v 6
           q -8 16 -19 2 t -19 8 t -19 -6 t -19 9 t -19 -7 t -19 7 t -19 -9 t -19 6 t -19 -8 q -11 14 -19 -2 z"
        fill="url(#creamDrip)"
      />
      {/* gold ribbon on bottom tier */}
      <path d="M56 268 q 114 22 228 0 v 9 q -114 22 -228 0 z" fill="url(#gold)" opacity="0.95" />
      {/* rosettes along the bottom tier ledge */}
      {[92, 131, 170, 209, 248].map((x) => (
        <g key={x}>
          <circle cx={x} cy="207" r="8.5" fill="#f6b6cb" />
          <path
            d={`M ${x - 5.5} 207 a 5.5 5.5 0 0 1 11 0 a 3.8 3.8 0 0 1 -7.6 0`}
            fill="#e989ab"
          />
          <circle cx={x} cy="207" r="2.2" fill="#d76a92" />
        </g>
      ))}

      {/* ── top tier (strawberry pink) ── */}
      <path d="M98 148 v 52 q 0 13 72 13 t 72 -13 v -52 z" fill="url(#pinkBody)" />
      <ellipse cx="170" cy="148" rx="72" ry="14" fill="#f7bcd0" />
      {/* cream drip over top tier */}
      <path
        d="M98 148 q 0 -15 72 -15 t 72 15 v 5
           q -7 13 -15 1 t -15 7 t -15 -5 t -13.5 7 t -13.5 -7 t -15 5 t -15 -7 q -8 12 -15 -1 z"
        fill="url(#creamDrip)"
      />
      {/* gold ribbon on top tier */}
      <path d="M98 189 q 72 15 144 0 v 8 q -72 15 -144 0 z" fill="url(#gold)" opacity="0.95" />
      {/* strawberries on the top ledge */}
      {[120, 220].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 132 q 9 0 9 8 q 0 10 -9 13 q -9 -3 -9 -13 q 0 -8 9 -8`}
            fill="#e2384a"
          />
          <path d={`M${x - 5} 133 l 5 -5 l 5 5 l -5 2 z`} fill="#5d9e4c" />
          {[[-3, 8], [3, 6], [0, 12], [-4, 13], [4, 12]].map(([dx, dy], i) => (
            <circle key={i} cx={x + dx} cy={132 + dy} r="0.8" fill="#ffd9de" />
          ))}
        </g>
      ))}
      {/* pearls along top drip */}
      {[142, 170, 198].map((x) => (
        <circle key={x} cx={x} cy="140" r="3" fill="#fff" stroke="#e8ddc2" strokeWidth="0.8" />
      ))}

      {/* ── golden "25" number candles ── */}
      <text
        x="148"
        y="126"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize="62"
        fill="url(#gold)"
        stroke="#a87f1c"
        strokeWidth="1.6"
      >
        2
      </text>
      <text
        x="196"
        y="126"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize="62"
        fill="url(#gold)"
        stroke="#a87f1c"
        strokeWidth="1.6"
      >
        5
      </text>
      {/* wicks */}
      <line x1="148" y1="78" x2="148" y2="68" stroke="#4a3423" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="196" y1="78" x2="196" y2="68" stroke="#4a3423" strokeWidth="2.6" strokeLinecap="round" />
      {/* ember tips glow briefly after blow */}
      {blown && (
        <>
          <circle className="c-ember" cx="148" cy="69" r="2.2" fill="#ff7b3a" />
          <circle className="c-ember" cx="196" cy="69" r="2.2" fill="#ff7b3a" />
        </>
      )}

      {/* flames */}
      <Flame x={148} y={58} delay="0s" blown={blown} />
      <Flame x={196} y={58} delay="0.18s" blown={blown} />

      {/* smoke */}
      <Smoke x={148} y={64} show={blown} delay="0.45s" />
      <Smoke x={196} y={64} show={blown} delay="0.65s" />
    </svg>
  )
}

export default function CandleBlow({ onDone }) {
  const [blown, setBlown] = useState(false)
  const [wishing, setWishing] = useState(false)

  const blow = () => {
    if (blown) return
    setBlown(true)
    setTimeout(() => setWishing(true), 1400) // let the smoke breathe first
    setTimeout(onDone, 6200)
  }

  return (
    <div className="screen cake-screen">
      <HeartsBackground />
      <h1 className="screen-title">Blow the candles, {config.name}</h1>
      <p className="turning-chip">
        <span>✨ Turning 25 today ✨</span>
      </p>

      <div className="cake-stage">
        <div className={`cake-glow ${blown ? 'dim' : ''}`} aria-hidden="true" />
        <button
          className={`cake-btn ${blown ? 'blown' : ''}`}
          onClick={blow}
          aria-label="Tap the cake to blow the candles"
        >
          <Cake blown={blown} />
        </button>
        {!blown && (
          <p className="cake-hint" aria-hidden="true">
            🌬️ Tap the cake to blow the candles
          </p>
        )}
      </div>

      {wishing && (
        <div className="wish-overlay">
          <span className="wish-stars" aria-hidden="true">
            {['✨', '🌟', '💫', '✨', '⭐', '✨'].map((s, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.35}s` }}>{s}</i>
            ))}
          </span>
          <p>
            Close your eyes
            <br />
            &amp; make a wish
          </p>
          <p className="wish-sub">Here&apos;s to 25 years of wonderful you, {config.name} 💖</p>
        </div>
      )}
    </div>
  )
}
