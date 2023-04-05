import React from 'react'
import { Loading } from '@/components/layout/Loading'
import LayoutPrivate from '@/layouts/LayoutPrivate'
import LayoutPublic from '@/layouts/LayoutPublic'
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
    return <Loading />
  }

  const LayoutSelected = Layouts(layout)

  return <LayoutSelected>{children}</LayoutSelected>
}
