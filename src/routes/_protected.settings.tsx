import { createFileRoute } from '@tanstack/react-router'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <ProtectedPage
      eyebrow="Settings"
      title="Settings"
      description="Configure account preferences and app-level settings for the protected workspace."
    />
  )
}
