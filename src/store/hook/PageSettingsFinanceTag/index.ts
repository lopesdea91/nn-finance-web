import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsPageSettingsFinanceTag } from "@/store/feturesPage/settings.financeTag"
import { setListAction, setSearchAction } from "@/store/feturesPage/settings.financeTag/reducers"
import { $cookie } from "@/utils"
import { cookiesName } from "@/constants"

export const PageSettingsFinanceTagStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceTag)

  function setSearch(values: setSearchAction) {
    const newSearch = {
      ...state.search,
      ...values
    }

    $cookie.setSearchPage({
      searchKey: cookiesName.financeTagSearch,
      value: JSON.stringify(newSearch)
    })

    dispatch(actionsPageSettingsFinanceTag.setSearch(newSearch))
  }

  function setList(values: setListAction) {
    dispatch(actionsPageSettingsFinanceTag.setList(values))
  }

  return {
    state,
    setSearch,
    setList
  }
}