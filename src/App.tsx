import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { CinematicText } from './sections/CinematicText'
import { Metrics } from './sections/Metrics'
import { Technology } from './sections/Technology'
import { Architecture } from './sections/Architecture'

function App() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }} className="min-h-screen bg-black text-white">
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  )
}

export default App
