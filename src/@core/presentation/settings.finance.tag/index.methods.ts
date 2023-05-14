import { http } from "@/@core/infra/http"
import { SystemStore, PageSettingsFinanceTagStore } from "@/store/hook"
import { _limitApi } from "@/types/enum"
import { IPageSettingsFinanceTagFormSearch } from "@/types/pages/SettingsFinanceTag"

interface IGetItems {
  page?: number
  limit?: number
}
interface IOnChangeSearch extends Partial<IPageSettingsFinanceTagFormSearch> { }

export const SettingsFinanceTagMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()

  const getItems = async (search: IGetItems = {}) => {
    systemStore.loadingStart()

    const { formSearch, table } = pageSettingsFinanceTagStore.state

    const { error, data } = await http.financeTag.page({
      _q: formSearch.query,
      enable: formSearch.enable,
      type_id: formSearch.type_id,
      wallet_id: formSearch.wallet_id,
      _limit: (search.limit || table.limit) as _limitApi,
      page: search.page || table.page,
    })

    if (error) {
      systemStore.loadingEnd()
      return
    }

    pageSettingsFinanceTagStore.setTable({
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    })

    systemStore.loadingEnd()
  }
  const onChangeSearch = (values: IOnChangeSearch) => {
    pageSettingsFinanceTagStore.setFormSearch(values)
  }
  const resetSearch = () => {
    pageSettingsFinanceTagStore.setFormSearch({
      query: '',
      enable: 1,
      type_id: null,
      wallet_id: null,
    })
  }
  const onChangePage = (value: number) => {
    pageSettingsFinanceTagStore.setTablePage(value)
  }
  const onChangeLimit = (value: _limitApi) => {
    pageSettingsFinanceTagStore.setTableLimit(value)
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch,
    onChangePage,
    onChangeLimit,
  }
}