import { actionsSystemSlice } from '@/store/features/system'
import { useAppDispatch, useAppSelector } from '@/store/hook'

export const useStoreSystem = () => {
  const dispatch = useAppDispatch()

  const systemState = useAppSelector(e => e.system)

  // Period
  const dispatchSetPeriod = (value: string) => {
    dispatch(actionsSystemSlice.setPeriod(value))
  }

  // WalletPanel
  const dispatchSetWalletPanelId = (value: number) => {
    dispatch(actionsSystemSlice.setWalletPanelId(value))
  }

  // Menu
  const dispatchToggleMenu = () => {
    dispatch(actionsSystemSlice.setMenu(!systemState.menu))
  }
  const dispatchOpenMenu = () => {
    dispatch(actionsSystemSlice.setMenu(true))
  }
  const dispatchCloseMenu = () => {
    dispatch(actionsSystemSlice.setMenu(false))
  }

  // loading
  const loadingStart = () => {
    dispatch(actionsSystemSlice.setloading(true))
  }
  const loadingEnd = () => {
    dispatch(actionsSystemSlice.setloading(false))
  }

  return {
    systemState,
    ...systemState,
    // isLoading,
    // period: '',
    // walletPanelId: null,
    // loading: false
    dispatchSetPeriod,
    dispatchSetWalletPanelId,
    dispatchToggleMenu,
    dispatchOpenMenu,
    dispatchCloseMenu,
    loadingStart,
    loadingEnd
  }
}