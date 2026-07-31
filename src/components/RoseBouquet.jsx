import HeartsBackground from './HeartsBackground'

function Bouquet() {
  // watercolor-style red rose bouquet wrapped in cream paper with a red bow
  const roses = [
    [95, 78], [130, 62], [165, 78], [78, 108], [113, 95],
    [148, 95], [182, 108], [96, 128], [131, 118], [164, 128],
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
        />
      ))}
      {/* wrap paper (back) */}
      <path d="M52 96 L130 210 L208 96 L188 70 L72 70 Z" fill="#f3ead8" />
      {/* roses */}
      {roses.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="19" fill="#b8232f" />
          <circle cx={x} cy={y} r="13" fill="#d63a44" />
          <path
            d={`M ${x - 8} ${y} a 8 8 0 0 1 16 0 a 5.5 5.5 0 0 1 -11 0`}
            fill="#9c1b26"
            opacity="0.85"
          />
          <circle cx={x} cy={y} r="4" fill="#8a1620" />
        </g>
      ))}
      {/* small leaves between roses */}
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

const PETAL_CHARS = ['🌹', '🌸', '🍃']

function FallingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 89) % 100}%`,
    delay: `${(i * 1.3) % 8}s`,
    duration: `${6 + ((i * 5) % 5)}s`,
    char: PETAL_CHARS[i % 3],
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

export default function RoseBouquet({ onDone }) {
  return (
    <div className="screen bouquet-screen">
      <HeartsBackground />
      <FallingPetals />
      <h1 className="screen-title">Your Rose Bouquet 🌹</h1>
      <p className="screen-sub">Every rose here is a reason I adore you</p>
      <div className="bouquet-wrap">
        <div className="bouquet-float">
          <Bouquet />
        </div>
      </div>
      <div className="bouquet-footer">
        <button className="pill-btn" onClick={onDone}>
          Continue →
        </button>
      </div>
    </div>
  )
}
