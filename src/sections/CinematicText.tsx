import { useRef } from 'react'
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion'
import { VIDEOS } from '../videos'

export function CinematicText() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 })
  const y = useTransform(smoothProgress, [0, 1], [60, -120])
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1])
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`

  return (
    <section ref={sectionRef} className="relative h-screen h-[100dvh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEOS.cinematic}
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        className="absolute left-0 top-0 z-10 w-full"
        style={{ height: 180, background: 'linear-gradient(to bottom, #010103, transparent)' }}
      />

      <div
        className="relative z-10 flex h-full items-center justify-center"
        style={{ perspective: 400 }}
      >
        <motion.p
          style={{ transform, opacity }}
          className="max-w-5xl select-none px-6 text-center font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]"
        >
          A neural-AI interface built on the architecture of the human nervous system. SynapseX
          translates synaptic activity into computational intelligence. Every signal becomes
          measurable, structured, and visible. It continuously reconstructs internal state as a
          dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
        </motion.p>
      </div>
    </section>
  )
}
