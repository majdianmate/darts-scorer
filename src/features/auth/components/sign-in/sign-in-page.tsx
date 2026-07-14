import { Link, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useAuth } from '#/features/auth/hook/use-auth'
import { signInServerFn } from '#/features/auth/server/sign-in-server-fn'
import type { AuthSignInCredentials } from '#/features/auth/types/auth-types'

const initialForm: AuthSignInCredentials = {
  email: '',
  password: '',
}

export default function SignInPage() {
  const navigate = useNavigate()
  const signIn = useServerFn(signInServerFn)
  const { signIn: setAuth, isAuthenticated } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof AuthSignInCredentials>(
    key: K,
    value: AuthSignInCredentials[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await signIn({ data: form })
      setAuth(result)
      setForm(initialForm)
      toast.success('Signed in successfully', {
        description: `Welcome back, ${result.user.displayName}.`,
      })
      await navigate({ to: '/dashboard' })
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Sign in failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md gap-0 py-0">
          <CardHeader className="gap-1.5 border-b px-6 py-6">
            <CardTitle className="text-2xl">Already signed in</CardTitle>
            <CardDescription>
              You are already signed in to your account.
            </CardDescription>
          </CardHeader>
          <CardFooter className="border-t px-6 py-6">
            <Button asChild className="w-full">
              <Link to="/dashboard">Go to home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md gap-0 py-0">
        <CardHeader className="gap-1.5 border-b px-6 py-6">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardContent className="space-y-5 px-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(event) =>
                  updateField('password', event.target.value)
                }
              />
            </div>

            {error ? (
              <p
                className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </CardContent>

          <CardFooter className="flex-col gap-4 border-t px-6 py-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                to="/sign-up"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
