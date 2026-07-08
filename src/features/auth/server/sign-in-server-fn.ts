import { createServerFn } from '@tanstack/react-start'
import { signInWithCredentials } from '#/features/auth/service/credentials/sign-in-with-credentials'
import type { AuthSignInCredentials } from '#/features/auth/types/auth-types'

export const signInServerFn = createServerFn({ method: 'POST' })
  .validator((data: AuthSignInCredentials) => data)
  .handler(async ({ data }) => signInWithCredentials(data))
