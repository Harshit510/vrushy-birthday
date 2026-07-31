import { config } from '../config'
import HeartsBackground from './HeartsBackground'
import Confetti from './Confetti'

// Cute bunny & bear "HBD" card art, like the video's finale sticker
function HbdArt() {
  return (
    <svg viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="220" height="190" rx="14" fill="#fdf7f8" />
      {/* HBD lettering */}
      <text
        x="110"
        y="42"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fontSize="30"
        fill="#e75f8f"
        stroke="#c94a76"
        strokeWidth="1"
      >
        HBD
      </text>
      {['#f6c744', '#8fd6b1', '#b9aee4', '#7ec3ea'].map((c, i) => (
        <circle key={i} cx={48 + i * 42} cy={i % 2 ? 20 : 54} r="4" fill={c} opacity="0.85" />
      ))}
      {/* bunny */}
      <g transform="translate(58 108)">
        <ellipse cx="0" cy="42" rx="30" ry="34" fill="#fff" stroke="#e3d7d7" strokeWidth="2" />
        <ellipse cx="-12" cy="-18" rx="9" ry="26" fill="#fff" stroke="#e3d7d7" strokeWidth="2" />
        <ellipse cx="12" cy="-18" rx="9" ry="26" fill="#fff" stroke="#e3d7d7" strokeWidth="2" />
        <ellipse cx="-12" cy="-16" rx="4.5" ry="18" fill="#f8d7dd" />
        <ellipse cx="12" cy="-16" rx="4.5" ry="18" fill="#f8d7dd" />
        <circle cx="0" cy="18" r="24" fill="#fff" stroke="#e3d7d7" strokeWidth="2" />
        <circle cx="-9" cy="14" r="2.6" fill="#463832" />
        <circle cx="9" cy="14" r="2.6" fill="#463832" />
        <path d="M-3 22 q 3 3 6 0" stroke="#463832" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* cake she holds */}
        <g transform="translate(0 48)">
          <rect x="-16" y="-8" width="32" height="16" rx="4" fill="#8a5a44" />
          <path d="M-16 -8 q 8 -7 16 0 t 16 0 v 5 h -32 z" fill="#fdf3f0" />
          <circle cx="-8" cy="-12" r="2.4" fill="#e75f5f" />
          <circle cx="0" cy="-14" r="2.4" fill="#e75f5f" />
          <circle cx="8" cy="-12" r="2.4" fill="#e75f5f" />
        </g>
      </g>
      {/* bear */}
      <g transform="translate(152 112)">
        <circle cx="-20" cy="-14" r="10" fill="#8a5a3b" />
        <circle cx="20" cy="-14" r="10" fill="#8a5a3b" />
        <circle cx="-20" cy="-14" r="5" fill="#b98a63" />
        <circle cx="20" cy="-14" r="5" fill="#b98a63" />
        <ellipse cx="0" cy="40" rx="30" ry="32" fill="#96633f" />
        <circle cx="0" cy="6" r="26" fill="#96633f" />
        <ellipse cx="0" cy="14" rx="12" ry="9" fill="#c9996c" />
        <circle cx="-9" cy="0" r="2.6" fill="#3a2a1c" />
        <circle cx="9" cy="0" r="2.6" fill="#3a2a1c" />
        <ellipse cx="0" cy="11" rx="3.4" ry="2.6" fill="#3a2a1c" />
        {/* gift he holds */}
        <g transform="translate(0 46)">
          <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#f2d349" stroke="#d8b62e" strokeWidth="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#e75f8f" strokeWidth="4" />
          <path d="M0 -10 C -8 -20 -16 -14 -6 -9 M0 -10 C 8 -20 16 -14 6 -9" stroke="#e75f8f" strokeWidth="3" fill="none" />
        </g>
      </g>
      {/* sparkles */}
      {[[30, 92], [190, 84], [110, 70]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize="12" textAnchor="middle">✨</text>
      ))}
    </svg>
  )
}

function RisingBalloons() {
  const balloons = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    left: `${(i * 61 + 8) % 92}%`,
    delay: `${(i * 2.1) % 9}s`,
    duration: `${10 + ((i * 3) % 6)}s`,
    char: ['🎈', '🩷', '🎈', '💛', '🎈', '💜', '🎈'][i],
  }))
  return (
    <div className="rising-balloons" aria-hidden="true">
      {balloons.map((b) => (
        <span
          key={b.id}
          style={{ left: b.left, animationDelay: b.delay, animationDuration: b.duration }}
        >
          {b.char}
        </span>
      ))}
    </div>
  )
}

export default function Finale({ onReplay }) {
  return (
    <div className="screen finale-screen">
      <HeartsBackground count={14} />
      <RisingBalloons />
      <Confetti />
      <div className="hbd-card">
        <span className="letter-pin">♥</span>
        <HbdArt />
      </div>
      <h1 className="finale-title">{config.finale.title}</h1>
      <p className="finale-msg">{config.finale.message}</p>
      <button className="replay-btn" onClick={onReplay}>
        ↻ Replay
      </button>
      <div className="finale-cta">
        <span style={{ fontSize: '1.6rem' }}>🎂 🎈 🎁</span>
      </div>
    </div>
  )
}
