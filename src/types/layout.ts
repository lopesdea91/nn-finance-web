import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type LayoutType = 'public' | 'private'

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: LayoutType
}

export type AppPropsLayout = AppProps & {
  Component: PageLayout
}

export type ThemeModes = 'light' | 'dark'

export type ToastType = 'success' | 'error'

export type Toast = {
  id: string
  msg: string
  type: ToastType
}