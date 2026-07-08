import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hook/use-auth'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { user, isAuthenticated, isHydrated, isSigningOut, signOut } = useAuth()

  async function handleSignOut() {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch {
      toast.error('Sign out failed. Please try again.')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      {isHydrated && isAuthenticated ? (
        <div className="mt-6 flex items-center gap-4">
          <p className="text-muted-foreground">
            Signed in as{' '}
            <span className="font-medium text-foreground">
              {user?.displayName}
            </span>
          </p>
          <Button onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? (
              <>
                <Loader2 className="animate-spin" />
                Signing out...
              </>
            ) : (
              'Sign out'
            )}
          </Button>
        </div>
      ) : isHydrated ? (
        <Button asChild className="mt-6">
          <Link to="/sign-in">Sign in</Link>
        </Button>
      ) : null}
    </div>
  )
}
