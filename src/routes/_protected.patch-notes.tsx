import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/patch-notes')({
  component: PatchNotesPage,
})

function PatchNotesPage() {
  return (
    <ProtectedPage
      eyebrow="Patch notes"
      title="Patch notes"
      description="Review the latest product changes, fixes, and darts scorer release updates."
    />
  )
}
