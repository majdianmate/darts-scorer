import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/clubs')({
  component: ClubsPage,
})

function ClubsPage() {
  return (
    <ProtectedPage
      eyebrow="Clubs"
      title="Clubs"
      description="Manage clubs, players, and club-specific darts sessions in a protected area."
    />
  )
}
