import { actionsSystemSlice } from '@/store/features/system'
import { useAppDispatch, useAppSelector } from '@/store/hook'

export const useStoreSystem = () => {
  const dispatch = useAppDispatch()

  const systemState = useAppSelector(e => e.system)

  // Period
  const setPeriod = (value: string) => {
    dispatch(actionsSystemSlice.setPeriod(value))
  }

  // WalletPanel
  const setWalletPanelId = (value: number) => {
    dispatch(actionsSystemSlice.setWalletPanelId(value))
  }

  // Menu
  const toggleMenu = () => {
    dispatch(actionsSystemSlice.setMenu(!systemState.menu))
  }
  const openMenu = () => {
    dispatch(actionsSystemSlice.setMenu(true))
  }
  const closeMenu = () => {
    dispatch(actionsSystemSlice.setMenu(false))
  }

  // loading
  const loadingPageStart = () => {
    dispatch(actionsSystemSlice.setloadingPage(true))
  }
  const loadingPageEnd = () => {
    dispatch(actionsSystemSlice.setloadingPage(false))
  }

  const loadingStart = () => {
    dispatch(actionsSystemSlice.setloading(true))
  }
  const loadingEnd = () => {
    dispatch(actionsSystemSlice.setloading(false))
  }

  return {
    setPeriod,
    setWalletPanelId,
    toggleMenu,
    openMenu,
    closeMenu,
    loadingPageStart,
    loadingPageEnd,
    loadingStart,
    loadingEnd
  }
}