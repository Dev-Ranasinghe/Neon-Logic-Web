import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface SquashHamburgerProps {
  isOpen: boolean
  size?: 'desktop' | 'mobile'
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 }

export function SquashHamburger({ isOpen, size = 'desktop' }: SquashHamburgerProps) {
  const dims =
    size === 'desktop'
      ? { width: 18, height: 12, barHeight: 1.5 }
      : { width: 15, height: 10, barHeight: 1.2 }

  const center = dims.height / 2 - dims.barHeight / 2

  const barBase: CSSProperties = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: dims.barHeight,
    background: '#fff',
    borderRadius: 2,
  }

  return (
    <div style={{ position: 'relative', width: dims.width, height: dims.height }}>
      <motion.span
        style={{ ...barBase, top: 0 }}
        animate={isOpen ? { top: center, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={SPRING}
      />
      <motion.span
        style={{ ...barBase, top: center }}
        animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={SPRING}
      />
      <motion.span
        style={{ ...barBase, top: dims.height - dims.barHeight }}
        animate={isOpen ? { top: center, rotate: -45 } : { top: dims.height - dims.barHeight, rotate: 0 }}
        transition={SPRING}
      />
    </div>
  )
}
