import { cookiesName } from "@/constants"
import { FinanceWallet, FinanceWalletSearch } from "@/types/entities/finance-wallet"
import { $cookie } from "@/utils"
import { useAppDispatch, useAppSelector } from "."
import { actionsPageSettingsFinanceWallet } from "../feturesPage/settings.financeWallet"

export const PageSettingsFinanceWalletStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceWallet)

  function setList(value: { items: FinanceWallet[], total: number, lastPage: number }) {
    dispatch(actionsPageSettingsFinanceWallet.setList({
      items: value.items,
      total: value.total,
      lastPage: value.lastPage
    }))
  }

  function setSearch(value: Partial<FinanceWalletSearch>) {
    const newSearch = {
      ...state.search,
      ...value,
    }

    $cookie.setSearchPage({
      searchKey: cookiesName.financeWalletSearch,
      value: JSON.stringify(newSearch)
    })

    dispatch(actionsPageSettingsFinanceWallet.setSearch(newSearch))
  }

  return { state, setList, setSearch }
}