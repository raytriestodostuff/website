'use client'

import { motion } from 'framer-motion'

const highlights = [
  {
    title: 'Systems mindset',
    description:
      'I focus on the end-to-end journey: discovery, clarity, building, and real-world delivery.',
  },
  {
    title: 'Practical experimentation',
    description:
      'I build fast prototypes to test ideas, then refine them into reliable systems.',
  },
  {
    title: 'Curiosity driven',
    description:
      'I love exploring climate, wellbeing, and tools that make people more capable.',
  },
]

export default function About() {
  return (
    <section id="about" className="pt-0 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <p className="notion-chip">About me</p>
            <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-stone-900">
              Builder focused on real-world outcomes
            </h2>
            <p className="text-stone-600 mt-4 text-lg max-w-3xl">
              I am Rayyan Abhram, a systems-focused builder. I enjoy creating products that
              blend insight, design, and careful execution. My work is grounded in clear thinking,
              disciplined delivery, and thoughtful iteration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="notion-card p-6"
              >
                <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
                <p className="text-stone-600 mt-3 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
