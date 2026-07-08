import { Link } from '@tanstack/react-router'
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
import { signUpServerFn } from '#/features/auth/server/sign-up-server-fn'
import type { AuthSignUpCredentials } from '#/features/auth/types/auth-types'

const initialForm: AuthSignUpCredentials = {
  name: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function SignUpPage() {
  const signUp = useServerFn(signUpServerFn)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof AuthSignUpCredentials>(
    key: K,
    value: AuthSignUpCredentials[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signUp({ data: form })
      setForm(initialForm)
      toast.success('Account created successfully', {
        description: 'You can now sign in with your email and password.',
      })
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Sign up failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md gap-0 py-0">
        <CardHeader className="gap-1.5 border-b px-6 py-6">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to get started with Darts Scorer.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardContent className="space-y-5 px-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                name="displayName"
                autoComplete="nickname"
                required
                value={form.displayName}
                onChange={(event) =>
                  updateField('displayName', event.target.value)
                }
                placeholder="Johnny"
              />
            </div>

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
                autoComplete="new-password"
                required
                value={form.password}
                onChange={(event) =>
                  updateField('password', event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={(event) =>
                  updateField('confirmPassword', event.target.value)
                }
              />
            </div>

            {error ? (
              <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </CardContent>

          <CardFooter className="flex-col gap-4 border-t px-6 py-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
