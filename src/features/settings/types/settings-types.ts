import type { AuthUser } from '#/features/auth/types/auth-types'

export interface SettingsProfileInput {
  userId: string
}

export interface ChangeDisplayNameInput extends SettingsProfileInput {
  displayName: string
}

export interface ChangeImageInput extends SettingsProfileInput {
  image: string
}

export type SettingsProfile = AuthUser
