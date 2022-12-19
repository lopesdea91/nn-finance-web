import { AppDropdownItem } from "@/types/layout";

export const headerMenu: AppDropdownItem[] = [
  {
    text: 'Minha conta',
    to: '/settings/account'
  },
  {
    text: 'Configurações',
    to: '/settings'
  },
  {
    text: 'Sair',
    to: '/auth/sign-out'
  },
]