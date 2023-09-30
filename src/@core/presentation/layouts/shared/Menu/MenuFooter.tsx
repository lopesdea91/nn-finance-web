import React from 'react'
import { faArrowRightToBracket, faCircleUser, faCogs, faSun as faModeDark } from '@fortawesome/free-solid-svg-icons'
import { loadingObserver, redirectObserver, observer } from '@/@core/domain/observer'
import { useUserStore } from '@/@core/framework/store'
import { themeService } from '@/@core/service/themeService'
import { Icon } from '@/@core/presentation/shared/ui'
import { appCookie } from '@/@core/infra/memory'

export const MenuFooter: React.FC = () => {
  const useStore = useUserStore()

  const signOut = React.useCallback(async () => {
    await observer.publish(loadingObserver(true))

    appCookie.down()

    await new Promise((res) => setTimeout(res, 750))

    await observer.publish(redirectObserver('/auth/signIn'))

    await observer.publish(loadingObserver(false))
  }, [])

  return (
    <div className='mt-auto py-2 px-1 mx-2 border-t-[1px] border-t-gray-50'>
      <div className='mb-3 bg-white/10 px-2 py-1 lg:py-2'>
        <span className='leading-none text-xs text-gray-700 dark:text-zinc-200 mr-1'>Olá</span>
        <span className='leading-none text-lg text-gray-700 dark:text-zinc-200'>{useStore.data.name}</span>
      </div>

      <div className='p-0 m-0 flex items-center justify-between gap-1'>
        <button
          className='p-1 lg:py-2 bg-white/10'
          onClick={() => {
            observer.publish(redirectObserver('/user/profile'))
          }}>
          <Icon icon={faCircleUser} className='w-6' />
        </button>

        <button
          className='p-1 lg:py-2 bg-white/10'
          onClick={() => {
            observer.publish(redirectObserver('/settings'))
          }}>
          <Icon icon={faCogs} className='w-6' />
        </button>

        <button
          className='p-1 lg:py-2 bg-white/10'
          onClick={() => themeService.toggleMode()}
        >
          <Icon icon={faModeDark} className='w-6' />
        </button>

        <button
          className='p-1 lg:py-2 bg-white/10'
          onClick={signOut}>
          <Icon icon={faArrowRightToBracket} className='w-6' />
        </button>
      </div>
    </div>
  )
}
