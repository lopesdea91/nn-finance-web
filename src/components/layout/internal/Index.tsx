import { LayoutHeader } from './LayoutHeader'
import { LayoutMenu } from './LayoutMenu'
import { LayoutContent } from './LayoutContent'
import { LayoutLoading } from './LayoutLoading'

interface Props {
  children: React.ReactNode
}
export const LayoutInternal = ({ children }: Props) => {
  return (
    <div className='app-layout'>
      <LayoutHeader />

      <LayoutMenu />

      <LayoutContent>
        <LayoutLoading />
        {children}
      </LayoutContent>
    </div>
  )
}