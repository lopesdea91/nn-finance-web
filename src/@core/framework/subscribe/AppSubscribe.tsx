import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTeleportHook, useWindowSizeHook } from '@/@core/framework/hook'
import { observer } from '@/@core/domain/observer'
import { loadingObserver, redirectObserver, toggleMenuObserver } from '@/@core/domain/observer/AppObserver'
import { TeleportObserverSubscribe } from '@/@core/domain/observer/TeleportObserver'
import { themeLocalStorage } from '@/@core/infra/memory/localstorage'
import { useAppStore } from '../store/useAppStore'
import { themeService } from '@/@core/service/themeService'

export const AppSubscribe = () => {
  const router = useRouter()
  const pathname = usePathname()
  const windowSizeHook = useWindowSizeHook()
  const teleportHook = useTeleportHook()
  const appStore = useAppStore()

  /** methods */
  const handleDarkMode = React.useCallback((ev: KeyboardEvent) => {
    if (ev.altKey && ev.code === 'KeyT') {

      let mode: 'light' | 'dark' = 'light'

      if (themeService.currentMode() === 'dark') {
        themeService.setModeLight()
        mode = 'light'
      } else {
        themeService.setModeDark()
        mode = 'dark'
      }

      themeLocalStorage.set(mode)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const keyDowm = React.useCallback(((ev: KeyboardEvent) => {
    handleDarkMode(ev)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  /** keydown */
  const keydownUp = () => {
    document.body.addEventListener('keydown', keyDowm)
    return () => {
      document.body.removeEventListener('keydown', keyDowm)
    }
  }

  /** redirect */
  const appRedirectUp = () => {
    let down: Function
    observer.subscribe(redirectObserver(router.push)).then(d => down = d)
    
    return () => down()
  }
  const appLoadingUp = () => {
    const unsubscribeLoading = observer.subscribe(loadingObserver(appStore.setLoading))
    return () => {
      unsubscribeLoading.then(down => down())
    }
  }
  /** teleport */
  const teleportUp = () => {
    const unsubscribeAddTeleport = observer.subscribe(new TeleportObserverSubscribe('add', (payload) => {
      teleportHook.addTeleport(payload)
    }))
    const unsubscribeRmoveTeleport = observer.subscribe(new TeleportObserverSubscribe('remove', (payload) => {
      teleportHook.removeTeleport(payload)
    }))

    return () => {
      unsubscribeAddTeleport.then(down => down())
      unsubscribeRmoveTeleport.then(down => down())
    }
  }
  /** themeLocalStorage */
  const themeInit = () => {
    const mode = themeLocalStorage.get()

    const { classList } = document.documentElement

    classList.add(mode)
  }

  /** methods up */
  React.useEffect(() => {
    const keydownDown = keydownUp()
    const appRedirectDown = appRedirectUp()
    const teleportDown = teleportUp()

    themeInit()
    appLoadingUp()

    return () => {
      keydownDown()
      appRedirectDown()
      teleportDown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** windowSize.width <= 1280 */
  React.useEffect(() => {
    if (windowSizeHook.width <= 1280)
      observer.publish(toggleMenuObserver('close'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}
