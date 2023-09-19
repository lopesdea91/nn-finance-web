import React, { memo } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAppStore } from '@/@core/framework/store'
import { Icon } from '@/@core/presentation/shared/ui'

const LoadingComponent: React.FC = () => {
  const appStore = useAppStore()

  if (!appStore.data.loading) return null

  return (
    <div className={'ml-auto'}>
      <Icon icon={faSpinner} className='animate-spin w-5 h-5 text-blue-800 dark:text-blue-200' />
    </div>
  )
}

export const Loading = memo(LoadingComponent)
