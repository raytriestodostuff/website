import AltiumProjectViewer from '@/components/AltiumProjectViewer'
import type { Project } from '@/lib/projects'

type ProjectViewerProps = {
  project: Project
}

export default function ProjectViewer({ project }: ProjectViewerProps) {
  if (!project.viewer) {
    return null
  }

  if (project.viewer.provider === 'altium') {
    return (
      <AltiumProjectViewer
        title={project.viewer.title}
        projectPath={project.viewer.projectPath}
        enabledViews={project.viewer.enabledViews}
        activeView={project.viewer.activeView}
        srcType={project.viewer.srcType}
      />
    )
  }

  return null
}
