'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
    setActiveIndex((activeIndex + 1) % images.length)
  }, [activeIndex, images.length])

  const goPrev = useCallback(() => {
    if (activeIndex === null) {
      return
    }
    setActiveIndex((activeIndex - 1 + images.length) % images.length)
  }, [activeIndex, images.length])

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
    return images[activeIndex]
  }, [activeIndex, images])

  useEffect(() => {
    if (activeIndex === null) {
      return
    }
    const indices = [
      activeIndex,
      (activeIndex + 1) % images.length,
      (activeIndex - 1 + images.length) % images.length,
    ]
    indices.forEach((index) => {
      const preload = new Image()
      preload.src = images[index].src
    })
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
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              <img
                src={image.src}
                alt={`${title} image ${index + 1}`}
                className="w-full h-56 object-contain bg-stone-50"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-3 text-xs text-stone-500 px-4 pb-4">{image.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={closeImage}
        >
          <div
            className="relative z-10 inline-flex max-w-[90vw] flex-col text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-white/80">{activeImage.caption}</p>
            </div>
            <div
              className="mt-4 overflow-hidden select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activeImage.src}
                alt={`${title} expanded image`}
                className="max-h-[70vh] max-w-[90vw] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
