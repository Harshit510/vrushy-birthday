import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

const BALLOON_COLORS = [
  { body: '#7ec3ea', deep: '#5aa7d6', shine: '#d9f0fb', ribbon: '#5aa7d6' }, // blue
  { body: '#f4a9c4', deep: '#e37ba2', shine: '#fce3ed', ribbon: '#e37ba2' }, // pink
  { body: '#8fd6b1', deep: '#67b98e', shine: '#d7f1e3', ribbon: '#67b98e' }, // green
  { body: '#b9aee4', deep: '#9d8fd3', shine: '#e6e1f6', ribbon: '#9d8fd3' }, // purple
]

// Glossy pastel balloon with a sleepy-happy kawaii face
function KawaiiBalloon({ color, idx }) {
  const gid = `bgrad${idx}`
  return (
    <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gid} cx="0.38" cy="0.3">
          <stop offset="0%" stopColor={color.shine} />
          <stop offset="45%" stopColor={color.body} />
          <stop offset="100%" stopColor={color.deep} />
        </radialGradient>
      </defs>
      {/* body */}
      <ellipse cx="60" cy="64" rx="44" ry="52" fill={`url(#${gid})`} />
      {/* glossy highlights */}
      <ellipse cx="43" cy="38" rx="13" ry="19" fill="#ffffff" opacity="0.55" transform="rotate(-18 43 38)" />
      <circle cx="52" cy="26" r="4" fill="#ffffff" opacity="0.7" />
      {/* kawaii face */}
      <path d="M44 66 q 4 5 8 0" stroke="#5d4a3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M68 66 q 4 5 8 0" stroke="#5d4a3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M55 76 q 5 5 10 0" stroke="#5d4a3a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="41" cy="75" rx="6" ry="3.6" fill="#f78fb0" opacity="0.55" />
      <ellipse cx="79" cy="75" rx="6" ry="3.6" fill="#f78fb0" opacity="0.55" />
      {/* knot */}
      <polygon points="54,114 66,114 60,124" fill={color.ribbon} />
      {/* curly string */}
      <path
        d="M60 124 q -10 14 0 26 q 10 12 -2 24 q -8 10 4 20"
        stroke={color.ribbon}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* swinging mystery tag — a secret hides inside */}
      <g className="tag-swing">
        <rect x="46" y="170" width="28" height="30" rx="5" fill="#fffaf2" stroke="#eccfa9" strokeWidth="1.6" />
        <circle cx="60" cy="175" r="1.8" fill="#cfa168" />
        <text
          x="60"
          y="194"
          textAnchor="middle"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#d63384"
        >
          ?
        </text>
      </g>
    </svg>
  )
}

// A cluster of party balloons decorating a top corner
function GarlandCluster({ flip = false }) {
  const balloons = [
    [36, 34, 26, '#f06292'], [84, 22, 30, '#ffd54f'], [132, 30, 24, '#81d4fa'],
    [172, 52, 27, '#aed581'], [58, 74, 22, '#ce93d8'], [110, 66, 25, '#ffb74d'],
    [152, 92, 19, '#f48fb1'], [30, 108, 17, '#80cbc4'],
  ]
  return (
    <svg
      className={`garland ${flip ? 'flip' : ''}`}
      viewBox="0 0 210 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {balloons.map(([x, y, r, c], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 1.14} fill={c} />
          <ellipse cx={x - r * 0.32} cy={y - r * 0.38} rx={r * 0.3} ry={r * 0.42} fill="#fff" opacity="0.45" />
        </g>
      ))}
    </svg>
  )
}

// dreamy pastel bokeh lights drifting behind everything
function Bokeh() {
  const dots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${(i * 47 + 5) % 95}%`,
    size: `${44 + ((i * 23) % 60)}px`,
    delay: `${(i * 2.4) % 12}s`,
    duration: `${16 + ((i * 5) % 10)}s`,
    color: ['#f8bbd0', '#ffe0b2', '#d1c4e9', '#b2dfdb'][i % 4],
  }))
  return (
    <div className="bokeh-bg" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  )
}

function PopBits({ color }) {
  const bits = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const dist = 46 + (i % 3) * 18
    return {
      id: i,
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist}px`,
      heart: i % 3 === 0,
    }
  })
  return (
    <span className="pop-bits" aria-hidden="true">
      {bits.map((b) =>
        b.heart ? (
          <em key={b.id} style={{ '--dx': b.dx, '--dy': b.dy }}>💖</em>
        ) : (
          <i key={b.id} style={{ '--dx': b.dx, '--dy': b.dy, background: color }} />
        ),
      )}
    </span>
  )
}

export default function BalloonPop({ onDone }) {
  // null = intact, 'popping' = burst animation, 'popped' = word shown
  const [states, setStates] = useState(Array(4).fill(null))
  const [celebrate, setCelebrate] = useState(false)
  const finished = useRef(false)

  const pop = (i) => {
    if (states[i]) return
    setStates((s) => s.map((v, j) => (j === i ? 'popping' : v)))
    setTimeout(() => {
      setStates((s) => s.map((v, j) => (j === i ? 'popped' : v)))
    }, 320)
  }

  useEffect(() => {
    if (finished.current || !states.every((v) => v === 'popped')) return
    finished.current = true
    const showPhrase = setTimeout(() => setCelebrate(true), 700)
    const t = setTimeout(onDone, 4300)
    return () => {
      clearTimeout(showPhrase)
      clearTimeout(t)
    }
  }, [states, onDone])

  const popped = states.filter((v) => v === 'popped').length

  return (
    <div className="screen balloons-screen">
      <HeartsBackground />
      <Bokeh />
      {/* dreamy drifting clouds */}
      <div className="clouds-bg" aria-hidden="true">
        <span className="cloud c1" />
        <span className="cloud c2" />
        <span className="cloud c3" />
      </div>
      {/* party garlands in the corners */}
      <GarlandCluster />
      <GarlandCluster flip />

      <h1 className="screen-title pink">Pop the balloons, cutie 🎈</h1>
      <p className="screen-sub">each one is hiding a little secret…</p>

      {/* heart progress */}
      <div className="pop-progress" aria-hidden="true">
        {states.map((s, i) => (
          <span key={i} className={s === 'popped' ? 'lit' : ''}>
            {s === 'popped' ? '💖' : '🤍'}
          </span>
        ))}
      </div>

      <div className="balloon-grid">
        {config.balloonWords.map((word, i) => (
          <div className="balloon-cell" key={word + i}>
            {states[i] === 'popped' ? (
              <span className="word-badge" style={{ animationDelay: '0.05s' }}>
                {word}
              </span>
            ) : (
              <button
                className={`balloon ${states[i] === 'popping' ? 'popping' : ''}`}
                style={{ animationDelay: `${i * 0.45}s` }}
                onClick={() => pop(i)}
                aria-label={`Pop balloon ${i + 1}`}
              >
                <KawaiiBalloon color={BALLOON_COLORS[i]} idx={i} />
                {states[i] === 'popping' && (
                  <>
                    <PopBits color={BALLOON_COLORS[i].body} />
                    <span
                      className="shockwave"
                      aria-hidden="true"
                      style={{ borderColor: BALLOON_COLORS[i].body }}
                    />
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* all popped: the words fly together into one message */}
      {celebrate && (
        <div className="phrase-overlay">
          <p className="phrase-text">
            {config.balloonWords.map((w, i) => (
              <span key={w + i} style={{ animationDelay: `${0.15 + i * 0.22}s` }}>
                {w}
              </span>
            ))}
            <span className="phrase-name" style={{ animationDelay: '1.1s' }}>
              , {config.name} 💖
            </span>
          </p>
        </div>
      )}

      {popped === 4 && !celebrate && <span className="sr-only">All balloons popped!</span>}
    </div>
  )
}
