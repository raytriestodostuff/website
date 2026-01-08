'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { projects } from '@/lib/projects'

const allStatuses = Array.from(new Set(projects.map((project) => project.status))).sort()
const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

export default function ProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const filteredProjects = projects.filter((project) => {
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus
    const tagMatch =
      selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))
    return statusMatch && tagMatch
  })

  return (
    <main className="relative">
      <Navigation revealOnHover />

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="notion-chip">Projects</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-900">Current builds and experiments</h1>
            <p className="text-stone-600 text-lg max-w-3xl">
              These projects are in motion. Some are prototypes, others are being refined. If you
              want a walkthrough of any project, reach out.
            </p>
          </motion.div>

          <div className="mt-10 grid lg:grid-cols-[3fr_1fr] gap-8 items-start">
            <div className="grid gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="notion-card p-6 block transition-transform duration-200 group-hover:-translate-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h2 className="text-2xl font-semibold text-stone-900">{project.title}</h2>
                      <span className="notion-chip">{project.status}</span>
                    </div>
                    <p className="text-stone-500 text-sm mt-2">{project.focus}</p>
                    <p className="text-stone-600 mt-4 text-sm leading-relaxed">{project.summary}</p>
                    <span className="text-xs uppercase tracking-widest text-stone-500 mt-4 inline-block">
                      Read more
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="notion-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-stone-900">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('All')}
                    className={`notion-chip-button ${
                      selectedStatus === 'All' ? 'notion-chip-active' : 'notion-chip-inactive'
                    }`}
                    aria-pressed={selectedStatus === 'All'}
                  >
                    All
                  </button>
                  {allStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`notion-chip-button ${
                        selectedStatus === status ? 'notion-chip-active' : 'notion-chip-inactive'
                      }`}
                      aria-pressed={selectedStatus === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="notion-card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-stone-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className={`notion-chip-button ${
                      selectedTags.length === 0 ? 'notion-chip-active' : 'notion-chip-inactive'
                    }`}
                    aria-pressed={selectedTags.length === 0}
                  >
                    All
                  </button>
                  {allTags.map((tag) => {
                    const isActive = selectedTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
                          )
                        }
                        className={`notion-chip-button ${
                          isActive ? 'notion-chip-active' : 'notion-chip-inactive'
                        }`}
                        aria-pressed={isActive}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
