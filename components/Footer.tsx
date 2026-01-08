'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-stone-900">Rayyan Abhram</span>
            <span className="text-xs text-stone-500">Personal Portfolio</span>
          </div>

          <p className="text-stone-500 text-sm max-w-md text-center md:text-left">
            Building practical systems and thoughtful products with a focus on impact.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#hero" className="text-stone-500 hover:text-near-black transition-colors">
              Top
            </a>
            <a href="/projects" className="text-stone-500 hover:text-near-black transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-stone-500 hover:text-near-black transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-black/10 text-center text-sm text-stone-400">
          <p>&copy; {currentYear} Rayyan Abhram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
