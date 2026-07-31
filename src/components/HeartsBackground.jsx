import { useMemo } from 'react'

// Softly rising hearts/sparkles used behind every screen
export default function HeartsBackground({ count = 10 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        delay: `${(i * 1.7) % 12}s`,
        duration: `${9 + ((i * 3) % 7)}s`,
        size: `${0.7 + ((i * 13) % 10) / 12}rem`,
        char: i % 3 === 0 ? '🩷' : i % 3 === 1 ? '💗' : '✨',
      })),
    [count],
  )

  return (
    <div className="hearts-bg" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  )
}
