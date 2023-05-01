import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsSystemSlice } from "@/store/features/system"
import { $cookie } from "@/utils"

export const SystemStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.system)

  function setPeriod(value: string) {
    $cookie.set({
      key: 'period',
      value: value,
      options: {
        path: '/'
      },
      // keyCrypto: true,
      // valueCrypto: true
    })

    dispatch(actionsSystemSlice.setPeriod(value))
  }
  function setWalletPanelId(value: number) {
    $cookie.set({
      key: 'walletPanelId',
      value: String(value),
      options: {
        path: '/'
      },
      // keyCrypto: true,
      // valueCrypto: true
    })

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