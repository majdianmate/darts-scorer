import type { User as PrismaUser } from '#/generated/prisma/client'

export type UserType = PrismaUser;

export type AuthUser = Omit<UserType, 'password'>

export interface AuthSignUpCredentials {
  name: string
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthSignInCredentials {
  email: string
  password: string
}

export interface AuthSignInResult {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface AuthSignOutInput {
  userId: string
  accessToken: string
  refreshToken: string
}
