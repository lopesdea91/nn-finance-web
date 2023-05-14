import { useEffect } from "react"
import Router from 'next/router'
import { SystemStore } from "@/store/hook"
import { SectionMenuLinks } from "@/types/system"
import { MenuBrand, MenuDesktopContainer, MenuFooter, MenuFooterItem, MenuFooterItemIcon, MenuLinkContainer, MenuLinkIcon, MenuLinkItem, MenuLinkSection, MenuLinkText, MenuLinkTitle, MenuMobileContainer } from "./_styled"
import { useMediaQuerys } from "@/hooks"

type MenuDesktopProps = {
  children: React.ReactNode
}
function MenuDesktop({ children }: MenuDesktopProps) {
  return (
    <MenuDesktopContainer>
      {children}
    </MenuDesktopContainer>
  )
}
type MenuMobileProps = {
  children: React.ReactNode
  status: boolean
}
function MenuMobile({ children, status }: MenuMobileProps) {
  return (
    <MenuMobileContainer status={status}>
      {children}
    </MenuMobileContainer>
  )
}

const useHandleMenuLink = () => {
  const systemStore = SystemStore()

  const handleMenuLink = () => {
    systemStore.state.menu && systemStore.toggleMenu()
  }

  return handleMenuLink
}
const Brand = () => {
  return (
    <MenuBrand onClick={() => Router.push('/panel/finance')} variant='h4'>NN</MenuBrand>
  )
}
const Links = () => {
  const handleMenuLink = useHandleMenuLink()

  const sectionPrincipal: SectionMenuLinks = {
    title: 'Painel',
    child: [
      { href: '/panel/finance', label: 'Finanças', icon: 'home' }
    ]
  }
  const sectionFinance: SectionMenuLinks = {
    title: 'Finança',
    child: [
      { href: '/finance/item/new', label: 'Cadastrar', icon: 'cashRegister' },
      { href: '/finance/extract', label: 'Extrato', icon: 'calendarDays' },
      { href: '/finance/list', label: 'Listas', icon: 'receipt' },
      { href: '/finance/invoice', label: 'Faturas', icon: 'creditCard' },
    ]
  }

  return (
    <MenuLinkContainer>
      {[sectionPrincipal, sectionFinance].map((section) => (
        <MenuLinkSection key={`${section.title}-title`}>
          <MenuLinkTitle variant='h6'>
            {section.title}
          </MenuLinkTitle>

          {section.child.map(child => (
            <MenuLinkItem
              key={child.label}
              href={child.href}
              title={`${section.title}/${child.label}`}
              onClick={() => handleMenuLink()}
            >
              <MenuLinkIcon variant={child.icon} />
              <MenuLinkText variant='body2'>{child.label}</MenuLinkText>
            </MenuLinkItem>
          ))}
        </MenuLinkSection>
      ))}
    </MenuLinkContainer>
  )
}
const Footer = () => {
  const handleMenuLink = useHandleMenuLink()

  return (
    <MenuFooter>
      <MenuFooterItem href='/settings' onClick={() => handleMenuLink()}>
        <MenuFooterItemIcon variant='gear' />
      </MenuFooterItem>

      <MenuFooterItem href='/auth/sign-out' onClick={() => handleMenuLink()}>
        <MenuFooterItemIcon variant='signOut' />
      </MenuFooterItem>
    </MenuFooter>
  )
}
export const Menu = () => {
  const systemStore = SystemStore()

  const { minTable } = useMediaQuerys()

  useEffect(() => {
    systemStore.closeMenu()
  }, [minTable])

  if (minTable)
    return (
      <MenuDesktop>
        <Brand />
        <Links />
        <Footer />
      </MenuDesktop>
    )

  return (
    <MenuMobile status={systemStore.state.menu}>
      <Brand />
      <Links />
      <Footer />
    </MenuMobile>
  )
}
