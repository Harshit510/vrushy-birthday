import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

function Envelope({ open, onClick }) {
  return (
    <button className={`envelope ${open ? 'open' : ''}`} onClick={onClick} aria-label="Open the envelope">
      <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
        {/* body */}
        <rect x="10" y="30" width="180" height="100" rx="6" fill="#f8f3e4" stroke="#cfa84a" strokeWidth="2.5" />
        {/* inner pink */}
        <polygon points="10,30 100,95 190,30" fill="#f3c4c4" />
        {/* bottom folds */}
        <polygon points="10,130 82,78 10,42" fill="#faf6ea" stroke="#cfa84a" strokeWidth="2" />
        <polygon points="190,130 118,78 190,42" fill="#faf6ea" stroke="#cfa84a" strokeWidth="2" />
        <polygon points="10,130 100,66 190,130" fill="#fdfaf0" stroke="#cfa84a" strokeWidth="2.5" />
        {/* flap — swings up when opening */}
        <g className="env-flap">
          <polygon points="10,30 100,95 190,30 190,26 10,26" fill="#f6ddda" stroke="#cfa84a" strokeWidth="2.5" />
          <g className="env-seal">
            <circle cx="100" cy="72" r="14" fill="#d63384" />
            <path
              d="M100 79 q -9 -7 -9 -12 a 4.5 4.5 0 0 1 9 -1.5 a 4.5 4.5 0 0 1 9 1.5 q 0 5 -9 12 z"
              fill="#fff"
              opacity="0.92"
            />
          </g>
        </g>
      </svg>
      <span className="env-hint">{open ? 'Opening… 💌' : 'Tap to open ✉️'}</span>
    </button>
  )
}

// Types out paragraphs one after another with a handwriting feel
function TypedLetter({ paragraphs, onFinished }) {
  const [texts, setTexts] = useState(paragraphs.map(() => ''))
  const done = useRef(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    // split into code points so emoji are never sliced in half
    const chars = paragraphs.map((p) => Array.from(p))
    let p = 0
    let c = 0
    const tick = setInterval(() => {
      if (p >= chars.length) {
        clearInterval(tick)
        if (!done.current) {
          done.current = true
          onFinished()
        }
        return
      }
      c += 1
      const shown = chars[p].slice(0, c).join('')
      setTexts((prev) => prev.map((t, i) => (i === p ? shown : t)))
      if (c >= chars[p].length) {
        p += 1
        c = 0
      }
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
    }, 28)
    return () => clearInterval(tick)
  }, [paragraphs, onFinished])

  return (
    <div className="letter-card" ref={bodyRef}>
      <span className="letter-pin">♥</span>
      <p>Dear {config.name},</p>
      {texts.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
      <span className="corner-art" aria-hidden="true">🐰🧸</span>
    </div>
  )
}

export default function LoveLetter({ onDone }) {
  const [stage, setStage] = useState('sealed') // sealed → opening → reading
  const [finished, setFinished] = useState(false)

  const openEnvelope = () => {
    if (stage !== 'sealed') return
    setStage('opening')
    setTimeout(() => setStage('reading'), 850)
  }

  return (
    <div className="screen letter-screen">
      <HeartsBackground />
      <h1 className="screen-title">A Message From My Heart</h1>
      <div className="letter-stage">
        {stage === 'reading' ? (
          <TypedLetter paragraphs={config.letter} onFinished={() => setFinished(true)} />
        ) : (
          <Envelope open={stage === 'opening'} onClick={openEnvelope} />
        )}
      </div>
      <div className="letter-footer">
        {finished && (
          <button className="pill-btn" onClick={onDone}>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
