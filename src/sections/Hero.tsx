import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ScrambleIn } from '../components/ScrambleIn'
import { VIDEOS } from '../videos'

interface HeroProps {
  entranceComplete: boolean
}

const SENSITIVITY = 0.8

export function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const durationRef = useRef(0)
  const seekingRef = useRef(false)

  const maybeSeek = () => {
    const video = videoRef.current
    if (!video || seekingRef.current) return
    const duration = durationRef.current || video.duration || 0
    const clamped = Math.max(0, Math.min(duration, targetTime.current))
    if (Math.abs(video.currentTime - clamped) > 0.008) {
      seekingRef.current = true
      video.currentTime = clamped
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    durationRef.current = video.duration || 0
    video.pause()
    video.currentTime = 0
  }

  const handleSeeked = () => {
    seekingRef.current = false
    maybeSeek()
  }

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (lastX.current === null) {
      lastX.current = e.clientX
      return
    }
    const deltaX = e.clientX - lastX.current
    lastX.current = e.clientX
    const duration = durationRef.current || 10
    targetTime.current += (deltaX / window.innerWidth) * duration * SENSITIVITY
    maybeSeek()
  }

  const handleMouseLeave = () => {
    lastX.current = null
  }

  return (
    <section
      className="relative h-screen h-[100dvh] w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEOS.hero}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        style={{ transform: 'translateY(50px)' }}
      >
        <span
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          TRANSCENDENCE
        </span>
      </div>

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX
              continuously maps neural pathways, cognitive load, and physiological states into a
              single adaptive intelligence layer.
            </motion.p>
          </div>

          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
