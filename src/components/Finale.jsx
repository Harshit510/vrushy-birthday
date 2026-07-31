import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'
import Confetti from './Confetti'
import grandPic from '../assets/pics/shared image (7).jpg'

// Real fireworks on canvas — rockets rise and burst into glowing sparks
function Fireworks() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let raf

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#ff5f8f', '#ffd166', '#c084fc', '#7dd3fc', '#fb7185', '#f9a8d4', '#fbbf24']
    const rockets = []
    const sparks = []

    const launch = () => {
      rockets.push({
        x: (0.15 + 0.7 * Math.random()) * canvas.width,
        y: canvas.height,
        vy: -(8.5 + Math.random() * 4.5) * dpr,
        color: colors[(Math.random() * colors.length) | 0],
      })
    }
    launch()
    const timer = setInterval(launch, 850)

    const explode = (r) => {
      const n = 44 + ((Math.random() * 20) | 0)
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + Math.random() * 0.2
        const speed = (1.6 + Math.random() * 3.4) * dpr
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.011 + Math.random() * 0.009,
          color: r.color,
        })
      }
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.y += r.vy
        r.vy += 0.11 * dpr
        ctx.beginPath()
        ctx.arc(r.x, r.y, 2.4 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = r.color
        ctx.fill()
        if (r.vy >= -1.5 * dpr) {
          explode(r)
          rockets.splice(i, 1)
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.045 * dpr
        s.vx *= 0.985
        s.life -= s.decay
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = s.life
        ctx.beginPath()
        ctx.arc(s.x, s.y, 2.1 * dpr * s.life + 0.6, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}

// 25 reasons for 25 years
const REASONS = [
  'Your smile can fix my whole day',
  'The way you laugh at your own jokes before finishing them',
  'How safe the world feels when you hold my hand',
  'Your heart — the kindest one I know',
  'The way time slows down when you look at me',
  'How you remember the little things I mention once',
  'Your hugs. Nothing else comes close',
  'The way you dance when you think no one is watching',
  'How fiercely you love the people you care about',
  'Your voice — my favourite sound in any room',
  'The way you make ordinary evenings unforgettable',
  'How brave you are, even when you don’t feel it',
  'Your dreams, and how alive you look chasing them',
  'The way my name sounds sweeter when you say it',
  'How you always know what I need before I say it',
  'Your eyes when you talk about what you love',
  'The comfort of just sitting silently beside you',
  'How you turn my worst moods into laughter',
  'The little rituals that are only ours',
  'How beautiful you are without even trying',
  'The way you believe in me more than I do',
  'Your stubbornness (yes, even that)',
  'How home stopped being a place and became you',
  'The future I can see so clearly in your eyes',
  'Simply — because you’re you. And that’s everything',
]

function ReasonsShow({ onFinished }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (idx >= REASONS.length - 1) {
      const t = setTimeout(onFinished, 5500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIdx((i) => i + 1), 5000)
    return () => clearTimeout(t)
  }, [idx, onFinished])

  const advance = () => {
    if (idx < REASONS.length - 1) setIdx((i) => i + 1)
    else onFinished()
  }

  return (
    <div className="reasons-stage">
      <h1 className="reasons-title">25 years of you…</h1>
      <p className="reasons-sub">…so here are 25 reasons I love you</p>

      <button className="reason-card" onClick={advance} aria-label="Next reason">
        <span className="reason-num">{idx + 1}</span>
        <p key={idx} className="reason-text">{REASONS[idx]}</p>
        <span className="reason-progress">{idx + 1} / 25 💗</span>
      </button>

      <button className="skip-link" onClick={onFinished}>
        skip to the surprise →
      </button>
    </div>
  )
}

function GrandFinale({ onReplay }) {
  return (
    <div className="grand-stage">
      <span className="grand-burst" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} style={{ '--angle': `${i * 36}deg`, animationDelay: `${i * 0.05}s` }}>💖</i>
        ))}
      </span>

      <div className="grand-photo">
        <span className="photo-ring" aria-hidden="true" />
        <span className="photo-ring ring-2" aria-hidden="true" />
        <img src={grandPic} alt={`${config.name} and me`} draggable="false" />
      </div>

      <h1 className="grand-title">Happy 25th, my {config.name} 💖</h1>

      <p className="grand-msg">
        This is the first birthday of yours I got to turn into a little world of its own —
        and I promise you, it won&apos;t be the last.
      </p>
      <p className="grand-msg strong">
        The best is yet to come. Every year, I&apos;ll love you louder than the last. ♾️
      </p>

      <span className="grand-sign">— forever &amp; always, yours</span>

      <button className="replay-btn" onClick={onReplay}>
        ↻ Relive the surprise
      </button>
    </div>
  )
}

export default function Finale({ onReplay }) {
  const [stage, setStage] = useState('reasons') // reasons → grand

  return (
    <div className="screen finale-screen">
      <HeartsBackground count={14} />
      <Fireworks />
      {stage === 'grand' && <Confetti pieceCount={120} rainMs={7000} />}
      {stage === 'reasons' ? (
        <ReasonsShow onFinished={() => setStage('grand')} />
      ) : (
        <GrandFinale onReplay={onReplay} />
      )}
    </div>
  )
}
