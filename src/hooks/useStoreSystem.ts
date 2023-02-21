import { actionsSystemSlice } from '@/store/features/system/systemSlice'
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
  const dispatchLoadingStart = () => {
    dispatch(actionsSystemSlice.setloading(true))
  }
  const dispatchLoadingEnd = () => {
    dispatch(actionsSystemSlice.setloading(false))
  }

  return {
    systemState,
    dispatchSetPeriod,
    dispatchSetWalletPanelId,
    dispatchToggleMenu,
    dispatchOpenMenu,
    dispatchCloseMenu,
    dispatchLoadingStart,
    dispatchLoadingEnd
  }
}