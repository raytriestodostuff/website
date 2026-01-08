'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsHidden(false)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        return
      }

      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  const homePrefix = pathname === '/' ? '' : '/'
  const navLinks = [
    { href: '/resume', label: 'Resume' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/projects', label: 'Projects' },
    { href: `${homePrefix}#contact`, label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -140 : 0 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-0 left-0 right-0 z-50 nav-surface transition-all duration-300 ${
        isScrolled ? 'py-5' : 'py-7'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="px-2 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-stone-900">Rayyan Abhram</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-stone-600 hover:text-near-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a href="/cv/rayyan-abhram-cv.pdf" download className="notion-button notion-button-primary">
                Download Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-near-black hover:bg-black/5 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/cv/rayyan-abhram-cv.pdf"
                    download
                    onClick={() => setMobileMenuOpen(false)}
                    className="notion-button notion-button-primary"
                  >
                    Download Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}
