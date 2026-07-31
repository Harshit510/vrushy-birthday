import { useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'
import Confetti from './Confetti'

// Her name signs itself on screen like a live signature, then fills
// with a glowing pink-gold gradient and a heart pops at the end
function SignatureName({ text }) {
  return (
    <span className="sig-wrap">
      <svg className="sig-name" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d63384" />
            <stop offset="55%" stopColor="#f06292" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* outline draws first, like a pen writing */}
        <text x="320" y="128" textAnchor="middle" className="sig-stroke">
          {text}
        </text>
        {/* then the ink floods in */}
        <text x="320" y="128" textAnchor="middle" className="sig-fill">
          {text}
        </text>
      </svg>
      <span className="sig-heart" aria-hidden="true">💖</span>
      <span className="sig-sparkles" aria-hidden="true">
        <i style={{ left: '12%', top: '18%', animationDelay: '3.2s' }}>✨</i>
        <i style={{ left: '86%', top: '24%', animationDelay: '3.6s' }}>✨</i>
        <i style={{ left: '22%', top: '78%', animationDelay: '4s' }}>✨</i>
        <i style={{ left: '76%', top: '74%', animationDelay: '3.4s' }}>✨</i>
      </span>
    </span>
  )
}

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
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

// Act 1 — a quiet, magical moment before the celebration bursts open
function HushScreen({ onOpen }) {
  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 53) % 100}%`,
    top: `${(i * 37) % 92}%`,
    delay: `${(i * 0.7) % 4}s`,
    size: `${0.55 + ((i * 7) % 10) / 14}rem`,
  }))
  return (
    <div className="screen hush-screen">
      <div className="hush-stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            style={{ left: s.left, top: s.top, animationDelay: s.delay, fontSize: s.size }}
          >
            ✦
          </span>
        ))}
      </div>

      <p className="hush-psst">Hey my love… 💖</p>
      <h1 className="hush-line">I wrapped up all my love for you</h1>
      <h1 className="hush-line two">into one little world. It&apos;s yours, {config.name} ❤️</h1>

      <button className="hush-gift" onClick={onOpen} aria-label="Open your surprise">
        <span className="hush-ring" aria-hidden="true" />
        <span className="hush-ring r2" aria-hidden="true" />
        <span className="hush-heart" aria-hidden="true">💝</span>
      </button>
      <p className="hush-hint">tap the heart to open it</p>
    </div>
  )
}

export default function BirthdayIntro({ onDone }) {
  const [stage, setStage] = useState('hush') // hush → party

  if (stage === 'hush') {
    return <HushScreen onOpen={() => setStage('party')} />
  }

  return (
    <div className="screen intro-screen">
      <span className="intro-rays" aria-hidden="true" />
      <HeartsBackground count={14} />
      <Confetti pieceCount={130} rainMs={999999} />
      <Bunting />

      <span className="intro-burst" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ '--angle': `${i * 30}deg`, animationDelay: `${i * 0.04}s` }}>💖</i>
        ))}
      </span>

      <div className="intro-center">
        <div className="intro-emoji-row" aria-hidden="true">
          <span>🎈</span>
          <span>🎂</span>
          <span>🎈</span>
        </div>

        <h1 className="intro-happy shimmer">
          <BouncyText text="Happy" className="intro-line" />
          <BouncyText text="Birthday" className="intro-line" />
        </h1>

        <div className="intro-name-dust">
          <span className="intro-crown" aria-hidden="true">👑</span>
          <SignatureName text={config.name} />
        </div>

        <p className="intro-tag">Today is all about you, my love — every bit of it…</p>

        <button className="pill-btn intro-btn" onClick={onDone}>
          Let&apos;s Celebrate 🎉
        </button>
      </div>
    </div>
  )
}
