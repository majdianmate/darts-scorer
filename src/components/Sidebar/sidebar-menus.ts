import {
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  Swords,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SidebarMenuItem {
  icon: LucideIcon
  title: string
  href: string
  badge?: number
  children?: Array<Omit<SidebarMenuItem, 'children'>>
}

export const mainSidebarMenus: Array<SidebarMenuItem> = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Shield,
    title: 'Clubs',
    href: '/clubs',
  },
  {
    icon: Swords,
    title: 'Match',
    href: '/match',
  },
]

export const secondarySidebarMenus: Array<SidebarMenuItem> = [
  {
    icon: Settings,
    title: 'Settings',
    href: '/settings',
  },
  {
    icon: ScrollText,
    title: 'Patch notes',
    href: '/patch-notes',
  },
  {
    icon: CircleHelp,
    title: 'Help',
    href: '/help',
  },
]

export const sidebarQuickActions: Array<SidebarMenuItem> = [
  {
    icon: ClipboardList,
    title: 'League board',
    href: '/dashboard',
    badge: 3,
  },
]
