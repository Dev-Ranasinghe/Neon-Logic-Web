import { useState } from 'react'
import { motion } from 'framer-motion'
import { SynapseXLogo } from './SynapseXLogo'
import { SquashHamburger } from './SquashHamburger'
import { ScrambleText } from './ScrambleText'

interface NavbarProps {
  entranceComplete: boolean
}

function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverAbout, setHoverAbout] = useState(false)
  const [hoverMetrics, setHoverMetrics] = useState(false)
  const [hoverDownload, setHoverDownload] = useState(false)

  const goAbout = () => scrollToY(window.innerHeight)
  const goMetrics = () => scrollToY(window.innerHeight * 2)

  return (
    <motion.nav
      className="fixed top-0 left-0 z-50 h-20 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Desktop */}
        <div className="hidden items-center gap-2 sm:flex">
          <motion.div
            className={`${menuOpen ? 'hidden md:flex' : 'flex'} h-12 items-center gap-2 rounded-[14px] bg-white/15 px-5 backdrop-blur-md`}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
          >
            <SynapseXLogo className="h-[18px] w-[18px] text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">SynapseX</span>
          </motion.div>

          <motion.div
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex flex-shrink-0 items-center justify-center transition-colors ${
                menuOpen ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-white/10 hover:bg-white/20' : 'h-12 w-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger isOpen={menuOpen} size="desktop" />
            </button>

            {menuOpen && (
              <div className="flex items-center gap-6 pl-5 pr-6">
                <motion.button
                  type="button"
                  onClick={goAbout}
                  onMouseEnter={() => setHoverAbout(true)}
                  onMouseLeave={() => setHoverAbout(false)}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-nowrap text-[16px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="About" isHovered={hoverAbout} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={goMetrics}
                  onMouseEnter={() => setHoverMetrics(true)}
                  onMouseLeave={() => setHoverMetrics(false)}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-nowrap text-[16px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="Metrics" isHovered={hoverMetrics} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        <motion.button
          type="button"
          onMouseEnter={() => setHoverDownload(true)}
          onMouseLeave={() => setHoverDownload(false)}
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
          className="hidden h-12 items-center gap-2 rounded-full bg-white px-6 text-black sm:flex"
        >
          <i className="bi bi-apple text-[16px]" />
          <ScrambleText text="Download" isHovered={hoverDownload} className="text-[16px] font-medium" />
        </motion.button>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between sm:hidden">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="flex h-9 items-center gap-1.5 overflow-hidden rounded-[10px] bg-white/15 px-3 backdrop-blur-md"
              animate={{ width: menuOpen ? 0 : 'auto', paddingLeft: menuOpen ? 0 : 12, paddingRight: menuOpen ? 0 : 12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <SynapseXLogo className="h-[14px] w-[14px] flex-shrink-0 text-white" />
              <span className="flex-shrink-0 whitespace-nowrap text-[13px] font-medium tracking-tight text-white">
                SynapseX
              </span>
            </motion.div>

            <motion.div
              className="flex h-9 items-center overflow-hidden rounded-[10px] bg-white/15 backdrop-blur-md"
              animate={{ width: menuOpen ? '60vw' : 36 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className={`flex flex-shrink-0 items-center justify-center ${
                  menuOpen ? 'ml-1 h-7 w-7 rounded-[9px] bg-white/10' : 'h-9 w-9 rounded-[10px]'
                }`}
              >
                <SquashHamburger isOpen={menuOpen} size="mobile" />
              </button>

              {menuOpen && (
                <div className="flex items-center gap-4 pl-3 pr-4">
                  <motion.button
                    type="button"
                    onClick={() => {
                      goAbout()
                      setMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap text-[13px] font-normal text-white/85"
                  >
                    About
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      goMetrics()
                      setMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap text-[13px] font-normal text-white/85"
                  >
                    Metrics
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-black"
          >
            <i className="bi bi-apple text-[13px]" />
            <span className="text-[13px] font-medium">Download</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
