'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Resume from '@/components/Resume'
import Footer from '@/components/Footer'

export default function ResumePage() {
  return (
    <main className="relative">
      <Navigation />

      <section className="pt-40 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="notion-chip">Resume</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-900">Experience and skills</h1>
            <p className="text-stone-600 text-lg max-w-3xl">
              Download the PDF or browse the full experience, education, and skills below.
            </p>
          </motion.div>
        </div>
      </section>

      <Resume />
      <Footer />
    </main>
  )
}
