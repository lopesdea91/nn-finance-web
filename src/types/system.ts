import { IconNames } from "@/components/base/icon/AppIcon"

export interface User {
  id: number | null,
  name: string,
  email: string
}
export interface SectionMenuLinksItem {
  href: string
  label: string
  icon: IconNames
}
export interface SectionMenuLinks {
  title: string
  child: SectionMenuLinksItem[]
}