import { $memory } from "@/@core/infra/memory"
import { actionsPageSettingsFinanceTag } from "@/store/feturesPage/settings.financeTag"
import { ReducerPayloadProps } from "@/store/feturesPage/settings.financeTag/reducers"
import { useAppDispatch, useAppSelector } from "@/store/hook"

export const PageSettingsFinanceTagStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceTag)

  function setFormSearch(value: Partial<ReducerPayloadProps['setFormSearch']>) {
    const newSearch: ReducerPayloadProps['setFormSearch'] = {
      ...state.formSearch,
      ...value,
    }

    $memory.cookie.set('financeTagFormSearch', JSON.stringify(newSearch))

    dispatch(actionsPageSettingsFinanceTag.setFormSearch(newSearch))
  }

  function setTable(values: ReducerPayloadProps['setTable']) {
    $memory.cookie.set('financeTagTable', JSON.stringify({
      items: [],
      limit: values.limit,
      total: values.total,
      page: values.page
    }))

    dispatch(actionsPageSettingsFinanceTag.setTable({
      items: values.items,
      limit: values.limit,
      total: values.total,
      page: values.page,
    }))
  }

  function setTablePage(value: ReducerPayloadProps['setTable']['page']) {
    $memory.cookie.set('financeTagTable', JSON.stringify({
      items: [],
      limit: state.table.limit,
      total: state.table.total,
      page: value
    }))

    dispatch(actionsPageSettingsFinanceTag.setTablePage(value))
  }

  function setTableLimit(value: ReducerPayloadProps['setTable']['limit']) {
    $memory.cookie.set('financeTagTable', JSON.stringify({
      items: [],
      limit: value,
      total: state.table.total,
      page: state.table.page
    }))

    dispatch(actionsPageSettingsFinanceTag.setTableLimit(value))
  }

  return {
    state,
    setFormSearch,
    setTable,
    setTablePage,
    setTableLimit,
  }
}