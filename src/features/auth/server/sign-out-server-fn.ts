import { createServerFn } from '@tanstack/react-start'
import { signOutUser } from '#/features/auth/service/sign-out'
import type { AuthSignOutInput } from '#/features/auth/types/auth-types'

export const signOutServerFn = createServerFn({ method: 'POST' })
  .validator((data: AuthSignOutInput) => data)
  .handler(async ({ data }) => signOutUser(data))
