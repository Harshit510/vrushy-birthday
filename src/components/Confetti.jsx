import { useEffect, useRef } from 'react'

// Lightweight confetti on a full-screen canvas (no dependencies)
export default function Confetti({ pieceCount = 160, rainMs = 9000 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#f48fb1', '#f06292', '#fff176', '#aed581', '#81d4fa', '#ffb74d', '#ce93d8']
    const pieces = Array.from({ length: pieceCount }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      w: (5 + Math.random() * 6) * dpr,
      h: (8 + Math.random() * 8) * dpr,
      color: colors[(Math.random() * colors.length) | 0],
      vy: (1.4 + Math.random() * 2.4) * dpr,
      vx: (Math.random() - 0.5) * 1.6 * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.18,
    }))

    const started = performance.now()
    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = now - started
      for (const p of pieces) {
        p.x += p.vx + Math.sin(p.y / 60) * 0.6 * dpr
        p.y += p.vy
        p.rot += p.vr
        if (p.y > canvas.height + 20 && elapsed < rainMs) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [pieceCount, rainMs])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}
