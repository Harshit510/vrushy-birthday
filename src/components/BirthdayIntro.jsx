import { config } from '../config'
import HeartsBackground from './HeartsBackground'
import Confetti from './Confetti'

const BUNTING_COLORS = ['#f06292', '#ffd54f', '#81d4fa', '#aed581', '#ce93d8', '#ffb74d']

// A string of party flags across the top of the screen
function Bunting() {
  const flags = Array.from({ length: 12 }, (_, i) => BUNTING_COLORS[i % BUNTING_COLORS.length])
  return (
    <svg className="bunting" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 Q 300 34 600 6" stroke="#c98a9c" strokeWidth="3" fill="none" />
      {flags.map((color, i) => {
        const x = 25 + i * 50
        const y = 6 + Math.sin((i / 11) * Math.PI) * 26
        return <polygon key={i} points={`${x - 16},${y} ${x + 16},${y} ${x},${y + 34}`} fill={color} />
      })}
    </svg>
  )
}

function BouncyText({ text, className }) {
  return (
    <span className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="bounce-letter" style={{ animationDelay: `${0.35 + i * 0.07}s` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function BirthdayIntro({ onDone }) {
  return (
    <div className="screen intro-screen">
      <HeartsBackground count={14} />
      <Confetti pieceCount={110} rainMs={999999} />
      <Bunting />

      <div className="intro-center">
        <div className="intro-emoji-row" aria-hidden="true">
          <span>🎈</span>
          <span>🎂</span>
          <span>🎈</span>
        </div>

        <h1 className="intro-happy">
          <BouncyText text="Happy" className="intro-line" />
          <BouncyText text="Birthday" className="intro-line" />
        </h1>

        <p className="intro-name">{config.name} 💖</p>

        <p className="intro-tag">A little surprise, made just for you…</p>

        <button className="pill-btn intro-btn" onClick={onDone}>
          Let&apos;s Celebrate 🎉
        </button>
      </div>
    </div>
  )
}
