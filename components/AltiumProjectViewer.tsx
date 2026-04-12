'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    startViewer?: () => void
  }
}

type AltiumProjectViewerProps = {
  title: string
  projectPath: string
  enabledViews?: string[]
  activeView?: 'sch' | 'pcb' | '3d'
  srcType?: 'Design' | 'Gerber'
}

const EMBED_SCRIPT_SRC = 'https://viewer.altium.com/client/static/js/embed.js'

export default function AltiumProjectViewer({
  title,
  projectPath,
  enabledViews,
  activeView,
  srcType,
}: AltiumProjectViewerProps) {
  const [projectSrc, setProjectSrc] = useState('')
  const [hasPublicProjectSrc, setHasPublicProjectSrc] = useState(false)
  const [scriptReady, setScriptReady] = useState(false)
  const viewerHostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const origin = window.location.origin
    const resolvedProjectSrc = new URL(projectPath, origin).toString()
    const resolvedHostname = new URL(resolvedProjectSrc).hostname
    setProjectSrc(resolvedProjectSrc)
    setHasPublicProjectSrc(resolvedHostname !== 'localhost' && resolvedHostname !== '127.0.0.1')
    setScriptReady(typeof window.startViewer === 'function')
  }, [projectPath])

  useEffect(() => {
    if (!projectSrc || !hasPublicProjectSrc || !scriptReady || typeof window.startViewer !== 'function') {
      return
    }

    if (viewerHostRef.current?.querySelector('.altium-web-viewer')) {
      return
    }

    window.startViewer()
  }, [hasPublicProjectSrc, projectSrc, scriptReady])

  const enabledViewsValue = useMemo(() => enabledViews?.join(','), [enabledViews])

  return (
    <div className="notion-card p-6 space-y-4">
      {hasPublicProjectSrc && (
        <Script
          src={EMBED_SCRIPT_SRC}
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      )}

      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>

      <div className="h-[420px] overflow-hidden rounded-2xl border border-black/10 bg-stone-50 sm:h-[520px] lg:h-[640px]">
        {!hasPublicProjectSrc ? (
          <div className="flex h-full items-center justify-center px-8 text-center text-sm leading-relaxed text-stone-500">
            A public design ZIP URL is required before the embedded Altium viewer can load here.
          </div>
        ) : projectSrc ? (
          <div
            key={projectSrc}
            ref={viewerHostRef}
            className="altium-ecad-viewer"
            data-project-src={projectSrc}
            data-enabled-views={enabledViewsValue}
            data-active-view={activeView}
            data-src-type={srcType}
            style={{ height: '100%', width: '100%' }}
            {...{ 'use-border': 'false' }}
          >
            <a
              href="https://www.altium365.com/viewer/"
              target="_blank"
              rel="noreferrer"
              className="sr-only"
            >
              PCB File Viewer by Altium
            </a>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-stone-500">
            Preparing viewer...
          </div>
        )}
      </div>
    </div>
  )
}
