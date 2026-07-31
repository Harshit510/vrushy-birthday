import { useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

// Our real photos — everything in src/assets/pics, sorted by filename
const picModules = import.meta.glob('../assets/pics/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const photos = Object.keys(picModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .filter((path) => !path.includes('(15)')) // duplicate of (10)
  .map((path) => picModules[path])

// Little love notes from me to you — one per photo
const NOTES = [
  'The day I knew my heart was yours 💘',
  'Your smile — my favourite view in the whole world 😍',
  'Every ordinary day turns golden with you ✨',
  'My partner in every silly little adventure 🤭',
  'The prettiest girl, inside and out 🌸',
  'Home was never a place — it was always you 🏡💕',
  'I fall for you a little more every single day 🫶',
  'My today, my tomorrow, my always ♾️',
  '25 looks so beautiful on you, my love 👑',
  'Us. My favourite word in the world 💑',
  'I could live in this moment forever 🥹',
  'Look at us — my dream, in a photo 💭💗',
  'Made for each other. Simple as that 🧿',
  'And still, my heart skips when I see you 💓',
]

// a new order every single time she opens this screen
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function cardTransform({ pos, isTop, drag, flying, isFlying }) {
  if (isFlying) return `translate(${flying.dx}px, ${flying.dy}px) rotate(${flying.dx / 8}deg)`
  return `translate(0px, ${pos * 10}px) rotate(${pos % 2 ? 3 : -2}deg) scale(${1 - pos * 0.04})`
}

const baseTransform = cardTransform({ pos: 0, flying: null, isFlying: false })

// Swipeable polaroid card stack — drag a card away to reveal the next
export default function SweetMoments({ onDone }) {
  const [top, setTop] = useState(0) // index of the topmost card
  const [flying, setFlying] = useState(null) // {index, dx, dy} card animating out
  const start = useRef(null)
  const topEl = useRef(null) // DOM node being dragged
  const raf = useRef(0)

  // shuffled once per visit — a different order every time she opens it
  const [cards] = useState(() =>
    photos.length
      ? shuffle(photos).map((src, i) => ({ src, caption: NOTES[i % NOTES.length] }))
      : config.moments,
  )

  // Drag moves the card directly on the DOM (rAF-synced, zero re-renders)
  // so it glides with her finger instead of stuttering through React updates.
  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY, dx: 0, dy: 0 }
    topEl.current = e.currentTarget
    e.currentTarget.classList.add('dragging')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    const s = start.current
    if (!s || !topEl.current) return
    s.dx = e.clientX - s.x
    s.dy = e.clientY - s.y
    if (raf.current) return
    raf.current = requestAnimationFrame(() => {
      raf.current = 0
      const el = topEl.current
      if (!el || !start.current) return
      const { dx, dy } = start.current
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 14}deg)`
      const stamp = el.querySelector('.love-stamp')
      if (stamp) stamp.style.opacity = Math.min(1, Math.hypot(dx, dy) / 110)
    })
  }

  const release = () => {
    const s = start.current
    const el = topEl.current
    start.current = null
    topEl.current = null
    if (raf.current) {
      cancelAnimationFrame(raf.current)
      raf.current = 0
    }
    if (!s || !el) return
    el.classList.remove('dragging')
    const stamp = el.querySelector('.love-stamp')
    if (stamp) stamp.style.opacity = 0
    const { dx, dy } = s
    if (Math.hypot(dx, dy) > 90) {
      // throw the card off-screen in the drag direction
      const scale = 3.2
      setFlying({ index: top, dx: dx * scale || 300, dy: dy * scale })
      setTimeout(() => {
        setFlying(null)
        setTop((t) => t + 1)
      }, 420)
    } else {
      el.style.transform = baseTransform // snap back smoothly via CSS transition
    }
  }

  const allSwiped = top >= cards.length

  // Final view: the whole screen becomes a photo ring around the message
  if (allSwiped) {
    const n = Math.max(cards.length, 1)
    return (
      <div className="screen moments-screen">
        <HeartsBackground />
        <div className="moments-collage">
          {cards.map((card, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2
            const left = 50 + 38 * Math.cos(angle)
            const topPos = 50 + 38 * Math.sin(angle)
            const rot = i % 2 ? 8 : -8
            return (
              <img
                key={card.src}
                src={card.src}
                alt=""
                className="collage-pic"
                style={{
                  left: `${left}%`,
                  top: `${topPos}%`,
                  '--rot': `${rot}deg`,
                  animationDelay: `${0.15 + i * 0.12}s`,
                }}
                draggable="false"
              />
            )
          })}
          <div className="moments-final">
            <span className="moments-final-heart" aria-hidden="true">💖</span>
            <h2>Every single one of these moments… is you</h2>
            <p>
              To the girl who makes ordinary days feel like celebrations — these aren&apos;t
              just photos, they&apos;re my favourite treasures.
            </p>
            <p>
              Happy 25th, my {config.name}. My heart was yours in every one of them, and it
              always will be. 💖
            </p>
            <span className="final-sign">— yours, forever</span>
            <button className="pill-btn final-continue" onClick={onDone}>
              Continue 💝
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen moments-screen">
      <HeartsBackground />
      <h1 className="screen-title">Us — My Favourite Moments 💞</h1>
      <p className="screen-sub">Swipe each memory, my love</p>

      <div className="card-stack">
        {cards.map((card, i) => {
          if (i < top && flying?.index !== i) return null
          const pos = i - top // 0 = top card
          const isTop = pos === 0
          const isFlying = flying?.index === i

          const transform = cardTransform({ pos, flying, isFlying })

          return (
            <figure
              key={card.src + i}
              className={`polaroid ${isFlying ? 'flying' : ''}`}
              style={{ transform, zIndex: cards.length - pos }}
              onPointerDown={isTop && !flying ? onPointerDown : undefined}
              onPointerMove={isTop && !flying ? onPointerMove : undefined}
              onPointerUp={isTop && !flying ? release : undefined}
              onPointerCancel={isTop && !flying ? release : undefined}
            >
              <span className="washi-tape" aria-hidden="true" />
              <span className="photo-count">{Math.min(i + 1, cards.length)} / {cards.length}</span>
              <img src={card.src} alt={card.caption} draggable="false" />
              <figcaption>{card.caption}</figcaption>
              {isTop && (
                <span className="love-stamp" aria-hidden="true" style={{ opacity: 0 }}>
                  💖
                </span>
              )}
            </figure>
          )
        })}
      </div>

      <div className="stack-dots" aria-hidden="true">
        {cards.map((card, i) => {
          let cls = ''
          if (i < top) cls = 'done'
          else if (i === top) cls = 'active'
          return <i key={card.src + i} className={cls} />
        })}
      </div>

    </div>
  )
}
