import { useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

// Swipeable polaroid card stack — drag a card away to reveal the next
export default function SweetMoments({ onDone }) {
  const [top, setTop] = useState(0) // index of the topmost card
  const [drag, setDrag] = useState(null) // {dx, dy} while dragging
  const [flying, setFlying] = useState(null) // {index, dx, dy} card animating out
  const start = useRef(null)

  const cards = config.moments

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY }
    setDrag({ dx: 0, dy: 0 })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!start.current) return
    setDrag({ dx: e.clientX - start.current.x, dy: e.clientY - start.current.y })
  }

  const release = () => {
    if (!start.current || !drag) return
    const { dx, dy } = drag
    start.current = null
    if (Math.hypot(dx, dy) > 90) {
      // throw the card off-screen in the drag direction
      const scale = 3.2
      setFlying({ index: top, dx: dx * scale || 300, dy: dy * scale })
      setDrag(null)
      setTimeout(() => {
        setFlying(null)
        setTop((t) => t + 1)
      }, 420)
    } else {
      setDrag(null) // snap back
    }
  }

  const allSwiped = top >= cards.length

  return (
    <div className="screen moments-screen">
      <HeartsBackground />
      <h1 className="screen-title">Some Sweet Moments</h1>
      <p className="screen-sub">(Swipe the cards)</p>

      <div className="card-stack">
        {cards.map((card, i) => {
          if (i < top && flying?.index !== i) return null
          const pos = i - top // 0 = top card
          const isTop = pos === 0
          const isFlying = flying?.index === i

          let transform = `translate(0px, ${pos * 10}px) rotate(${pos % 2 ? 3 : -2}deg) scale(${1 - pos * 0.04})`
          if (isTop && drag) {
            transform = `translate(${drag.dx}px, ${drag.dy}px) rotate(${drag.dx / 14}deg)`
          }
          if (isFlying) {
            transform = `translate(${flying.dx}px, ${flying.dy}px) rotate(${flying.dx / 8}deg)`
          }

          return (
            <figure
              key={card.src + i}
              className={`polaroid ${isTop && drag ? 'dragging' : ''} ${isFlying ? 'flying' : ''}`}
              style={{ transform, zIndex: cards.length - pos }}
              onPointerDown={isTop && !flying ? onPointerDown : undefined}
              onPointerMove={isTop && !flying ? onPointerMove : undefined}
              onPointerUp={isTop && !flying ? release : undefined}
              onPointerCancel={isTop && !flying ? release : undefined}
            >
              <img src={card.src} alt={card.caption} draggable="false" />
              <figcaption>{card.caption}</figcaption>
            </figure>
          )
        })}
      </div>

      <div className="moments-footer">
        {(allSwiped || cards.length === 0) && (
          <button className="pill-btn" onClick={onDone}>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
