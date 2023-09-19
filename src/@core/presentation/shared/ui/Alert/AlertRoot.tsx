import { cssMerge } from '@/utils'
import React, { FC, ReactNode } from 'react'

type AlertType = 'success' | 'error' | 'warning'

interface AlertRootProps {
  children: ReactNode
  type: AlertType
  className?: string
}

const types: Record<AlertType, string> = {
  success: 'border-teal-500 bg-teal-100 text-teal-900',
  error: 'border-red-500 bg-red-100 text-red-900',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-900'
}
const AlertRoot: FC<AlertRootProps> = ({ children, className, type }) => {
  return (
    <div
      className={cssMerge(
        "w-full border-t-4 rounded-b px-4 py-2 shadow-md text-bold",
        types[type],
        className,
      )}
      role="alert"
    >
      <div className="flex items-center">
        {children}
      </div>
    </div>
  )
}

export default AlertRoot
