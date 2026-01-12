'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects'

const featuredProjects = projects.filter((project) => project.featured)

export default function Projects() {
  return (
    <section id="projects" className="pt-10 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="notion-chip">Projects</p>
                <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-stone-900">What I am building</h2>
                <p className="text-stone-600 mt-4 text-lg max-w-3xl">
                  A few active explorations in progress. The full list lives on the projects page.
                </p>
              </div>
              <Link href="/projects" className="notion-button notion-button-secondary">
                View all projects
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-widest text-stone-500">Featured</p>
                <span className="text-xs text-stone-500">Scroll to explore</span>
              </div>
              <div className="flex flex-nowrap gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.title}
                    href={`/projects/${project.slug}`}
                    className="notion-card p-6 min-w-[260px] sm:min-w-[320px] lg:min-w-[360px] snap-start transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <h3 className="text-lg font-semibold text-stone-900 leading-tight break-words">
                        {project.title}
                      </h3>
                      <span className="notion-chip text-[9px] px-2 py-0.5 leading-none tracking-wide sm:text-[10px] sm:px-2.5 sm:py-1 sm:shrink-0">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-stone-600 mt-4 text-sm leading-relaxed">{project.summary}</p>
                    <span className="text-xs uppercase tracking-widest text-stone-500 mt-4 inline-block">
                      Read more
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {featuredProjects.length === 0 && (
              <p className="text-sm text-stone-500">No featured projects yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
