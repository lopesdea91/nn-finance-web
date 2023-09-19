import React from 'react'
import { LayoutAuth } from '@/@core/presentation/layouts/types/LayoutAuth'
import { LayoutDashboard } from '@/@core/presentation/layouts/types/LayoutDashboard'
import { LayoutPrivate } from '@/@core/presentation/layouts/types/LayoutPrivate'
import { LayoutSettings } from '@/@core/presentation/layouts/types/LayoutSettings'
import { LayoutType } from '@/types/layout'
import { Loading } from './shared'
import { usePrepareStore } from '@/@core/framework/hook/usePrepareStore'

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutType
}

export const Layout = ({ children, layout }: LayoutProps) => {
  const { isPending } = usePrepareStore()
  const LayoutSelected = React.useMemo(() => getCurrentLayout(layout), [layout])

  if (isPending) {
    return <Loading />
  }

  return (
    <LayoutSelected>
      {children}
    </LayoutSelected>
  )
}

const layouts = {
  auth: LayoutAuth,
  dashboard: LayoutDashboard,
  private: LayoutPrivate,
  settings: LayoutSettings
}
const getCurrentLayout = (key: LayoutType = 'private') => layouts[key]