import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'
import Clubs from '#/features/clubs/components/clubs'

export const Route = createFileRoute('/_protected/clubs')({
  component: ClubsPage,
})

function ClubsPage() {
  return (
    <Clubs />
  )
}
