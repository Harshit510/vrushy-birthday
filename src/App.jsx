import { useState } from 'react'
import BalloonPop from './components/BalloonPop'
import CandleBlow from './components/CandleBlow'
import RoseBouquet from './components/RoseBouquet'
import SweetMoments from './components/SweetMoments'
import LoveLetter from './components/LoveLetter'
import GiftTap from './components/GiftTap'
import Finale from './components/Finale'

const STEPS = ['balloons', 'candle', 'bouquet', 'moments', 'letter', 'gift', 'finale']

export default function App() {
  const [step, setStep] = useState(0)
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const replay = () => setStep(0)

  switch (STEPS[step]) {
    case 'balloons':
      return <BalloonPop key={`b${step}`} onDone={next} />
    case 'candle':
      return <CandleBlow onDone={next} />
    case 'bouquet':
      return <RoseBouquet onDone={next} />
    case 'moments':
      return <SweetMoments onDone={next} />
    case 'letter':
      return <LoveLetter onDone={next} />
    case 'gift':
      return <GiftTap onDone={next} />
    case 'finale':
    default:
      return <Finale onReplay={replay} />
  }
}
