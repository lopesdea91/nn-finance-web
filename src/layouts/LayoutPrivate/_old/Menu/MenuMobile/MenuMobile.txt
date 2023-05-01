import React from 'react'
import { MenuContainer } from './MenuMobile.styled'

type MenuMobileProps = {
  children: React.ReactNode
  status: boolean
}
export default function MenuMobile({ children, status }: MenuMobileProps) {
  return (
    <MenuContainer status={status}>
      {children}
    </MenuContainer>
  )
}
