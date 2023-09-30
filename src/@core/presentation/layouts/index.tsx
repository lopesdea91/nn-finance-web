import React from 'react'
import { LayoutType } from '@/@core/app/app.types'
import { LayoutAuth, LayoutDashboard, LayoutPrivate, LayoutSettings } from './types'

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutType
}

export const Layout = ({ children, layout }: LayoutProps) => {
  const LayoutSelected = React.useMemo(() => {
    const layouts = {
      auth: LayoutAuth,
      dashboard: LayoutDashboard,
      private: LayoutPrivate,
      settings: LayoutSettings
    }

    return layouts[(layout || 'private')]
  }, [layout])

  return (
    <LayoutSelected>
      {children}
    </LayoutSelected>
  )
}
