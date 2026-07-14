import {
  Link,
  Outlet,
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Sidebar } from '#/components/Sidebar/Sidebar'
import { Button } from '#/components/ui/button'
import { useAuth } from '#/features/auth/hook/use-auth'
import { cn } from '#/lib/utils'
import { useUiStore } from '#/store/ui-store'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const navigate = useNavigate()
  const { isAuthenticated, isHydrated } = useAuth()
  const { isSidebarOpen } = useUiStore()
  const isSidebarCollapsed = !isSidebarOpen

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
    <div
      className={cn(
        'grid min-h-screen grid-cols-1 bg-transparent lg:transition-[grid-template-columns] lg:duration-300',
        isSidebarCollapsed
          ? 'lg:grid-cols-[5rem_1fr]'
          : 'lg:grid-cols-[17.5rem_1fr]',
      )}
    >
      <Sidebar />

      <main className="min-w-0 px-4 py-4 sm:px-6 lg:px-10 lg:py-8">
        <div className="mx-auto flex flex-col">
          <div className="mb-6 rounded-3xl border border-border/70 bg-card/55 px-5 py-4 text-card-foreground shadow-sm backdrop-blur-2xl lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Darts Scorer</p>
                <p className="text-xs text-muted-foreground">Protected area</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
