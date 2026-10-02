import { motion } from 'framer-motion'

const LAYERS = [
  { layer: 'Layer 1', name: 'Capture' },
  { layer: 'Layer 2', name: 'Process' },
  { layer: 'Layer 3', name: 'Interface' },
]

export function Architecture() {
  return (
    <section className="min-h-screen w-full bg-black">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">
            Architecture
          </p>
          <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-white">
            Three layers. Zero friction.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/45 sm:text-[17px]">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent.
            Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex w-full flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((item) => (
            <div
              key={item.layer}
              className="flex h-[72px] w-full max-w-md items-center justify-between rounded-lg border border-white/10 px-6"
            >
              <span className="text-[12px] uppercase tracking-[0.15em] text-white/30">
                {item.layer}
              </span>
              <span className="text-[16px] font-light text-white sm:text-[18px]">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
