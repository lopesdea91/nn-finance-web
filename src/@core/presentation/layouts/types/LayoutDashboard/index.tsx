import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { menuFinanceItemsGroup, menuInvestItemsGroup, menuMainItemsGroup } from '@/@core/constants/menuItems'
import { observer, toggleMenuObserver } from '@/@core/domain/observer'
import { useTeleportHook } from '@/@core/framework/hook'
import { Header, Menu, MenuLink } from '@/@core/presentation/layouts/shared'
import { Container, Main } from './components'
import { Loading } from '@/@core/presentation/shared/components/loading'

interface LayoutDashboardProps {
  children: React.ReactNode
}
export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  const router = useRouter()
  const [status, setStatus] = React.useState(false)

  const { TeleportOut } = useTeleportHook()

  useEffect(() => {
    let appToggleMenuDown: Function

    observer.subscribe(toggleMenuObserver((action) => {
      if (action === 'open') setStatus(true)
      if (action === 'close') setStatus(false)
      if (action === 'toggle') setStatus(p => !p)
    })).then(down => appToggleMenuDown = down)

    return () => {
      appToggleMenuDown()
    }
  }, [])

  return (
    <Container.Root>
      <Menu.Root status={status}>
        <Menu.Header />
        <Menu.Body>
          {menuMainItemsGroup.map(item => (
            <MenuLink.Item
              key={item.slug}
              {...item}
              active={router.asPath === item.slug}
              className='mx-2 mb-3'
            />
          ))}

          <MenuLink.Group name="Finança">
            {menuFinanceItemsGroup.map(item => (
              <MenuLink.Item
                key={item.slug}
                {...item}
                active={router.asPath === item.slug}
              />
            ))}
          </MenuLink.Group>

          <MenuLink.Group name="Investimento">
            {menuInvestItemsGroup.map(item => (
              <MenuLink.Item
                key={item.slug}
                {...item}
                active={router.asPath === item.slug}
              />
            ))}
          </MenuLink.Group>
        </Menu.Body>
        <Menu.Footer />
      </Menu.Root>

      <Header.Root className='lg:ml-52'>
        <Header.Fields />
        <Loading />
        <Header.ButtonToggle />
      </Header.Root>

      <Main.Root className='lg:ml-52'>
        <TeleportOut type="modal" />
        <TeleportOut type="titlePage" />
        {children}
      </Main.Root>
    </Container.Root>
  )
}