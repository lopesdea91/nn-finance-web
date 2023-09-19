import { cssMerge } from '@/utils'
import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  wrapper?: {
    className?: string
  }
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(($props, ref) => {
  const { label, className, error, wrapper, ...props } = $props
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
      <textarea
        ref={ref}
        // type="text"
        id={currentId}
        className={cssMerge(
          'rounded bg-gray-50 block w-full p-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 border border-zinc-300 dark:bg-transparent dark:border-zinc-600 dark:placeholder-gray-400 dark:text-zinc-200 dark:focus:ring-blue-500 dark:focus:border-brlue-500 outline-none',
          className
        )}
        {...props}
      />

      {error && <span
        className='block truncate text-sm font-semibold text-red-800 dark:text-red-600'>
        {error}
      </span>}
    </div>
  )
})

Textarea.displayName = 'Textarea'