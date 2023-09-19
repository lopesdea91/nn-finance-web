import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { cssMerge } from '@/utils'

interface IconProps {
  icon: IconProp
  className?: string
}
export const Icon: FC<IconProps> = ({ icon, className }) => {
  return (
    <FontAwesomeIcon icon={icon} className={cssMerge('w-8', className)} />
  )
}
