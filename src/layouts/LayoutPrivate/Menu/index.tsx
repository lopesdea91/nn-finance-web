import React, { useEffect } from 'react'
import Router from 'next/router'
import { useMediaQuery } from '@mui/material'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import MenuDesktop from './MenuDesktop/MenuDesktop'
import MenuMobile from './MenuMobile/MenuMobile'
import {
  MenuBrand,
  MenuLinkContainer, MenuLinkSection, MenuLinkTitle, MenuLinkItem, MenuLinkIcon, MenuLinkText,
  MenuFooter, MenuFooterItem, MenuFooterItemIcon,
} from './styled'
import { SectionMenuLinks } from '@/types/system'
import { useAppSelector } from '@/store/hook'


const useHandleMenuLink = () => {
  const { toggleMenu } = useStoreSystem()
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  const handleMenuLink = () => {
    systemState.menu && toggleMenu()
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

      <MenuFooterItem href='/sign-out' onClick={() => handleMenuLink()}>
        <MenuFooterItemIcon variant='signOut' />
      </MenuFooterItem>
    </MenuFooter>
  )
}

export default function Menu() {
  const { closeMenu } = useStoreSystem()
  const { systemState } = useAppSelector(e => ({
    systemState: e.system
  }))

  const isDesktop = useMediaQuery('(min-width: 426px)')

  useEffect(() => {
    closeMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  if (isDesktop)
    return (
      <MenuDesktop>
        <Brand />
        <Links />
        <Footer />
      </MenuDesktop>
    )

  return (
    <MenuMobile status={systemState.menu}>
      <Brand />
      <Links />
      <Footer />
    </MenuMobile>
  )
}