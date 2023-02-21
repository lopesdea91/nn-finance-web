import React from 'react'
import LayoutPrivate from '@/layouts/LayoutPrivate'
import LayoutPublic from '@/layouts/LayoutPublic'
import Loading from '@/layouts/Loading'
import { useStorePrepare } from '@/hooks/useStorePrepare'
import { LayoutType } from '@/types/layout'

type Props = {
  children: React.ReactNode
  layout: LayoutType | undefined
}

export default function Layout({ children, layout }: Props) {
  const { isPending } = useStorePrepare()

  if (isPending) {
    return <Loading fullPage />
  }

  if (!layout) {
    layout = 'private'
  }

  if (layout === 'private') {
    return (
      <LayoutPrivate>
        {children}
      </LayoutPrivate>
    )
  }

  return (
    <LayoutPublic>
      {children}
    </LayoutPublic>
  )
}
