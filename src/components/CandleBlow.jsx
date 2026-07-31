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

function Cake({ blown, straining }) {
  return (
    <svg
      viewBox="0 0 340 330"
      xmlns="http://www.w3.org/2000/svg"
      className={straining ? 'straining' : ''}
    >
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

      {/* plate & shadow — slides up first */}
      <g className="asm asm-plate">
        <ellipse cx="170" cy="308" rx="142" ry="17" fill="#00000012" />
        <ellipse cx="170" cy="300" rx="132" ry="19" fill="url(#plate)" />
        <ellipse cx="170" cy="297" rx="114" ry="14" fill="#f8fbfa" />
      </g>

      {/* ── bottom tier (chocolate) — lands second ── */}
      <g className="asm asm-bottom">
        <path d="M56 216 v 62 q 0 16 114 16 t 114 -16 v -62 z" fill="url(#chocBody)" />
        <ellipse cx="170" cy="216" rx="114" ry="20" fill="#8a563a" />
        <path
          d="M56 216 q 0 -20 114 -20 t 114 20 v 6
             q -8 16 -19 2 t -19 8 t -19 -6 t -19 9 t -19 -7 t -19 7 t -19 -9 t -19 6 t -19 -8 q -11 14 -19 -2 z"
          fill="url(#creamDrip)"
        />
        <path d="M56 268 q 114 22 228 0 v 9 q -114 22 -228 0 z" fill="url(#gold)" opacity="0.95" />
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
      </g>

      {/* ── top tier (strawberry pink) — lands third ── */}
      <g className="asm asm-top">
        <path d="M98 148 v 52 q 0 13 72 13 t 72 -13 v -52 z" fill="url(#pinkBody)" />
        <ellipse cx="170" cy="148" rx="72" ry="14" fill="#f7bcd0" />
        <path
          d="M98 148 q 0 -15 72 -15 t 72 15 v 5
             q -7 13 -15 1 t -15 7 t -15 -5 t -13.5 7 t -13.5 -7 t -15 5 t -15 -7 q -8 12 -15 -1 z"
          fill="url(#creamDrip)"
        />
        <path d="M98 189 q 72 15 144 0 v 8 q -72 15 -144 0 z" fill="url(#gold)" opacity="0.95" />
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
        {[142, 170, 198].map((x) => (
          <circle key={x} cx={x} cy="140" r="3" fill="#fff" stroke="#e8ddc2" strokeWidth="0.8" />
        ))}
      </g>

      {/* ── golden "25" number candles — drop in last ── */}
      <g className="asm asm-candles">
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
        <line x1="148" y1="78" x2="148" y2="68" stroke="#4a3423" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="196" y1="78" x2="196" y2="68" stroke="#4a3423" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* ember tips glow briefly after blow */}
      {blown && (
        <>
          <circle className="c-ember" cx="148" cy="69" r="2.2" fill="#ff7b3a" />
          <circle className="c-ember" cx="196" cy="69" r="2.2" fill="#ff7b3a" />
        </>
      )}

      {/* flames ignite after the candles land */}
      <g className="flame-ignite">
        <Flame x={148} y={58} delay="0s" blown={blown} />
        <Flame x={196} y={58} delay="0.18s" blown={blown} />
      </g>

      {/* smoke */}
      <Smoke x={148} y={64} show={blown} delay="0.45s" />
      <Smoke x={196} y={64} show={blown} delay="0.65s" />
    </svg>
  )
}

// warm golden embers drifting up around the cake
function Embers() {
  const embers = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    left: `${18 + ((i * 31) % 64)}%`,
    delay: `${(i * 1.1) % 6}s`,
    duration: `${5 + ((i * 3) % 4)}s`,
    size: `${3 + (i % 3) * 2}px`,
  }))
  return (
    <div className="embers" aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.id}
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            animationDelay: e.delay,
            animationDuration: e.duration,
          }}
        />
      ))}
    </div>
  )
}

// glowing paper lantern that carries a wish into the sky
function Lantern({ left, bottom, delay, duration, size = 1, label }) {
  return (
    <span
      className="lantern"
      style={{
        left,
        bottom,
        animationDelay: delay,
        animationDuration: duration,
        '--lsize': size,
      }}
    >
      <i className="lantern-body">{label}</i>
    </span>
  )
}

// the night sky that fades in when the wishes take flight
function NightSky() {
  const stars = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 47) % 100}%`,
    top: `${(i * 31) % 90}%`,
    delay: `${(i * 0.5) % 3.5}s`,
    size: `${0.45 + ((i * 7) % 10) / 16}rem`,
  }))
  return (
    <div className="night-sky" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          style={{ left: s.left, top: s.top, animationDelay: s.delay, fontSize: s.size }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

export default function CandleBlow({ onDone }) {
  const [released, setReleased] = useState(false)
  const [wishing, setWishing] = useState(false)

  const release = () => {
    if (released) return
    setReleased(true)
    setTimeout(() => setWishing(true), 3400)
    setTimeout(onDone, 8200)
  }

  return (
    <div className={`screen cake-screen ${released ? 'night' : ''}`}>
      <HeartsBackground />
      <div className="cake-vignette" aria-hidden="true" />
      {released && <NightSky />}

      <h1 className="screen-title">Make a wish, {config.name}</h1>
      <p className="turning-chip">
        <span>✨ Turning 25 today ✨</span>
      </p>

      <div className="cake-stage">
        <div className={`cake-glow ${released ? 'dim' : ''}`} aria-hidden="true" />
        <Embers />
        <button
          className={`cake-btn ${released ? 'blown' : ''}`}
          onClick={release}
          aria-label="Tap the cake to set your wishes free"
        >
          <Cake blown={released} straining={false} />
        </button>

        {!released && (
          <p className="cake-hint" aria-hidden="true">
            🏮 tap the cake — and set your wishes free
          </p>
        )}

        {/* the two candle flames become lanterns, and friends join them */}
        {released && (
          <div className="lanterns" aria-hidden="true">
            <Lantern left="43%" bottom="52%" delay="0.5s" duration="7s" size={1.15} label="2" />
            <Lantern left="55%" bottom="52%" delay="0.8s" duration="7.5s" size={1.15} label="5" />
            <Lantern left="14%" bottom="-8%" delay="1.6s" duration="9s" size={0.85} label="♥" />
            <Lantern left="78%" bottom="-10%" delay="2.1s" duration="8.5s" size={0.95} label="♥" />
            <Lantern left="30%" bottom="-12%" delay="2.8s" duration="10s" size={0.7} label="♥" />
            <Lantern left="64%" bottom="-9%" delay="3.3s" duration="9.5s" size={0.8} label="♥" />
          </div>
        )}
      </div>

      {wishing && (
        <div className="wish-overlay lantern-wish">
          <span className="wish-stars" aria-hidden="true">
            {['✨', '🌟', '💫', '✨', '⭐', '✨'].map((s, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.35}s` }}>{s}</i>
            ))}
          </span>
          <p>
            Your wishes are flying
            <br />
            to the sky, my love 🏮
          </p>
          <p className="wish-sub">Close your eyes &amp; make one more — for us, {config.name} 💖</p>
        </div>
      )}
    </div>
  )
}
