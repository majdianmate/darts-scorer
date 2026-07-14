import { prisma } from '#/db'
import { validateChangeDisplayNameInput } from '#/features/settings/lib/settings-validation'
import type {
  ChangeDisplayNameInput,
  SettingsProfile,
} from '#/features/settings/types/settings-types'

export const changeDisplayName = async (
  input: ChangeDisplayNameInput,
): Promise<SettingsProfile> => {
  const { displayName, userId } = validateChangeDisplayNameInput(input)
  const user = await prisma.user.update({
    where: { id: userId },
    data: { displayName },
  })

  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}
