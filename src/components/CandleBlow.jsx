import { useState } from 'react'
import { config } from '../config'
import HeartsBackground from './HeartsBackground'

function Cake({ blown }) {
  return (
    <svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
      {/* plate */}
      <ellipse cx="150" cy="228" rx="110" ry="18" fill="#e8f0ee" />
      <ellipse cx="150" cy="224" rx="96" ry="14" fill="#f6faf9" />
      {/* chocolate base */}
      <path d="M62 168 q 0 -14 88 -14 t 88 14 v 40 q 0 14 -88 14 t -88 -14 z" fill="#5b3a2e" />
      <ellipse cx="150" cy="168" rx="88" ry="16" fill="#6d4638" />
      {/* cream top with wavy drip */}
      <path
        d="M62 150 q 0 -30 88 -30 t 88 30 v 16
           q -11 12 -22 0 t -22 0 t -22 0 t -22 0 t -22 0 t -22 0 t -22 0 t -22 0 z"
        fill="#f6f3df"
      />
      <ellipse cx="150" cy="122" rx="88" ry="20" fill="#fbf8e8" />
      <path d="M96 116 q 30 -8 60 -3" stroke="#e9e2c4" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* candle */}
      <rect x="143" y="52" width="14" height="66" rx="4" fill="#b03050" />
      <rect x="143" y="52" width="6" height="66" rx="3" fill="#c94a68" />
      <line x1="150" y1="44" x2="150" y2="52" stroke="#3c2a20" strokeWidth="2.5" strokeLinecap="round" />
      {/* flame */}
      <g className={`flame ${blown ? 'out' : ''}`}>
        <ellipse cx="150" cy="32" rx="9" ry="15" fill="#f8a832" />
        <ellipse cx="150" cy="35" rx="5" ry="9" fill="#fde27a" />
      </g>
      {/* smoke after blow */}
      <g className={`smoke ${blown ? 'show' : ''}`}>
        <path
          d="M150 44 q -7 -10 0 -19 q 7 -9 0 -18"
          stroke="#b9b2ac"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function CandleBlow({ onDone }) {
  const [blown, setBlown] = useState(false)

  const blow = () => {
    if (blown) return
    setBlown(true)
    setTimeout(onDone, 3400) // linger on the wish overlay
  }

  return (
    <div className="screen cake-screen">
      <HeartsBackground />
      <h1 className="screen-title">Blow the candle, {config.name}</h1>
      <div className="cake-wrap">
        <Cake blown={blown} />
      </div>
      {!blown && (
        <button className="blow-bar" onClick={blow}>
          🌬️ Tap to blow the candle
        </button>
      )}
      {blown && (
        <div className="wish-overlay">
          <p>
            Close your eyes
            <br />
            &amp; make a wish
          </p>
        </div>
      )}
    </div>
  )
}
