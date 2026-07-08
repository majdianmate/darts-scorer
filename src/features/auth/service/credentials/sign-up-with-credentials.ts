import type { User } from '#/generated/prisma/client'
import { prisma } from '#/db'
import { hashPassword } from '#/features/auth/lib/hash-password'
import { createSupabaseServerClient } from '#/lib/supabase/server'
import type { AuthSignUpCredentials } from '../../types/auth-types'

async function deriveUniqueUsername(email: string): Promise<string> {
  const base =
    email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '') || 'user'

  let username = base
  let suffix = 0

  while (await prisma.user.findUnique({ where: { username } })) {
    suffix += 1
    username = `${base}${suffix}`
  }

  return username
}

export async function signUpWithCredentials(
  credentials: AuthSignUpCredentials,
): Promise<Omit<User, 'password'>> {
  const { name, displayName, email, password, confirmPassword } = credentials

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match')
  }

  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        displayName,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data.user) {
    throw new Error('Failed to create auth user')
  }

  const username = await deriveUniqueUsername(email)

  const user = await prisma.user.create({
    data: {
      id: data.user.id,
      name,
      displayName,
      username,
      email,
      password: hashPassword(password),
    },
  })

  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}
