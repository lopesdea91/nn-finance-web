import { $memory } from "@/@core/infra/memory"
import { actionsPageSettingsFinanceWallet } from "@/store/feturesPage/settings.financeWallet"
import { ReducerPayloadProps } from "@/store/feturesPage/settings.financeWallet/reducers"
import { useAppDispatch, useAppSelector } from "@/store/hook"

export const PageSettingsFinanceWalletStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.pageSettingsFinanceWallet)

  function setFormSearch(value: Partial<ReducerPayloadProps['setFormSearch']>) {
    const newSearch: ReducerPayloadProps['setFormSearch'] = {
      ...state.formSearch,
      ...value,
    }

    $memory.cookie.set('financeWalletFormSearch', JSON.stringify(newSearch))

    dispatch(actionsPageSettingsFinanceWallet.setFormSearch(newSearch))
  }

  function setTable(values: ReducerPayloadProps['setTable']) {
    $memory.cookie.set('financeWalletTable', JSON.stringify({
      items: [],
      limit: values.limit,
      total: values.total,
      page: values.page
    }))

    dispatch(actionsPageSettingsFinanceWallet.setTable({
      items: values.items,
      limit: values.limit,
      total: values.total,
      page: values.page,
    }))
  }

  function setTablePage(value: ReducerPayloadProps['setTable']['page']) {
    $memory.cookie.set('financeWalletTable', JSON.stringify({
      items: [],
      limit: state.table.limit,
      total: state.table.total,
      page: value
    }))

    dispatch(actionsPageSettingsFinanceWallet.setTablePage(value))
  }

  function setTableLimit(value: ReducerPayloadProps['setTable']['limit']) {
    $memory.cookie.set('financeWalletTable', JSON.stringify({
      items: [],
      limit: value,
      total: state.table.total,
      page: state.table.page
    }))

    dispatch(actionsPageSettingsFinanceWallet.setTableLimit(value))
  }

  return {
    state,
    setFormSearch,
    setTable,
    setTablePage,
    setTableLimit,
  }
}