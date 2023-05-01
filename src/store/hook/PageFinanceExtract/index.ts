import { cookiesName } from "@/constants"
import { actionsPageFinanceExtract } from "@/store/feturesPage/finance.extract"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { FinanceItem } from "@/types/entities/finance-item"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"
import { $cookie } from "@/utils"

export const PageFinanceExtractStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageFinanceExtract)

  function setList(values: { items: FinanceItem[], total: number, lastPage: number }) {
    dispatch(actionsPageFinanceExtract.setList(values))
  }

  function setSearch(values: Partial<FinanceExtractFormSearchFields>) {
    const newSearch = {
      ...state.search,
      ...values,
    }

    $cookie.setSearchPage({
      searchKey: cookiesName.financeExtractSearch,
      value: JSON.stringify(newSearch)
    })

    dispatch(actionsPageFinanceExtract.setSearch(newSearch))
  }

  return { state, setList, setSearch }
}