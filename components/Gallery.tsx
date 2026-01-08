'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { galleryImages } from '@/lib/gallery'

const previewImages = galleryImages.slice(0, 6)

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="notion-chip">Gallery</p>
                <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-stone-900">Personal moments</h2>
              </div>
              <Link href="/gallery" className="notion-button notion-button-secondary">
                View full gallery
              </Link>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewImages.map((item, index) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href="/gallery" className="block">
                  <div className="relative h-56 overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    <img
                      src={item.src}
                      alt="Gallery preview"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-end bg-black/0 opacity-0 transition-opacity duration-200 group-hover:bg-black/35 group-hover:opacity-100">
                      <div className="p-4">
                        <span className="text-xs uppercase tracking-widest text-white/80">
                          Tap to expand
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
