import React from 'react'
import LayoutPrivate from '@/layouts/LayoutPrivate'
import LayoutPublic from '@/layouts/LayoutPublic'
import Loading from '@/layouts/Loading'
import { useStorePrepare } from '@/hooks/useStorePrepare'
import { LayoutType } from '@/types/layout'

type LayoutProps = {
  children: React.ReactNode
  layout?: LayoutType
}

export function Layouts(layout: LayoutType = 'private') {
  const Layouts = {
    private: LayoutPrivate,
    public: LayoutPublic
  }
  return Layouts[layout] || LayoutPublic
}

export const Layout = ({ children, layout }: LayoutProps) => {
  const { isPending } = useStorePrepare()

  if (isPending) {
    return <Loading fullPage />
  }

  const LayoutSelected = Layouts(layout)

  return <LayoutSelected>{children}</LayoutSelected>
}
