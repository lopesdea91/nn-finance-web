import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsSystemSlice } from "@/store/features/system"
import { $memory } from "@/@core/infra/memory"

export const SystemStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.system)

  function setPeriod(value: string) {
    $memory.cookie.set('period', value)

    dispatch(actionsSystemSlice.setPeriod(value))
  }
  function setWalletPanelId(value: number) {
    $memory.cookie.set('walletPanelId', String(value))

    dispatch(actionsSystemSlice.setWalletPanelId(value))
  }
  function loadingPageStart() {
    dispatch(actionsSystemSlice.setloadingPage(true))
  }
  function loadingPageEnd() {
    dispatch(actionsSystemSlice.setloadingPage(false))
  }
  function loadingStart() {
    dispatch(actionsSystemSlice.setloading(true))
  }
  function loadingEnd() {
    dispatch(actionsSystemSlice.setloading(false))
  }
  function toggleMenu() {
    dispatch(actionsSystemSlice.setMenu(!state.menu))
  }
  function openMenu() {
    dispatch(actionsSystemSlice.setMenu(true))
  }
  function closeMenu() {
    dispatch(actionsSystemSlice.setMenu(false))
  }

  return {
    state,
    setPeriod,
    setWalletPanelId,
    loadingPageStart,
    loadingPageEnd,
    loadingStart,
    loadingEnd,
    toggleMenu,
    openMenu,
    closeMenu,
  }
}