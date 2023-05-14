import { $memory } from "@/@core/infra/memory"
import { actionsPageFinanceExtract } from "@/store/feturesPage/finance.extract"
import { ReducerPayloadProps } from "@/store/feturesPage/finance.extract/reducers"
import { useAppDispatch, useAppSelector } from "@/store/hook"

export const PageFinanceExtractStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageFinanceExtract)

  function setFormSearch(values: Partial<ReducerPayloadProps['setFormSearch']>) {
    const newSearch: ReducerPayloadProps['setFormSearch'] = {
      ...state.formSearch,
      ...values,
    }

    $memory.cookie.set('financeExtractFormSearch', JSON.stringify(newSearch))

    dispatch(actionsPageFinanceExtract.setFormSearch(newSearch))
  }

  function setTable(values: ReducerPayloadProps['setTable']) {
    $memory.cookie.set('financeExtractTable', JSON.stringify({
      items: [],
      limit: values.limit,
      total: values.total,
      page: values.page
    }))

    dispatch(actionsPageFinanceExtract.setTable({
      items: values.items,
      limit: values.limit,
      total: values.total,
      page: values.page
    }))
  }

  function setTablePage(value: ReducerPayloadProps['setTable']['page']) {
    $memory.cookie.set('financeExtractTable', JSON.stringify({
      items: [],
      limit: state.table.limit,
      total: state.table.total,
      page: value
    }))

    dispatch(actionsPageFinanceExtract.setTablePage(value))
  }

  function setTableLimit(value: ReducerPayloadProps['setTable']['limit']) {
    $memory.cookie.set('financeExtractTable', JSON.stringify({
      items: [],
      limit: value,
      total: state.table.total,
      page: state.table.page
    }))

    dispatch(actionsPageFinanceExtract.setTableLimit(value))
  }

  return {
    state,
    setFormSearch,
    setTable,
    setTablePage,
    setTableLimit,
  }
}