'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type GalleryImage = {
  src: string
  caption: string
}

type ProjectImageGalleryProps = {
  images: GalleryImage[]
  title: string
}

export default function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const hasImages = images.length > 0

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
    setActiveIndex((activeIndex + 1) % images.length)
  }, [activeIndex, images.length])

  const goPrev = useCallback(() => {
    if (activeIndex === null) {
      return
    }
    setActiveIndex((activeIndex - 1 + images.length) % images.length)
  }, [activeIndex, images.length])

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
    return images[activeIndex]
  }, [activeIndex, images])

  if (!hasImages) {
    return null
  }

  return (
    <div className="notion-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-900">Images</h2>
        <span className="text-xs text-stone-500">Scroll to view</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide scroll-smooth">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => openImage(index)}
            className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[420px] snap-start text-left"
          >
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <img
                src={image.src}
                alt={`${title} image ${index + 1}`}
                className="w-full h-56 object-contain rounded-xl bg-stone-50"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-3 text-xs text-stone-500">{image.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-6">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close image"
            onClick={closeImage}
          />
          <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-stone-700">{activeImage.caption}</p>
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
                alt={`${title} expanded image`}
                className="w-full max-h-[70vh] object-contain rounded-xl"
                loading="eager"
              />
            </div>
            <p className="mt-4 text-xs text-stone-500">Use the left and right arrow keys to navigate.</p>
          </div>
        </div>
      )}
    </div>
  )
}
