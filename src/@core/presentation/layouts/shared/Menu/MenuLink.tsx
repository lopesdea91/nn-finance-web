import React, { useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IMenuItem } from '@/types/layout'
import { cssMerge } from '@/utils'
import { FaArrowRight } from 'react-icons/fa6'

interface MenuLinkProps extends IMenuItem { }
export const MenuLink: React.FC<MenuLinkProps> = ({
  name,
  to,
  slug,
  disabled,
  childs
}) => {
  const router = useRouter()

  const [childsStatus, setChildsStatus] = React.useState(true)

  const hasChilds = childs.length > 0

  const toggleStatus = useCallback(() => {
    setChildsStatus(prev => !prev)
  }, [])

  return (
    <>
      <MenuLinkRoot>
        <MenuLinkIcon icon='' />
        <MenuLinkText
          name={name}
          to={to}
          disabled={disabled}
          toggleStatus={toggleStatus}
          hasChilds={hasChilds}
        />
        <MenuLinkBtn
          childsStatus={childsStatus}
          toggleStatus={toggleStatus}
          hasChilds={hasChilds}
        />
      </MenuLinkRoot>

      {childs.map(child => (
        <MenuLinkRoot
          key={child.slug}
          className={childsStatus ? 'ga-2 h-max' : 'h-0'}
        >
          <MenuLinkText
            name={child.name}
            to={child.to}
            disabled={child.disabled}
            toggleStatus={toggleStatus}
            className='pl-3 text-sm leading-5'
            hasChilds={false}
          />
        </MenuLinkRoot>
      ))}
    </>
  )
}

const MenuLinkRoot: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={cssMerge(
        'flex items-center px-1 overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

const MenuLinkIcon: React.FC<{
  icon: string
}> = ({ icon }) => {
  return null
}

const MenuLinkText: React.FC<{
  name: string
  to: string
  disabled: boolean
  toggleStatus: () => void,
  className?: string
  hasChilds: boolean
}> = ({ name, to, disabled, toggleStatus, className, hasChilds }) => {

  const cssContent = React.useMemo(() =>
    cssMerge(
      'capitalize text-base font-medium leading-6 inline-block truncate overflow-hidden w-full',
      disabled ? 'text-gray-600' : 'cursor-pointer hover:text-gray-200',
      className
    ), [])

  const textContent = React.useMemo(() => (
    <>
      {name}
    </>
  ), [])

  if (disabled)
    return (
      <span className={cssContent}>
        {textContent}
      </span>
    )

  if (to && !hasChilds)
    return (
      <Link href={to} className={cssContent}>
        {textContent}
      </Link>
    )

  return (
    <span className={cssContent} onClick={toggleStatus}>
      {textContent}
    </span>
  )
}

const MenuLinkBtn: React.FC<{
  hasChilds: boolean
  childsStatus: boolean
  toggleStatus: () => void
}> = ({ hasChilds, childsStatus, toggleStatus }) => {
  return (
    <button
      className={cssMerge(
        "flex items-center justify-center overflow-hidden h-[20px] mr-1 hover:bg-gray-50 hover:text-slate-800",
        hasChilds ? "w-[20px]" : "w-0"
      )}
      onClick={toggleStatus}
    >
      <span
        className={cssMerge(
          'text-base leading-6 m-auto w-[20px] h-[20px]',
          'transition-all duration-150 ease-in-out',
          childsStatus ? 'rotate-90' : ''
        )}
      >
        <FaArrowRight />
      </span>
    </button>
  )
}
