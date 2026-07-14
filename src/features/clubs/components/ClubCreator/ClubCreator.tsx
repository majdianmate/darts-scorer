import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { useUiStore } from '#/store/ui-store'
import ClubCreatorDetails from './ClubCreatorDetails'

const ClubCreator = () => {
  const { dialogs, setDialog } = useUiStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <Dialog
      open={dialogs['club-creator']}
      onOpenChange={(open) => setDialog('club-creator', open)}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Create Club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Club</DialogTitle>
          <DialogDescription>
            Create a new club to manage your members and events.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <ClubCreatorDetails
            name={name}
            description={description}
            onNameChange={setName}
            onDescriptionChange={setDescription}
          />

          <section className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4">
            <h3 className="text-sm font-semibold text-foreground">Members</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Member selection will be added here.
            </p>
          </section>
        </div>

        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClubCreator
