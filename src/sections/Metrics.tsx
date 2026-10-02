import { motion } from 'framer-motion'
import { VIDEOS } from '../videos'

const METRICS = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
]

export function Metrics() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEOS.metrics}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-32 pt-32">
        <motion.p
          className="mb-20 text-center text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Performance Metrics
        </motion.p>

        <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="flex flex-col items-center text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <span className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-white">
                {metric.value}
              </span>
              <span className="mt-4 text-[13px] tracking-wide text-white/40 sm:text-[15px]">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
