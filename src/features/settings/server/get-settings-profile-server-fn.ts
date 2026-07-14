import { createServerFn } from '@tanstack/react-start'
import { getSettingsProfile } from '#/features/settings/services/get-settings-profile'
import type { SettingsProfileInput } from '#/features/settings/types/settings-types'

export const getSettingsProfileServerFn = createServerFn({ method: 'POST' })
  .validator((data: SettingsProfileInput) => data)
  .handler(async ({ data }) => getSettingsProfile(data))
