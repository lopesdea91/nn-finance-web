import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export interface ContextSSR extends GetServerSidePropsContext {}

export interface DataSSR<T> {
  props: T
  redirect?: {
    destination: string
    permanent: false
  }
}

export type ITeleportType = 'titlePage' | 'modal'

export interface StorePageProps<T> {
  children: ReactNode
  initial: T
}