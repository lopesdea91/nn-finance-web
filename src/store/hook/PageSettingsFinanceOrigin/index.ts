import { $memory } from "@/@core/infra/memory"
import { actionsPageSettingsFinanceOrigin } from "@/store/feturesPage/settings.financeOrigin"
import { ReducerPayloadProps } from "@/store/feturesPage/settings.financeOrigin/reducers"
import { useAppDispatch, useAppSelector } from "@/store/hook"

export const PageSettingsFinanceOriginStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceOrigin)

  function setFormSearch(value: Partial<ReducerPayloadProps['setFormSearch']>) {
    const newSearch: ReducerPayloadProps['setFormSearch'] = {
      ...state.formSearch,
      ...value,
    }

    $memory.cookie.set('financeOriginFormSearch', JSON.stringify(newSearch))

    dispatch(actionsPageSettingsFinanceOrigin.setFormSearch(newSearch))
  }

  function setTable(values: ReducerPayloadProps['setTable']) {
    $memory.cookie.set('financeOriginTable', JSON.stringify({
      items: [],
      limit: values.limit,
      total: values.total,
      page: values.page
    }))

    dispatch(actionsPageSettingsFinanceOrigin.setTable({
      items: values.items,
      limit: values.limit,
      total: values.total,
      page: values.page,
    }))
  }

  function setTablePage(value: ReducerPayloadProps['setTable']['page']) {
    $memory.cookie.set('financeOriginTable', JSON.stringify({
      items: [],
      limit: state.table.limit,
      total: state.table.total,
      page: value
    }))

    dispatch(actionsPageSettingsFinanceOrigin.setTablePage(value))
  }

  function setTableLimit(value: ReducerPayloadProps['setTable']['limit']) {
    $memory.cookie.set('financeOriginTable', JSON.stringify({
      items: [],
      limit: value,
      total: state.table.total,
      page: state.table.page
    }))

    dispatch(actionsPageSettingsFinanceOrigin.setTableLimit(value))
  }

  return {
    state,
    setFormSearch,
    setTable,
    setTablePage,
    setTableLimit,
  }
}