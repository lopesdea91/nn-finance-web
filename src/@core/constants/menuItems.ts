import { IMenuItem } from '@/types/layout'

export const menuMainItemsGroup: IMenuItem[] = [
  {
    name: 'Home',
    to: '/home',
    disabled: false,
    slug: 'home'
  }
]
export const menuFinanceItemsGroup: IMenuItem[] = [
  {
    name: 'Dashboard',
    to: '/dashboard/finance',
    slug: '/dashboard/finance',
    disabled: false
  },
  {
    name: 'Cadastro',
    to: '/finance/item/new',
    slug: '/finance/item/new',
    disabled: false
  },
  {
    name: 'Extrato',
    to: '/finance/item',
    slug: '/finance/item',
    disabled: false
  },
  {
    name: 'Lista',
    to: '/finance/item',
    slug: 'listfinance_',
    disabled: false
  },
  {
    name: 'Fatura',
    to: '/finance/item',
    slug: 'finance_invoice',
    disabled: true
  },
  {
    name: 'Composição',
    to: '/finance/item',
    slug: 'finance_composition',
    disabled: true
  }
]
export const menuInvestItemsGroup: IMenuItem[] = [
  {
    name: 'Dashboard',
    to: '/dashboard/invest',
    slug: 'dashboard_invest',
    disabled: true
  },
  {
    name: 'Negociação',
    to: '/invest/order/',
    slug: 'invest_order',
    disabled: true
  },
  {
    name: 'Ativos',
    to: '/invest/Ativos/',
    slug: 'invest_Ativos',
    disabled: true
  },
  {
    name: 'Renda Fixa',
    to: '/invest/Fixa/',
    slug: 'invest_Fixa',
    disabled: true
  },
  {
    name: 'Renda Variável',
    to: '/invest/Variável/',
    slug: 'invest_Variável',
    disabled: true
  },
  {
    name: 'Carteira',
    to: '/invest/Carteira/',
    slug: 'invest_Carteira',
    disabled: true
  },
  {
    name: 'Composição',
    to: '/invest/Composição/',
    slug: 'invest_Composição',
    disabled: true
  }
]
