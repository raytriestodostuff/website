'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const CONTACT_EMAIL = 'rayyanabhram@gmail.com'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="notion-chip mb-4">Contact</p>
          <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Contact me at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-stone-700 hover:text-stone-900 transition-colors font-semibold"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        />
      </div>
    </section>
  )
}
