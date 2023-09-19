import React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@/@core/presentation/shared/ui'
import { cssMerge } from '@/utils'
import { toggleMenuObserver, observer } from '@/@core/domain/observer'

export const HeaderButtonToggle: React.FC = () => {
  return (
    <button className={cssMerge(
      'lg:hidden',
      'w-8 h-6 flex items-center justify-center',
    )}
      onClick={() => observer.publish(toggleMenuObserver('toggle'))}
    >
      <Icon icon={faBars} className="h-5" />
    </button>
  )
}

