import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { menuFinanceItemsGroup, menuInvestItemsGroup, menuMainItemsGroup } from '@/@core/constants/menuItems'
import { Container, Main } from './components'
import { useTeleportHook } from '@/@core/framework/hook'
import { Header, Menu, MenuLink } from '../../shared'
import { toggleMenuObserver, observer } from '@/@core/domain/observer'

interface LayoutSettingsProps {
  children: React.ReactNode
}
export const LayoutSettings: React.FC<LayoutSettingsProps> = ({ children }) => {
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

      <Header.Root className='lg:ml-52 justify-end'>
        <Header.ButtonToggle />
      </Header.Root>

      <Main.Root className='lg:ml-52'>
        <TeleportOut type="titlePage" />
        <div className='mx-auto max-w-3xl'>
          {children}
        </div>
      </Main.Root>
    </Container.Root>
  )
}
