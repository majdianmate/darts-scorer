import { createServerFn } from '@tanstack/react-start'
import { changeImage } from '#/features/settings/services/change-image'
import type { ChangeImageInput } from '#/features/settings/types/settings-types'

export const changeImageServerFn = createServerFn({ method: 'POST' })
  .validator((data: ChangeImageInput) => data)
  .handler(async ({ data }) => changeImage(data))
