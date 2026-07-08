import { prisma } from '#/db'
import { createSupabaseServerClient } from '#/lib/supabase/server'
import { getAppTimestamp } from '#/lib/db-timestamp'
import type { AuthSignOutInput } from '#/features/auth/types/auth-types'

export async function signOutUser(input: AuthSignOutInput): Promise<void> {
  const { userId, accessToken, refreshToken } = input
  const supabase = createSupabaseServerClient()

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  if (!sessionError) {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  }

  const activeSession = await prisma.session.findFirst({
    where: {
      userId,
      signedOutAt: null,
    },
    orderBy: {
      signedInAt: 'desc',
    },
  })

  if (activeSession) {
    await prisma.session.update({
      where: { id: activeSession.id },
      data: { signedOutAt: await getAppTimestamp() },
    })
  }
}
