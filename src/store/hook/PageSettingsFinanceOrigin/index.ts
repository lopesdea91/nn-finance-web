import { actionsPageSettingsFinanceOrigin } from "@/store/feturesPage/settings.financeOrigin"
import { FinanceOrigin, FinanceOriginSearch } from "@/types/entities/finance-origin"
import { $cookie } from "@/utils"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { cookiesName } from "@/constants"

export const PageSettingsFinanceOriginStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceOrigin)

  function setList(value: { items: FinanceOrigin[], total: number, lastPage: number }) {
    dispatch(actionsPageSettingsFinanceOrigin.setList({
      items: value.items,
      total: value.total,
      lastPage: value.lastPage
    }))
  }

  function setSearch(value: Partial<FinanceOriginSearch>) {
    const newSearch = {
      ...state.search,
      ...value,
    }

    $cookie.setSearchPage({
      searchKey: cookiesName.financeOriginSearch,
      value: JSON.stringify(newSearch)
    })

    dispatch(actionsPageSettingsFinanceOrigin.setSearch(newSearch))
  }

  return { state, setList, setSearch }
}