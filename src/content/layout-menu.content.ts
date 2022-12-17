import { MenuGroup } from "@/types/layout";

export const menuList: MenuGroup[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'home',
    links: []
  },
  {
    title: 'Finança',
    href: null,
    icon: 'home',
    links: [
      { label: 'Cadastrar', href: '/finance/order', icon: 'cashRegister' },
      { label: 'Extrato', href: '/finance/extract', icon: 'receipt' },
    ]
  }
]