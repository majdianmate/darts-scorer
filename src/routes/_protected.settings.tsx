import { createFileRoute } from '@tanstack/react-router'
import Settings from '#/features/settings/components/settings'

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return <Settings />
}
