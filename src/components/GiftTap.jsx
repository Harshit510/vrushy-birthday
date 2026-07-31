import { useState } from 'react'
import HeartsBackground from './HeartsBackground'

function GiftBox() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* box */}
      <rect x="22" y="52" width="76" height="56" rx="6" fill="#fbe6ec" stroke="#e0788f" strokeWidth="3" />
      {/* vertical stripes */}
      {[34, 50, 66, 82].map((x) => (
        <line key={x} x1={x} y1="55" x2={x} y2="105" stroke="#f2b7c6" strokeWidth="5" strokeLinecap="round" />
      ))}
      {/* lid */}
      <rect x="16" y="42" width="88" height="16" rx="5" fill="#f7d2dc" stroke="#e0788f" strokeWidth="3" />
      {/* center ribbon */}
      <rect x="54" y="42" width="12" height="66" fill="#e0788f" />
      {/* bow */}
      <path d="M60 40 C 42 18 22 32 44 42 C 30 46 46 54 60 40 Z" fill="#eb94a9" stroke="#d96a84" strokeWidth="2.5" />
      <path d="M60 40 C 78 18 98 32 76 42 C 90 46 74 54 60 40 Z" fill="#f2aebe" stroke="#d96a84" strokeWidth="2.5" />
      <circle cx="60" cy="40" r="6" fill="#d96a84" />
    </svg>
  )
}

export default function GiftTap({ onDone }) {
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onDone, 650)
  }

  return (
    <div className="screen gift-screen">
      <HeartsBackground />
      <h1 className="gift-title">One Last Thing…</h1>
      <p className="gift-sub">Tap the gift</p>
      <button className={`gift-box ${opening ? 'opening' : ''}`} onClick={open} aria-label="Open the gift">
        <GiftBox />
      </button>
    </div>
  )
}
