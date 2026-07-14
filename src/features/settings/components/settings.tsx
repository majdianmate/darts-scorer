import { Camera, Loader2 } from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { toast } from 'sonner'
import { ProtectedPage } from '#/components/ProtectedPage/ProtectedPage'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useSettings } from '#/features/settings/hooks/use-settings'
import { readProfileImageFile } from '#/features/settings/utils/profile-image-file'

export default function Settings() {
  const {
    profile,
    profileQuery,
    changeDisplayName,
    changeImage,
    isChangingDisplayName,
    isChangingImage,
  } = useSettings()
  const [displayName, setDisplayName] = useState('')
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!profile) {
      return
    }

    setDisplayName(profile.displayName)
  }, [profile])

  async function handleDisplayNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await changeDisplayName(displayName)
      toast.success('Display name updated')
    } catch (error) {
      toast.error('Display name update failed', {
        description:
          error instanceof Error ? error.message : 'Please try again later.',
      })
    }
  }

  async function handleImageSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const imageData = await readProfileImageFile(file)
      await changeImage(imageData)
      toast.success('Profile image updated')
    } catch (error) {
      toast.error('Profile image update failed', {
        description:
          error instanceof Error ? error.message : 'Please try again later.',
      })
    } finally {
      event.target.value = ''
    }
  }

  const displayNameChanged = displayName.trim() !== (profile?.displayName ?? '')

  return (
    <ProtectedPage
      eyebrow="Settings"
      title="Settings"
      description="Manage your profile details and account preferences."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card className="gap-0 overflow-hidden bg-card/55 py-0 backdrop-blur-xl">
          <CardHeader className="border-b px-6 py-6">
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how your account appears across the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                {profile?.image ? (
                  <img
                    src={profile.image}
                    alt={`${profile.displayName} profile`}
                    className="size-16 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                    {getInitials(profile?.displayName ?? 'User')}
                  </div>
                )}

                <Button
                  type="button"
                  size="icon-sm"
                  className="absolute -bottom-1 -right-1 rounded-full shadow-md"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isChangingImage}
                  aria-label="Choose profile image"
                >
                  {isChangingImage ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Camera className="size-4" />
                  )}
                </Button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageSelect}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">
                  {profile?.displayName ?? 'User'}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {profile?.email ?? 'No email'}
                </p>
                {profileQuery.isFetching ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Refreshing profile...
                  </p>
                ) : null}
                <p className="mt-1 text-xs text-muted-foreground">
                  Click the camera icon to choose an image from your device.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="gap-0 bg-card/55 py-0 backdrop-blur-xl">
            <CardHeader className="border-b px-6 py-6">
              <CardTitle>Display name</CardTitle>
              <CardDescription>
                Choose the name shown in navigation, clubs, and match screens.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleDisplayNameSubmit}>
              <CardContent className="space-y-2 px-6 py-6">
                <Label htmlFor="display-name">Display name</Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Your display name"
                  required
                />
              </CardContent>
              <CardFooter className="justify-end border-t px-6 py-6">
                <Button
                  type="submit"
                  disabled={!displayNameChanged || isChangingDisplayName}
                >
                  {isChangingDisplayName ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save display name'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="gap-0 bg-card/55 py-0 backdrop-blur-xl">
            <CardHeader className="border-b px-6 py-6">
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Email and account identity are managed separately from profile
                appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-6 py-6">
              <Label>Email</Label>
              <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                {profile?.email ?? 'No email'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  )
}

function getInitials(name: string) {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'U'
  )
}
