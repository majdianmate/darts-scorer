import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { useAuth } from '#/features/auth/hook/use-auth'
import { changeDisplayNameServerFn } from '#/features/settings/server/change-displayname-server-fn'
import { changeImageServerFn } from '#/features/settings/server/change-image-server-fn'
import { getSettingsProfileServerFn } from '#/features/settings/server/get-settings-profile-server-fn'

const settingsProfileQueryKey = (userId: string | undefined) => [
  'settings',
  'profile',
  userId ?? 'anonymous',
]

export function useSettings() {
  const queryClient = useQueryClient()
  const { user, updateUser } = useAuth()
  const getSettingsProfile = useServerFn(getSettingsProfileServerFn)
  const changeDisplayName = useServerFn(changeDisplayNameServerFn)
  const changeImage = useServerFn(changeImageServerFn)
  const userId = user?.id
  const profileQueryKey = settingsProfileQueryKey(userId)

  const profileQuery = useQuery({
    queryKey: profileQueryKey,
    enabled: Boolean(userId),
    initialData: user ?? undefined,
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required')
      }

      return getSettingsProfile({
        data: {
          userId,
        },
      })
    },
  })

  const displayNameMutation = useMutation({
    mutationFn: async (displayName: string) => {
      if (!userId) {
        throw new Error('User ID is required')
      }

      return changeDisplayName({
        data: {
          userId,
          displayName,
        },
      })
    },
    onSuccess: (profile) => {
      updateUser(profile)
      queryClient.setQueryData(profileQueryKey, profile)
    },
  })

  const imageMutation = useMutation({
    mutationFn: async (image: string) => {
      if (!userId) {
        throw new Error('User ID is required')
      }

      return changeImage({
        data: {
          userId,
          image,
        },
      })
    },
    onSuccess: (profile) => {
      updateUser(profile)
      queryClient.setQueryData(profileQueryKey, profile)
    },
  })

  return {
    profile: profileQuery.data,
    profileQuery,
    changeDisplayName: displayNameMutation.mutateAsync,
    changeImage: imageMutation.mutateAsync,
    isChangingDisplayName: displayNameMutation.isPending,
    isChangingImage: imageMutation.isPending,
  }
}
