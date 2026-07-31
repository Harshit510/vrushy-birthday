import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

function Envelope({ open, onClick }) {
  return (
    <button className={`envelope ${open ? 'open' : ''}`} onClick={onClick} aria-label="Open the envelope">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="envPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdfaf0" />
            <stop offset="100%" stopColor="#f6efdb" />
          </linearGradient>
        </defs>

        {/* the letter paper hiding inside — slides up when opening */}
        <g className="env-paper">
          <rect x="30" y="14" width="140" height="90" rx="4" fill="#fffdf6" stroke="#e8dfc4" strokeWidth="1.5" />
          <line x1="46" y1="34" x2="154" y2="34" stroke="#eadfc2" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="48" x2="154" y2="48" stroke="#eadfc2" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="62" x2="120" y2="62" stroke="#eadfc2" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* body */}
        <rect x="10" y="40" width="180" height="100" rx="6" fill="url(#envPaper)" stroke="#cfa84a" strokeWidth="2.5" />
        {/* inner pink */}
        <polygon points="10,40 100,105 190,40" fill="#f3c4c4" />
        {/* bottom folds */}
        <polygon points="10,140 82,88 10,52" fill="#faf6ea" stroke="#cfa84a" strokeWidth="2" />
        <polygon points="190,140 118,88 190,52" fill="#faf6ea" stroke="#cfa84a" strokeWidth="2" />
        <polygon points="10,140 100,76 190,140" fill="#fdfaf0" stroke="#cfa84a" strokeWidth="2.5" />

        {/* handwritten address */}
        <text
          x="100"
          y="122"
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontSize="17"
          fill="#a9647c"
        >
          to the love of my life ♡
        </text>

        {/* postage stamp */}
        <g transform="translate(158 96) rotate(4)">
          <rect x="0" y="0" width="26" height="30" rx="2" fill="#fff" stroke="#e3b7c4" strokeWidth="1.5" strokeDasharray="3 2.4" />
          <text x="13" y="20" textAnchor="middle" fontSize="13">💘</text>
        </g>

        {/* flap — swings up when opening */}
        <g className="env-flap">
          <polygon points="10,40 100,105 190,40 190,36 10,36" fill="#f6ddda" stroke="#cfa84a" strokeWidth="2.5" />
          <g className="env-seal">
            <circle cx="100" cy="82" r="14" fill="#d63384" />
            <path
              d="M100 89 q -9 -7 -9 -12 a 4.5 4.5 0 0 1 9 -1.5 a 4.5 4.5 0 0 1 9 1.5 q 0 5 -9 12 z"
              fill="#fff"
              opacity="0.92"
            />
          </g>
        </g>
      </svg>
      <span className="env-glow" aria-hidden="true" />
      <span className="env-hint">{open ? 'Opening… 💌' : 'Tap to open ✉️'}</span>
    </button>
  )
}

// Types out paragraphs one after another with a handwriting feel
function TypedLetter({ paragraphs, onFinished }) {
  const [texts, setTexts] = useState(paragraphs.map(() => ''))
  const [activeP, setActiveP] = useState(0)
  const [done, setDone] = useState(false)
  const doneRef = useRef(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    // split into code points so emoji are never sliced in half
    const chars = paragraphs.map((p) => Array.from(p))
    let p = 0
    let c = 0
    const tick = setInterval(() => {
      if (p >= chars.length) {
        clearInterval(tick)
        if (!doneRef.current) {
          doneRef.current = true
          setDone(true)
          onFinished()
        }
        return
      }
      c += 1
      const shown = chars[p].slice(0, c).join('')
      setTexts((prev) => prev.map((t, i) => (i === p ? shown : t)))
      setActiveP(p)
      if (c >= chars[p].length) {
        p += 1
        c = 0
      }
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
    }, 26)
    return () => clearInterval(tick)
  }, [paragraphs, onFinished])

  return (
    <div className="letter-card unfold" ref={bodyRef}>
      <span className="letter-pin">♥</span>
      <p className="letter-dear">My dearest {config.name},</p>
      {texts.map((t, i) => (
        <p key={i}>
          {t}
          {!done && i === activeP && <span className="type-caret" aria-hidden="true" />}
        </p>
      ))}
      {done && (
        <div className="letter-end">
          <span className="wax-seal" aria-hidden="true">💋</span>
          <p className="letter-ps">P.S. — You&apos;ll always be my favourite hello. 💕</p>
        </div>
      )}
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
    setTimeout(() => setStage('reading'), 1150)
  }

  return (
    <div className="screen letter-screen">
      <HeartsBackground />
      <h1 className="screen-title">A Message From My Heart</h1>
      <p className="screen-sub">Written only for you, {config.name} 💌</p>
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
            Continue 💌
          </button>
        )}
      </div>
    </div>
  )
}
