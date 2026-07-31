import { useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

function Rose({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="19" fill="#b8232f" />
      <circle cx={x} cy={y} r="13" fill="#d63a44" />
      <path
        d={`M ${x - 8} ${y} a 8 8 0 0 1 16 0 a 5.5 5.5 0 0 1 -11 0`}
        fill="#9c1b26"
        opacity="0.85"
      />
      <circle cx={x} cy={y} r="4" fill="#8a1620" />
    </g>
  )
}

function Sunflower({ x, y }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <g>
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx={x}
          cy={y - 14}
          rx="5"
          ry="12"
          fill="#f4b91d"
          stroke="#dd9c0d"
          strokeWidth="0.8"
          transform={`rotate(${angle} ${x} ${y})`}
        />
      ))}
      {/* seed head */}
      <circle cx={x} cy={y} r="10.5" fill="#7a4a1f" />
      <circle cx={x} cy={y} r="7" fill="#5d3817" />
      {[[-3, -2], [3, -3], [0, 2], [-4, 3], [4, 3], [0, -5]].map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r="1.1" fill="#8a5a2b" />
      ))}
    </g>
  )
}

function Bouquet({ onFlowerTap }) {
  // watercolor-style mixed bouquet — red roses & sunflowers in cream paper
  // [x, y, kind] — sunflowers sit at the outer ring, roses fill the heart
  const flowers = [
    [130, 58, 'sun'], [88, 74, 'rose'], [172, 74, 'rose'],
    [64, 104, 'sun'], [113, 90, 'rose'], [148, 92, 'sun'],
    [196, 104, 'sun'], [92, 122, 'rose'], [131, 116, 'sun'],
    [168, 124, 'rose'],
  ]
  return (
    <svg viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg">
      {/* greenery */}
      {[
        [60, 90, -30], [200, 90, 30], [45, 130, -50], [215, 130, 50], [130, 45, 0],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="10"
          ry="26"
          fill="#7fa882"
          opacity="0.75"
          transform={`rotate(${r} ${x} ${y})`}
          className="bloom-leaf"
          style={{ animationDelay: `${0.15 + i * 0.1}s` }}
        />
      ))}
      {/* wrap paper (back) */}
      <path d="M52 96 L130 210 L208 96 L188 70 L72 70 Z" fill="#f3ead8" />
      {/* flowers — each blooms in, and taps release a love-word */}
      {flowers.map(([x, y, kind], i) => (
        <g
          key={`${x}-${y}`}
          className="bloom-flower"
          style={{ animationDelay: `${0.45 + i * 0.14}s` }}
          onClick={(e) => onFlowerTap(e, i)}
        >
          {kind === 'sun' ? <Sunflower x={x} y={y} /> : <Rose x={x} y={y} />}
        </g>
      ))}
      {/* small leaves between flowers */}
      {[[110, 78], [150, 112], [92, 112]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="10" fill="#6d9871" transform={`rotate(40 ${x} ${y})`} />
      ))}
      {/* wrap paper (front cone) */}
      <path d="M58 118 L130 232 L202 118 Q 130 158 58 118 Z" fill="#faf3e3" />
      <path d="M58 118 L130 232 L202 118" fill="none" stroke="#e5d9bd" strokeWidth="2" />
      {/* bow */}
      <g transform="translate(130 196)">
        <path d="M0 0 C -26 -18 -40 4 -18 12 C -34 16 -14 30 0 8 Z" fill="#c22331" />
        <path d="M0 0 C 26 -18 40 4 18 12 C 34 16 14 30 0 8 Z" fill="#d63a44" />
        <circle cx="0" cy="5" r="7" fill="#9c1b26" />
        <path d="M-4 10 L -16 52 M 4 10 L 18 48 M 0 12 L -2 56" stroke="#c22331" strokeWidth="3.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const PETAL_CHARS = ['🌹', '🌻', '🌸', '🍃']

function FallingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 89) % 100}%`,
    delay: `${(i * 1.3) % 8}s`,
    duration: `${6 + ((i * 5) % 5)}s`,
    char: PETAL_CHARS[i % PETAL_CHARS.length],
  }))
  return (
    <div className="petals-bg" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}

// Two butterflies fluttering around the bouquet
function Butterflies() {
  return (
    <div className="butterflies" aria-hidden="true">
      <span className="butterfly b1">🦋</span>
      <span className="butterfly b2">🦋</span>
    </div>
  )
}

// little love-words that float out of tapped flowers
const FLOWER_WORDS = [
  'my sunshine ☀️',
  'meri jaan ❤️',
  'the prettiest 🌷',
  'my peace 🕊️',
  'my whole heart 💝',
  'cutie 🥰',
  'my angel 😇',
  'meri duniya 🌍',
  'my forever 💫',
  'sweetest soul 🍯',
  'my dream come true 🌙',
  'queen of my heart 👑',
  'my favourite person 🫶',
  'the reason I smile 😊',
  'my lucky charm ✨',
  'mine. only mine 😌💘',
]

const TAPS_TO_PROPOSE = 5

export default function RoseBouquet({ onDone }) {
  const [floats, setFloats] = useState([])
  const [tapCount, setTapCount] = useState(0)
  const [proposal, setProposal] = useState('waiting') // waiting → asking → yes

  const onFlowerTap = (e, i) => {
    if (proposal !== 'waiting') return
    const id = `${Date.now()}-${i}-${Math.random()}`
    const text = FLOWER_WORDS[(tapCount + i) % FLOWER_WORDS.length]
    setFloats((f) => [...f.slice(-5), { id, x: e.clientX, y: e.clientY, text }])
    const taps = tapCount + 1
    setTapCount(taps)
    setTimeout(() => setFloats((f) => f.filter((w) => w.id !== id)), 2000)
    if (taps === TAPS_TO_PROPOSE) {
      setTimeout(() => setProposal('asking'), 900)
    }
  }

  const sayYes = () => setProposal('yes')

  // she must meet the love-card before moving on — even if she skips the flowers
  const handleContinue = () => {
    if (proposal === 'waiting') setProposal('asking')
    else onDone()
  }

  return (
    <div className="screen bouquet-screen">
      <HeartsBackground />
      <FallingPetals />
      <Butterflies />

      <h1 className="screen-title">A Bouquet Grown From My Heart 🌹🌻</h1>
      <p className="screen-sub">
        {proposal === 'waiting'
          ? `roses for my love, sunflowers for my sunshine — tap ${TAPS_TO_PROPOSE} flowers 😚`
          : 'you & me — always ❤️'}
      </p>

      {/* tap progress: five little petals fill up */}
      {proposal === 'waiting' && (
        <div className="tap-petals" aria-hidden="true">
          {Array.from({ length: TAPS_TO_PROPOSE }, (_, i) => (
            <span key={i} className={i < tapCount ? 'lit' : ''}>
              {i < tapCount ? '🌸' : '·'}
            </span>
          ))}
        </div>
      )}

      <div className="bouquet-wrap">
        <div className="bouquet-glow" aria-hidden="true" />
        <div className="bouquet-float">
          <Bouquet onFlowerTap={onFlowerTap} />
          <span className="bouquet-tag">
            for the prettiest girl 🌷
          </span>
        </div>
      </div>

      {/* floating love-words released by taps */}
      <div className="flower-words" aria-hidden="true">
        {floats.map((w) => (
          <span key={w.id} style={{ left: w.x, top: w.y }}>
            {w.text}
          </span>
        ))}
      </div>

      {/* the bouquet proposes 💍 */}
      {proposal === 'asking' && (
        <div className="propose-overlay">
          <div className="propose-card">
            <span className="propose-ring" aria-hidden="true">❤️</span>
            <p className="propose-lead">shhh… listen closely. every flower here is whispering…</p>
            <h2 className="propose-q">
              Out of every heart in this world, mine chose yours —
              and it chooses you again, every single day.
            </h2>
            <p className="propose-iloveyou">I love you, {config.name} ❤️</p>
            <div className="propose-btns">
              <button className="love-reply main" onClick={sayYes}>
                <span>I love you too</span> 💖
              </button>
              <button className="love-reply soft" onClick={sayYes}>
                <span>I love you more</span> 🥹
              </button>
            </div>
          </div>
        </div>
      )}

      {proposal === 'yes' && (
        <div className="yes-burst" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ '--angle': `${i * 26}deg`, animationDelay: `${i * 0.04}s` }}>💖</i>
          ))}
        </div>
      )}

      {proposal !== 'asking' && (
        <div className="bouquet-footer">
          {proposal === 'yes' && (
            <p className="yes-note">…and she loves me too 💖 — luckiest man alive</p>
          )}
          <button className="pill-btn" onClick={handleContinue}>
            {proposal === 'yes' ? 'Continue, my love →' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  )
}
