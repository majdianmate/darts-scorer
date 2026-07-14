import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/help')({
  component: HelpPage,
})

function HelpPage() {
  return (
    <ProtectedPage
      eyebrow="Help"
      title="Help"
      description="Find support resources, usage tips, and help content for signed-in users."
    />
  )
}
