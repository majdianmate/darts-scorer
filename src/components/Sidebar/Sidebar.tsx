import { Link, useRouterState } from '@tanstack/react-router'
import {
  ChevronDown,
  LogOut,
  MoreHorizontal,
  Monitor,
  Moon,
  PanelLeft,
  PanelLeftClose,
  Sun,
  UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { useAuth } from '#/features/auth/hook/use-auth'
import { cn } from '#/lib/utils'
import {
  mainSidebarMenus,
  secondarySidebarMenus,
  sidebarQuickActions,
} from './sidebar-menus'
import { useUiStore } from '#/store/ui-store'
import type { ReactNode } from 'react'
import type { SidebarMenuItem } from './sidebar-menus'

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const { user, isSigningOut, signOut } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isThemeMounted, setIsThemeMounted] = useState(false)
  const { resolvedTheme, setTheme, theme } = useTheme()
  const { isSidebarOpen, toggleSidebar } = useUiStore()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isCollapsed = !isSidebarOpen

  const displayName = user?.displayName ?? user?.username ?? user?.name ?? 'User'
  const email = user?.email ?? 'Signed in'
  const initials = getInitials(displayName)

  useEffect(() => {
    setIsThemeMounted(true)
  }, [])

  async function handleSignOut() {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch {
      toast.error('Sign out failed. Please try again.')
    }
  }

  return (
    <div
      className={cn(
        'grid min-h-screen grid-cols-1 bg-transparent lg:transition-[grid-template-columns] lg:duration-300',
        isCollapsed ? 'lg:grid-cols-[5rem_1fr]' : 'lg:grid-cols-[17.5rem_1fr]',
      )}
    >
      <aside
        className={cn(
          'sticky top-0 z-20 hidden h-screen border-r border-sidebar-border/70 bg-sidebar/72 py-5 text-sidebar-foreground shadow-[18px_0_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-[padding] duration-300 lg:flex lg:flex-col dark:shadow-[18px_0_70px_rgba(0,0,0,0.22)]',
          isCollapsed ? 'px-3' : 'px-4',
        )}
      >
        <div
          className={cn(
            'mb-7 flex items-center gap-3 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/45 px-3 py-3 shadow-sm',
            isCollapsed && 'justify-center px-2',
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <PanelLeft className="size-5" />
          </div>
          {!isCollapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Darts Scorer</p>
                <p className="truncate text-xs text-muted-foreground">
                  Match control
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-xl"
                onClick={() => {
                  toggleSidebar()
                  setIsUserMenuOpen(false)
                }}
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="size-4" />
              </Button>
            </>
          ) : null}
        </div>

        {isCollapsed ? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="mx-auto mb-4 rounded-xl"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
          >
            <PanelLeft className="size-4" />
          </Button>
        ) : null}

        <SidebarMenu
          items={mainSidebarMenus}
          pathname={pathname}
          label="Menu"
          isCollapsed={isCollapsed}
        />

        <div
          className={cn(
            'mt-6 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/35 shadow-sm',
            isCollapsed ? 'p-1.5' : 'p-3',
          )}
        >
          {!isCollapsed ? (
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Quick
            </p>
          ) : null}
          <SidebarMenuList
            items={sidebarQuickActions}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        </div>

        <div className="mt-6">
          <SidebarMenu
            items={secondarySidebarMenus}
            pathname={pathname}
            label="Secondary"
            isCollapsed={isCollapsed}
          />
        </div>

        <ThemeSwitcher
          isCollapsed={isCollapsed}
          isMounted={isThemeMounted}
          resolvedTheme={resolvedTheme}
          setTheme={setTheme}
          theme={theme}
        />

        <div className="mt-auto pt-5">
          <div className="relative">
            {isUserMenuOpen ? (
              <div
                className={cn(
                  'absolute bottom-[calc(100%+0.75rem)] rounded-2xl border border-border/70 bg-popover/92 p-2 text-popover-foreground shadow-[0_22px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:shadow-[0_22px_70px_rgba(0,0,0,0.35)]',
                  isCollapsed ? 'left-0 w-56' : 'left-0 right-0',
                )}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <LogOut className="size-4" />
                  {isSigningOut ? 'Signing out...' : 'Sign out'}
                </Button>
              </div>
            ) : null}

            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/40 text-left shadow-sm transition hover:bg-sidebar-accent/70',
                isCollapsed ? 'justify-center p-2' : 'p-3',
              )}
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isUserMenuOpen}
              aria-label="Open user menu"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={`${displayName} profile`}
                  className="size-10 shrink-0 rounded-full border border-sidebar-border object-cover"
                />
              ) : (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {initials}
                </div>
              )}
              {!isCollapsed ? (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.username ? `@${user.username}` : email}
                    </p>
                  </div>
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </>
              ) : null}
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-4 sm:px-6 lg:px-10 lg:py-8">
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col">
          <div className="mb-6 rounded-3xl border border-border/70 bg-card/55 px-5 py-4 text-card-foreground shadow-sm backdrop-blur-2xl lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Darts Scorer</p>
                <p className="text-xs text-muted-foreground">
                  Protected area
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  )
}

const themeOptions = [
  {
    icon: Sun,
    label: 'Light',
    value: 'light',
  },
  {
    icon: Moon,
    label: 'Dark',
    value: 'dark',
  },
  {
    icon: Monitor,
    label: 'System',
    value: 'system',
  },
] as const

function ThemeSwitcher({
  isCollapsed,
  isMounted,
  resolvedTheme,
  setTheme,
  theme,
}: {
  isCollapsed: boolean
  isMounted: boolean
  resolvedTheme?: string
  setTheme: (theme: string) => void
  theme?: string
}) {
  const currentTheme = isMounted ? (theme ?? 'system') : 'system'
  const ResolvedIcon = resolvedTheme === 'dark' ? Moon : Sun

  function cycleTheme() {
    const currentIndex = themeOptions.findIndex(
      (option) => option.value === currentTheme,
    )
    const nextTheme = themeOptions[(currentIndex + 1) % themeOptions.length]

    setTheme(nextTheme.value)
  }

  if (isCollapsed) {
    return (
      <div className="mt-6 flex justify-center">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-xl"
          onClick={cycleTheme}
          title={`Theme: ${currentTheme}`}
          aria-label="Switch theme"
        >
          <ResolvedIcon className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/35 p-3 shadow-sm">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Theme
      </p>
      <div className="grid grid-cols-3 gap-1">
        {themeOptions.map((option) => {
          const Icon = option.icon
          const isActive = currentTheme === option.value

          return (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              className={cn(
                'h-9 rounded-xl px-2 text-xs',
                isActive &&
                  'bg-primary text-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground',
              )}
              onClick={() => setTheme(option.value)}
              aria-pressed={isActive}
            >
              <Icon className="size-3.5" />
              {option.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function SidebarMenu({
  items,
  pathname,
  label,
  isCollapsed,
}: {
  items: Array<SidebarMenuItem>
  pathname: string
  label: string
  isCollapsed: boolean
}) {
  return (
    <nav aria-label={label}>
      {!isCollapsed ? (
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
      ) : null}
      <SidebarMenuList
        items={items}
        pathname={pathname}
        isCollapsed={isCollapsed}
      />
    </nav>
  )
}

function SidebarMenuList({
  items,
  pathname,
  isCollapsed,
}: {
  items: Array<SidebarMenuItem>
  pathname: string
  isCollapsed: boolean
}) {
  return (
    <div className={cn('space-y-1', isCollapsed && 'flex flex-col items-center')}>
      {items.map((item) => (
        <SidebarMenuLink
          key={item.href}
          item={item}
          pathname={pathname}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  )
}

function SidebarMenuLink({
  item,
  pathname,
  isCollapsed,
}: {
  item: SidebarMenuItem
  pathname: string
  isCollapsed: boolean
}) {
  const Icon = item.icon
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
  const children = item.children ?? []
  const hasChildren = children.length > 0

  return (
    <div>
      <Link
        to={item.href}
        title={isCollapsed ? item.title : undefined}
        className={cn(
          'group flex items-center gap-3 rounded-xl text-sm font-medium text-muted-foreground no-underline hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground',
          isCollapsed ? 'size-11 justify-center px-0 py-0' : 'px-3 py-2.5',
          isActive &&
            'bg-sidebar-accent text-sidebar-accent-foreground',
        )}
      >
        <Icon className="size-4 text-foreground group-hover:text-foreground" />
        {!isCollapsed ? <span className="flex-1 text-foreground group-hover:text-foreground">{item.title}</span> : null}
        {item.badge && !isCollapsed ? (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {item.badge}
          </span>
        ) : null}
        {hasChildren && !isCollapsed ? (
          <ChevronDown className="size-3.5 opacity-70" />
        ) : null}
      </Link>

      {hasChildren && !isCollapsed ? (
        <div className="ml-7 mt-1 space-y-1 border-l border-sidebar-border pl-2">
          {children.map((child) => (
            <SidebarMenuLink
              key={child.href}
              item={child}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function getInitials(name: string) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  return initials || <UserRound className="size-4" />
}
