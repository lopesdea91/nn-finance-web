import { IconNames } from "@/components/base/Icon/AppIcon"

export interface AppDropdownItem {
  text: string
  to?: string
  click?: () => void
}
export interface MenuItem {
  href: string
  label: string
  icon: IconNames
}
export interface MenuGroup {
  title: string
  href: string | null
  icon: IconNames
  links: MenuItem[]
}