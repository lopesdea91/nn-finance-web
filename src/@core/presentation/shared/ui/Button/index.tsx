import { cssMerge } from "@/utils";
import React, { ButtonHTMLAttributes } from "react";

const colors: Record<('defualt' | 'success' | 'error'), string> = {
  defualt: `text-gray-900  dark:text-white
            bg-white hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700`,

  success: `text-white 
            bg-emerald-700 hover:bg-emerald-800  dark:bg-emerald-600 dark:hover:bg-emerald-700`,

  error: `text-white 
          bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700`
}
const sizes: Record<('sm' | 'md'), string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-1.5 text-sm'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'defualt' | 'success' | 'error'
  size?: 'sm' | 'md'
}
export const Button = function ({ children, className, color, size, ...props }: ButtonProps) {
  const currentColor = colors[color || 'defualt']
  const currentSize = sizes[size || 'sm']

  return (
    <button
      type="button"
      className={cssMerge(
        'font-medium rounded-sm border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:border-white',
        currentColor,
        currentSize,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};