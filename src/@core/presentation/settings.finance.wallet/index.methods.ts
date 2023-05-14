import { http } from "@/@core/infra/http"
import { SystemStore, PageSettingsFinanceWalletStore } from "@/store/hook"
import { _limitApi } from "@/types/enum"
import { IPageSettingsFinanceWalletFormSearch } from "@/types/pages/SettingsFinanceWallet"

interface IGetItems {
  page?: number
  limit?: number
}
interface IOnChangeSearch extends Partial<IPageSettingsFinanceWalletFormSearch> { }

export const SettingsFinanceWalletMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceWalletStore = PageSettingsFinanceWalletStore()

  const getItems = async (search: IGetItems = {}) => {
    systemStore.loadingStart()

    const { formSearch, table } = pageSettingsFinanceWalletStore.state

    const { error, data } = await http.financeWallet.page({
      _q: formSearch.query,
      enable: formSearch.enable,
      panel: formSearch.panel,
      _limit: (search.limit || table.limit) as _limitApi,
      page: search.page || table.page,
    })

    if (error) {
      systemStore.loadingEnd()
      return console.log('... error getItems', error);
    }

    pageSettingsFinanceWalletStore.setTable({
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    })

    systemStore.loadingEnd()
  }
  const onChangeSearch = (values: IOnChangeSearch) => {
    pageSettingsFinanceWalletStore.setFormSearch(values)
  }
  const resetSearch = () => {
    pageSettingsFinanceWalletStore.setFormSearch({
      query: '',
      enable: 1,
      panel: 0,
    })
  }
  const onChangePage = (value: number) => {
    pageSettingsFinanceWalletStore.setTablePage(value)
  }
  const onChangeLimit = (value: _limitApi) => {
    pageSettingsFinanceWalletStore.setTableLimit(value)
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch,
    onChangePage,
    onChangeLimit,
  }
}