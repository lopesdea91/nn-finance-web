import { useAppDispatch, useAppSelector } from "@/store/hook"
import { $cookie } from "@/utils"
import { actionsPageSettingsFinanceWalletId } from "@/store/feturesPage/settingsFinanceWalletId"

export const PageSettingsFinanceWalletIdStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceWalletId)

  function setTab(value: number) {
    $cookie.set({
      key: 'pageSettingsFinanceWalletId',
      value: JSON.stringify({
        tab: value
      }),
      options: {
        path: '/'
      },
    })

    dispatch(actionsPageSettingsFinanceWalletId.setTab(value))
  }

  return {
    state,
    setTab
  }
}