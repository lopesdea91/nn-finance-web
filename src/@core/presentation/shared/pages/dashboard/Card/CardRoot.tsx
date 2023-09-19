import { cssMerge } from '@/utils'
import { FC, ReactNode } from 'react'

interface CardRootProps {
  children: ReactNode
  className?: string
}
export const CardRoot: FC<CardRootProps> = ({ children, className }) => {
  return (
    <article
      className={cssMerge(
        // 'shadow shadow-[#00000030] dark:shadow-neutral-500',
        // 'border-[1px] border-[#00000015]',
        // 'border-[1px] border-[#00000005] dark:border-[#00000050]',
        // 'text-zinc-800 dark:text-zinc-200',
        // 'bg-[#00000010] dark:bg-[#ffffff10]',
        'dark:text-neutral-200',
        'p-2',
        className
      )}
    >
      {children}
    </article>
  )
}