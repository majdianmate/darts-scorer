import { prisma } from '#/db'
import { validateChangeImageInput } from '#/features/settings/lib/settings-validation'
import type {
  ChangeImageInput,
  SettingsProfile,
} from '#/features/settings/types/settings-types'

export const changeImage = async (
  input: ChangeImageInput,
): Promise<SettingsProfile> => {
  const { image, userId } = validateChangeImageInput(input)
  const user = await prisma.user.update({
    where: { id: userId },
    data: { image },
  })

  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}
