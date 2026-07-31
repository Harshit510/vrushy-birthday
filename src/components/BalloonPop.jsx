import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

const BALLOON_COLORS = [
  { body: '#7ec3ea', shine: '#c9e8f8', ribbon: '#5aa7d6' }, // blue
  { body: '#f4b8cd', shine: '#fbdfe9', ribbon: '#e298b4' }, // pink
  { body: '#8fd6b1', shine: '#cdeedd', ribbon: '#6cbd93' }, // green
  { body: '#b9aee4', shine: '#ded7f4', ribbon: '#9d8fd3' }, // purple
]

function WatercolorBalloon({ color }) {
  return (
    <svg viewBox="0 0 120 190" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="62" rx="46" ry="54" fill={color.body} opacity="0.9" />
      <ellipse cx="60" cy="66" rx="40" ry="48" fill={color.body} />
      <ellipse cx="44" cy="42" rx="15" ry="22" fill={color.shine} opacity="0.75" />
      <polygon points="54,114 66,114 60,126" fill={color.ribbon} />
      {/* curly ribbons */}
      <path
        d="M60 126 q -12 14 -2 26 q 10 12 -4 24 M60 126 q 10 16 2 28 q -8 12 6 22 M60 126 q -2 20 -10 30"
        stroke={color.ribbon}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* little chick face sticker like the video */}
      <circle cx="60" cy="106" r="9" fill="#fdf6d8" stroke="#eeda9a" />
      <circle cx="57" cy="104" r="1.4" fill="#7a6430" />
      <circle cx="63" cy="104" r="1.4" fill="#7a6430" />
      <polygon points="58.5,108 61.5,108 60,110.5" fill="#f0a63c" />
    </svg>
  )
}

function PopBits({ color }) {
  const bits = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2
    const dist = 46 + (i % 3) * 16
    return {
      id: i,
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist}px`,
    }
  })
  return (
    <span className="pop-bits" aria-hidden="true">
      {bits.map((b) => (
        <i key={b.id} style={{ '--dx': b.dx, '--dy': b.dy, background: color }} />
      ))}
    </span>
  )
}

export default function BalloonPop({ onDone }) {
  // null = intact, 'popping' = burst animation, 'popped' = word shown
  const [states, setStates] = useState(Array(4).fill(null))
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
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [states, onDone])

  const popped = states.filter((v) => v === 'popped').length

  return (
    <div className="screen">
      <HeartsBackground />
      <h1 className="screen-title pink">Pop all 4 balloons</h1>
      <p className="screen-sub balloon-count">
        {popped === 4 ? 'Yay! 🎉' : `${popped} / 4 popped 🎈`}
      </p>
      <div className="balloon-grid">
        {config.balloonWords.map((word, i) => (
          <div className="balloon-cell" key={word + i}>
            {states[i] === 'popped' ? (
              <span className="balloon-word">{word}</span>
            ) : (
              <button
                className={`balloon ${states[i] === 'popping' ? 'popping' : ''}`}
                style={{ animationDelay: `${i * 0.45}s` }}
                onClick={() => pop(i)}
                aria-label={`Pop balloon ${i + 1}`}
              >
                <WatercolorBalloon color={BALLOON_COLORS[i]} />
                {states[i] === 'popping' && <PopBits color={BALLOON_COLORS[i].body} />}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
