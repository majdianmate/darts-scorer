import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Sidebar } from '#/components/Sidebar/Sidebar'
import { useAuth } from '#/features/auth/hook/use-auth'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const navigate = useNavigate()
  const { isAuthenticated, isHydrated } = useAuth()

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      void navigate({ to: '/sign-in', replace: true })
    }
  }, [isAuthenticated, isHydrated, navigate])

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-5 py-4 shadow-lg backdrop-blur">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Checking your session...
          </p>
        </div>
      </div>
    )
  }

  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  )
}
