import React from 'react'
import LayoutPrivate from '@/@core/presentation/layouts/types/private'
import LayoutPublic from '@/@core/presentation/layouts/types/public'
import { useStorePrepare } from '@/hooks/useStorePrepare'
import { LayoutType } from '@/types/layout'
import { Loading, Toast } from './components'

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutType
}
export function Layouts(layout: LayoutType = 'private') {
  const layouts = {
    private: LayoutPrivate,
    public: LayoutPublic,
    default: LayoutPublic,
  }

  if (!layouts[layout])
    return layouts.default

  return layouts[layout]
}

export const Layout = ({ children, layout }: LayoutProps) => {
  const { isPending } = useStorePrepare()

  if (isPending) {
    return <Loading />
  }

  const LayoutSelected = Layouts(layout)

  return (
    <LayoutSelected>
      <Toast />
      {children}
    </LayoutSelected>
  )
}
