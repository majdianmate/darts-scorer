import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <ProtectedPage
      eyebrow="Dashboard"
      title="Dashboard"
      description="Track current darts activity, upcoming matches, and club highlights from one protected workspace."
    />
  )
}
