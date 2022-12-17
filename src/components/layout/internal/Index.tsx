import { LayoutHeader } from './LayoutHeader'
import { LayoutMenu } from './LayoutMenu'
import { LayoutContent } from './LayoutContent'

interface Props {
  children: React.ReactNode
}
export const LayoutInternal = ({ children }: Props) => {
  return (
    <div className='app-layout'>
      <LayoutHeader />

      <LayoutMenu />

      <LayoutContent>
        {children}
      </LayoutContent>
    </div>
  )
}