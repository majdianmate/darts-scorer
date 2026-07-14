import type {
  ChangeDisplayNameInput,
  ChangeImageInput,
  SettingsProfileInput,
} from '#/features/settings/types/settings-types'

export function validateSettingsProfileInput(input: SettingsProfileInput) {
  if (!input.userId.trim()) {
    throw new Error('User ID is required')
  }

  return {
    userId: input.userId.trim(),
  }
}

export function validateChangeDisplayNameInput(input: ChangeDisplayNameInput) {
  const { userId } = validateSettingsProfileInput(input)
  const displayName = input.displayName.trim()

  if (!displayName) {
    throw new Error('Display name is required')
  }

  if (displayName.length > 255) {
    throw new Error('Display name must be 255 characters or less')
  }

  return {
    userId,
    displayName,
  }
}

export function validateChangeImageInput(input: ChangeImageInput) {
  const { userId } = validateSettingsProfileInput(input)
  const image = input.image.trim()

  if (!image) {
    throw new Error('Profile image is required')
  }

  return {
    userId,
    image,
  }
}
