import React, { ReactNode } from 'react'
import Link from 'next/link';
import { IMenuItem } from '@/types/layout'
import { cssMerge } from '@/utils';

interface MenuItemProps {
  name: IMenuItem['name'];
  to: IMenuItem['to'];
  // slug: IMenuItem['slug'];
  disabled?: IMenuItem['disabled'];
  className?: string
  active: boolean
}
export const MenuItem: React.FC<MenuItemProps> = ({ name, to, disabled, className, active }) => {
  let cssCurrent = ''

  if (className)
    cssCurrent += className

  if (active)
    cssCurrent += ' text-neutral-800 dark:text-neutral-200 border-b-transparent bg-gradient-to-r from-white/30'

  return disabled
    ? <ItemDisabled className={cssCurrent}>{name}</ItemDisabled>
    : <ItemLink className={cssCurrent} to={to}>{name}</ItemLink>
}

const ItemDisabled: React.FC<{ children: ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <span className={cssMerge(cssBase, 'font-thin cursor-not-allowed opacity-50', className)} >
      {children}
    </span>
  )
}
const ItemLink: React.FC<{ children: ReactNode, className?: string, to: string }> = ({ children, className, to }) => {
  return (
    <Link
      href={to}
      className={cssMerge(cssBase, 'duration-300 hover:bg-white/30', className)}
    >
      {children}
    </Link>
  )
}
const cssBase = 'block text-sm uppercase text-neutral-700 dark:text-neutral-300 pl-2 py-1 border-b-[1px] border-b-white/20 last:border-b-transparent'
