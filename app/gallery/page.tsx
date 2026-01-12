'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { galleryImages } from '@/lib/gallery'

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

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

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
  }, [])

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) {
        return
      }
      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - touchStartX.current
      const deltaY = touch.clientY - touchStartY.current
      touchStartX.current = null
      touchStartY.current = null

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      const swipeThreshold = 28
      const tapThreshold = 8

      if (absX >= swipeThreshold && absX > absY) {
        if (deltaX < 0) {
          goNext()
        } else {
          goPrev()
        }
        return
      }

      if (absX <= tapThreshold && absY <= tapThreshold) {
        const rect = event.currentTarget.getBoundingClientRect()
        const tapX = touch.clientX - rect.left
        if (tapX < rect.width / 2) {
          goPrev()
        } else {
          goNext()
        }
      }
    },
    [goNext, goPrev]
  )

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

  useEffect(() => {
    if (activeIndex === null) {
      return
    }
    const indices = [
      activeIndex,
      (activeIndex + 1) % galleryImages.length,
      (activeIndex - 1 + galleryImages.length) % galleryImages.length,
    ]
    indices.forEach((index) => {
      const preload = new Image()
      preload.src = galleryImages[index].src
    })
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
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={closeImage}
        >
          <div
            className="relative z-10 inline-flex max-w-[90vw] flex-col text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/70">
                Image {(activeIndex ?? 0) + 1} of {galleryImages.length}
              </p>
            </div>
            <div
              className="mt-4 overflow-hidden select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activeImage.src}
                alt="Expanded gallery image"
                className="max-h-[75vh] max-w-[90vw] object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white hover:text-white"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white hover:text-white"
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
