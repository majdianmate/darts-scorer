import { prisma } from '#/db'
import { validateSettingsProfileInput } from '#/features/settings/lib/settings-validation'
import type {
  SettingsProfile,
  SettingsProfileInput,
} from '#/features/settings/types/settings-types'

export const getSettingsProfile = async (
  input: SettingsProfileInput,
): Promise<SettingsProfile> => {
  const { userId } = validateSettingsProfileInput(input)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User profile not found')
  }

  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}
