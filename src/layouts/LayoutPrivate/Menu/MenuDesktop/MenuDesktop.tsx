import React from 'react'
import {
  MenuContainer,
  // MenuBrand,
  // MenuLinkContainer, MenuLinkSection, MenuLinkTitle, MenuLinkItem, MenuLinkIcon, MenuLinkText,
  // MenuFooter, MenuFooterItem, MenuFooterItemIcon,
} from './MenuDesktop.styled'
// import { useStoreSystem } from '@/hooks/useStoreSystem'
// import { SectionMenuLinks } from '@/types/system'

// const useHandleMenuLink = () => {
//   const { systemState, dispatchToggleMenu } = useStoreSystem()

//   const handleMenuLink = () => {
//     systemState.menu && dispatchToggleMenu()
//   }

//   return handleMenuLink
// }
// const Brand = () => {
//   return (
//     <MenuBrand onClick={() => Router.push('/panel/finance')} variant='h4'>NN</MenuBrand>
//   )
// }
// const Links = () => {
//   const handleMenuLink = useHandleMenuLink()

//   const sectionPrincipal: SectionMenuLinks = {
//     title: 'Painel',
//     child: [
//       { href: '/panel/finance', label: 'Finanças', icon: 'home' }
//     ]
//   }
//   const sectionFinance: SectionMenuLinks = {
//     title: 'Finança',
//     child: [
//       { href: '/finance/extract', label: 'Extrato', icon: 'calendarDays' },
//       { href: '/finance/item', label: 'Cadastrar', icon: 'cashRegister' },
//       { href: '/finance/list', label: 'Listas', icon: 'receipt' },
//       { href: '/finance/invoice', label: 'Faturas', icon: 'creditCard' },
//     ]
//   }

//   return (
//     <MenuLinkContainer>
//       {[sectionPrincipal, sectionFinance].map((section) => (
//         <MenuLinkSection key={`${section.title}-title`}>
//           <MenuLinkTitle variant='h6'>
//             {section.title}
//           </MenuLinkTitle>

//           {section.child.map(child => (
//             <MenuLinkItem
//               key={child.label}
//               href={child.href}
//               title={`${section.title}/${child.label}`}
//               onClick={() => handleMenuLink()}
//             >
//               <MenuLinkIcon variant={child.icon} />
//               <MenuLinkText variant='body2'>{child.label}</MenuLinkText>
//             </MenuLinkItem>
//           ))}
//         </MenuLinkSection>
//       ))}
//     </MenuLinkContainer>
//   )
// }
// const Footer = () => {
//   const handleMenuLink = useHandleMenuLink()

//   return (
//     <MenuFooter>
//       <MenuFooterItem href='/settings' onClick={() => handleMenuLink()}>
//         <MenuFooterItemIcon variant='gear' />
//       </MenuFooterItem>

//       <MenuFooterItem href='/sign-out' onClick={() => handleMenuLink()}>
//         <MenuFooterItemIcon variant='signOut' />
//       </MenuFooterItem>
//     </MenuFooter>
//   )
// }

type MenuDesktopProps = {
  children: React.ReactNode
}
export default function MenuDesktop({ children }: MenuDesktopProps) {

  return (
    <MenuContainer>
      {children}
    </MenuContainer>
  )
}
