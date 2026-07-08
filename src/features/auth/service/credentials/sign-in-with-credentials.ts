import { getRequestHeader, getRequestIP } from '@tanstack/react-start/server'
import { prisma } from '#/db'
import { createSupabaseServerClient } from '#/lib/supabase/server'
import { getAppTimestamp } from '#/lib/db-timestamp'
import type {
  AuthSignInCredentials,
  AuthSignInResult,
} from '#/features/auth/types/auth-types'

export async function signInWithCredentials(
  credentials: AuthSignInCredentials,
): Promise<AuthSignInResult> {
  const { email, password } = credentials
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data.session || !data.user) {
    throw new Error('Failed to sign in')
  }

  const user = await prisma.user.findUnique({
    where: { id: data.user.id },
  })

  if (!user) {
    throw new Error('User profile not found. Please contact support.')
  }

  await prisma.session.create({
    data: {
      userId: user.id,
      signedInAt: await getAppTimestamp(),
      ipAddress: getRequestIP({ xForwardedFor: true }),
      userAgent: getRequestHeader('user-agent'),
    },
  })

  const { password: _password, ...userWithoutPassword } = user

  return {
    user: userWithoutPassword,
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  }
}
