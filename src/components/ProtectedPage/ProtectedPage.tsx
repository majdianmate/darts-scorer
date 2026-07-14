import type { ReactNode } from 'react'

interface ProtectedPageProps {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function ProtectedPage({
  eyebrow,
  title,
  description,
  children,
}: ProtectedPageProps) {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/45 p-7 text-card-foreground shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {children ?? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-border/70 bg-card/42 p-6 text-card-foreground shadow-[0_18px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_18px_70px_rgba(0,0,0,0.2)]">
            <p className="text-sm font-semibold">Overview</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ready for the first widgets and stats.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/32 p-6 text-card-foreground shadow-[0_18px_70px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-[0_18px_70px_rgba(0,0,0,0.18)]">
            <p className="text-sm font-semibold">Activity</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Recent darts activity will live here.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/15 bg-primary/90 p-6 text-primary-foreground shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            <p className="text-sm font-semibold">Next step</p>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/65">
              Extend this route with feature-specific content.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
