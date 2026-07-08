import { createServerFn } from '@tanstack/react-start'
import { signUpWithCredentials } from '#/features/auth/service/credentials/sign-up-with-credentials'
import type { AuthSignUpCredentials } from '#/features/auth/types/auth-types'

export const signUpServerFn = createServerFn({ method: 'POST' })
  .validator((data: AuthSignUpCredentials) => data)
  .handler(async ({ data }) => signUpWithCredentials(data))
