import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { cn } from '#/lib/utils'

interface ClubCreatorDetailsProps {
  name: string
  description: string
  onNameChange: (name: string) => void
  onDescriptionChange: (description: string) => void
  className?: string
}

const ClubCreatorDetails = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  className,
}: ClubCreatorDetailsProps) => {
  return (
    <section className={cn('space-y-5', className)}>
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground">Club details</h3>
        <p className="text-sm text-muted-foreground">
          Add the basic information members will see when they join this club.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="club-name">Club name</Label>
        <Input
          id="club-name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="e.g. Budapest Darts Club"
          autoComplete="off"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="club-description">Description</Label>
        <textarea
          id="club-description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe the club, location, schedule, or who should join."
          className={cn(
            'min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          )}
          required
        />
      </div>
    </section>
  )
}

export default ClubCreatorDetails
