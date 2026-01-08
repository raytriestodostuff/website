import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { projects } from '@/lib/projects'
import ProjectImageGallery from '@/components/ProjectImageGallery'

type ProjectPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  const descriptionParagraphs = project.description
    .split('\n\n')
    .filter((paragraph) => paragraph.trim().length > 0)

  return (
    <main className="relative">
      <Navigation />

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-900">
              Back to projects
            </Link>
            <div>
              <p className="notion-chip">{project.status}</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 mt-4">
                {project.title}
              </h1>
              <p className="text-stone-500 text-sm mt-3">{project.focus}</p>
            </div>

            <div className="notion-card p-6 space-y-4">
              <p className="text-stone-600 text-lg leading-relaxed">{project.summary}</p>
              {descriptionParagraphs.map((paragraph) => {
                const cleanedParagraph = paragraph.trim()
                const isAttribution = cleanedParagraph.startsWith('Built alongside:')
                return (
                  <p
                    key={paragraph}
                    className={`leading-relaxed ${
                      isAttribution ? 'mt-8 text-stone-900 font-bold' : 'text-stone-600'
                    }`}
                  >
                    {isAttribution ? (
                      <span className="font-bold text-stone-900">{cleanedParagraph}</span>
                    ) : (
                      cleanedParagraph
                    )}
                  </p>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="notion-card p-6 space-y-3">
                <h2 className="text-lg font-semibold text-stone-900">Highlights</h2>
                <ul className="space-y-2 text-sm text-stone-600 list-disc list-inside">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="notion-card p-6 space-y-3">
                <h2 className="text-lg font-semibold text-stone-900">Tools and Methods</h2>
                <ul className="space-y-2 text-sm text-stone-600 list-disc list-inside">
                  {project.tools.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {project.images && (
              <ProjectImageGallery images={project.images} title={project.title} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
