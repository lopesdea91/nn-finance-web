import React from 'react'
import {
  MenuDesktopContainer, MenuDesktopWrapper,
  MenuDesktopBrand,
  MenuDesktopFooter, MenuDesktopFooterItem, MenuDesktopFooterItemIcon,
  MenuDesktopLinkContainer, MenuDesktopLinkSection, MenuDesktopLinkTitle, MenuDesktopLinkItem, MenuDesktopLinkIcon, MenuDesktopLinkText
} from '@/styles/layout/private.styled'
import Router from 'next/router'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import { SectionMenuLinks } from '@/types/system'
import Link from 'next/link'

const useHandleMenuLink = () => {
  const { systemState, dispatchToggleMenu } = useStoreSystem()

  const handleMenuLink = () => {
    systemState.menu && dispatchToggleMenu()
  }

  return handleMenuLink
}

const Brand = () => {
  return (
    <MenuDesktopBrand onClick={() => Router.push('/panel/finance')} variant='h4'>NN</MenuDesktopBrand>
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
      { href: '/finance/extract', label: 'Extrato', icon: 'calendarDays' },
      { href: '/finance/item', label: 'Cadastrar', icon: 'cashRegister' },
      { href: '/finance/list', label: 'Listas', icon: 'receipt' },
      { href: '/finance/invoice', label: 'Faturas', icon: 'creditCard' },
    ]
  }

  return (
    <MenuDesktopLinkContainer>
      {[sectionPrincipal, sectionFinance].map((section) => (
        <MenuDesktopLinkSection key={`${section.title}-title`}>
          <MenuDesktopLinkTitle variant='h6'>
            {section.title}
          </MenuDesktopLinkTitle>

          {section.child.map(child => (
            <Link
              key={child.label}
              href={child.href}
              title={`${section.title}/${child.label}`}
              onClick={() => handleMenuLink()}
            >
              <MenuDesktopLinkIcon variant={child.icon} />
              <MenuDesktopLinkText variant='body2'>{child.label}</MenuDesktopLinkText>
            </Link>
          ))}
        </MenuDesktopLinkSection>
      ))}
    </MenuDesktopLinkContainer>
  )
}
const Footer = () => {
  const handleMenuLink = useHandleMenuLink()

  return (
    <MenuDesktopFooter>
      <MenuDesktopFooterItem href='/settings' onClick={() => handleMenuLink()}>
        <MenuDesktopFooterItemIcon variant='gear' />
      </MenuDesktopFooterItem>

      <MenuDesktopFooterItem href='/sign-out' onClick={() => handleMenuLink()}>
        <MenuDesktopFooterItemIcon variant='signOut' />
      </MenuDesktopFooterItem>
    </MenuDesktopFooter>
  )
}

export default function MenuDesktop() {
  return (
    <MenuDesktopContainer>
      <MenuDesktopWrapper>
        <Brand />
        <Links />
        <Footer />
      </MenuDesktopWrapper>
    </MenuDesktopContainer>
  )
}
