import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/match')({
  component: MatchPage,
})

function MatchPage() {
  return (
    <ProtectedPage
      eyebrow="Match"
      title="Match"
      description="Start, follow, and review darts matches from the protected match control screen."
    />
  )
}
