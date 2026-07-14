import { createServerFn } from '@tanstack/react-start'
import { changeDisplayName } from '#/features/settings/services/change-displayname'
import type { ChangeDisplayNameInput } from '#/features/settings/types/settings-types'

export const changeDisplayNameServerFn = createServerFn({ method: 'POST' })
  .validator((data: ChangeDisplayNameInput) => data)
  .handler(async ({ data }) => changeDisplayName(data))
