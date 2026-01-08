'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { galleryImages } from '@/lib/gallery'

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openImage = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const closeImage = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const goNext = useCallback(() => {
    if (activeIndex === null) {
      return
    }
    setActiveIndex((activeIndex + 1) % galleryImages.length)
  }, [activeIndex])

  const goPrev = useCallback(() => {
    if (activeIndex === null) {
      return
    }
    setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length)
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeImage()
      }
      if (event.key === 'ArrowRight') {
        goNext()
      }
      if (event.key === 'ArrowLeft') {
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, closeImage, goNext, goPrev])

  const activeImage = useMemo(() => {
    if (activeIndex === null) {
      return null
    }
    return galleryImages[activeIndex]
  }, [activeIndex])

  return (
    <main className="relative">
      <Navigation />

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="notion-chip">Gallery</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-900">Full gallery</h1>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => openImage(index)}
                  className="relative h-60 w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                >
                  <img
                    src={item.thumb ?? item.src}
                    alt="Gallery image"
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
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-6">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close image"
            onClick={closeImage}
          />
          <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs text-stone-500">
                Image {(activeIndex ?? 0) + 1} of {galleryImages.length}
              </p>
              <button
                type="button"
                onClick={closeImage}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
            </div>
            <div className="mt-4 rounded-2xl bg-stone-50 p-3">
              <img
                src={activeImage.src}
                alt="Expanded gallery image"
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="notion-button notion-button-secondary px-4 py-2 text-xs"
              >
                Prev
              </button>
              <p className="text-xs text-stone-500">Use left/right arrows to navigate</p>
              <button
                type="button"
                onClick={goNext}
                className="notion-button notion-button-secondary px-4 py-2 text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
