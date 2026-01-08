import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation revealOnHover={false} />

      {/* Page Sections */}
      <Hero />
      <Projects />
      <Gallery />
      <Contact />

      {/* Footer */}
      <Footer />

    </main>
  )
}
