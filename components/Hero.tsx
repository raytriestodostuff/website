'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen-stable flex items-center justify-center pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-stone-600 text-sm font-semibold tracking-widest uppercase"
              >
                Personal Portfolio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-stone-900"
              >
                Rayyan <span className="text-stone-700">Abhram</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-stone-600 leading-relaxed max-w-2xl"
              >
                I like building new things the fun way - mixing science, design, and engineering into
                thoughtful, meaningful ideas. This space captures what I'm exploring, building, and
                learning right now.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="/resume" className="notion-button notion-button-primary">
                View Resume
              </a>
              <a href="#projects" className="notion-button notion-button-secondary">
                What I am Building
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="notion-card p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500">Focus areas</p>
                <p className="text-lg font-semibold text-stone-900 mt-2">
                  Hardware design, innovation, applied AI
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { label: 'Location', value: 'London, UK' },
                  { label: 'Current projects', value: 'Paper-based uPads for Lab-on-Chip designs' },
                  { label: 'Interests', value: 'Health, wearables, optics, robotics, smart manufacturing, electronics, AI' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-stone-500 text-sm">{item.label}</span>
                    <span className="text-stone-800 text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
