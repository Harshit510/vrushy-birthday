import { useEffect, useState } from 'react'
import BirthdayIntro from './components/BirthdayIntro'
import BalloonPop from './components/BalloonPop'
import CandleBlow from './components/CandleBlow'
import RoseBouquet from './components/RoseBouquet'
import SweetMoments from './components/SweetMoments'
import LoveLetter from './components/LoveLetter'
import GiftTap from './components/GiftTap'
import Finale from './components/Finale'

const STEPS = ['intro', 'balloons', 'candle', 'bouquet', 'moments', 'letter', 'gift', 'finale']

// Little hearts that bloom wherever you tap — everywhere in the app
function TapHearts() {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    const chars = ['💖', '💗', '🩷', '✨', '💕']
    const onTap = (e) => {
      const id = `${Date.now()}-${Math.random()}`
      const char = chars[(Math.random() * chars.length) | 0]
      setBursts((b) => [...b.slice(-14), { id, x: e.clientX, y: e.clientY, char }])
      setTimeout(() => setBursts((b) => b.filter((h) => h.id !== id)), 1100)
    }
    window.addEventListener('pointerdown', onTap)
    return () => window.removeEventListener('pointerdown', onTap)
  }, [])

  return (
    <div className="tap-hearts" aria-hidden="true">
      {bursts.map((h) => (
        <span key={h.id} style={{ left: h.x, top: h.y }}>
          {h.char}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  const goTo = (target) => {
    setLeaving(true)
    setTimeout(() => {
      setStep(target)
      setLeaving(false)
    }, 480)
  }

  const next = () => goTo(Math.min(step + 1, STEPS.length - 1))
  const replay = () => goTo(0)

  let content
  switch (STEPS[step]) {
    case 'intro':
      content = <BirthdayIntro onDone={next} />
      break
    case 'balloons':
      content = <BalloonPop key={`b${step}`} onDone={next} />
      break
    case 'candle':
      content = <CandleBlow onDone={next} />
      break
    case 'bouquet':
      content = <RoseBouquet onDone={next} />
      break
    case 'moments':
      content = <SweetMoments onDone={next} />
      break
    case 'letter':
      content = <LoveLetter onDone={next} />
      break
    case 'gift':
      content = <GiftTap onDone={next} />
      break
    case 'finale':
    default:
      content = <Finale onReplay={replay} />
  }

  return (
    <div className={`stage ${leaving ? 'stage-leave' : ''}`}>
      {content}
      <TapHearts />
    </div>
  )
}
