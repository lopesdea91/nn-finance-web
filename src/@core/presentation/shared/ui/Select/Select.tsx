import { cssMerge } from '@/utils'
import React, { InputHTMLAttributes, forwardRef, useId } from 'react'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  wrapper?: {
    className?: string
  }
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(($props, ref) => {
  const { label, className, error, children, wrapper, ...props } = $props
  const currentId = useId()

  return (
    <div className={cssMerge(
      'w-full',
      wrapper?.className
    )}>
      {label && <label
        htmlFor={currentId}
        className="block text-xs text-gray-800 dark:text-white/50">
        {label}
      </label>
      }

      <select
        ref={ref}
        id={currentId}
        className={cssMerge(
          'rounded bg-gray-50 block w-full px-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 border border-zinc-300 dark:bg-transparent dark:border-zinc-600 dark:placeholder-gray-400 dark:text-zinc-200 dark:focus:ring-blue-500 dark:focus:border-brlue-500 outline-none h-8',
          className
        )}
        {...props}
      >
        {children}
      </select>

      {error && <span
        className='block truncate text-sm font-semibold text-red-800 dark:text-red-600'>
        {error}
      </span>}
    </div>
  )
})

Select.displayName = 'Select'