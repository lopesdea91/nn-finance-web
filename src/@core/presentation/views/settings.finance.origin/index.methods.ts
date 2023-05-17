import { http } from "@/@core/infra/http"
import { SystemStore, PageSettingsFinanceOriginStore } from "@/store/hook"
import { _limitApi } from "@/types/enum"
import { IPageSettingsFinanceOriginFormSearch } from "@/types/pages/SettingsFinanceOrigin"

interface IGetItems {
  page?: number
  limit?: number
}
interface IOnChangeSearch extends Partial<IPageSettingsFinanceOriginFormSearch> { }

export const SettingsFinanceOriginMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceOriginStore = PageSettingsFinanceOriginStore()

  const getItems = async (search: IGetItems = {}) => {
    systemStore.loadingStart()

    const { formSearch, table } = pageSettingsFinanceOriginStore.state

    const { error, data } = await http.financeOrigin.page({
      _q: formSearch.query,
      enable: formSearch.enable,
      parent_id: formSearch.parent_id,
      type_id: formSearch.type_id,
      wallet_id: formSearch.wallet_id,
      _limit: (search.limit || table.limit) as _limitApi,
      page: search.page || table.page,
    })

    if (error) {
      systemStore.loadingEnd()
      return console.log('... error getItems', error);
    }

    pageSettingsFinanceOriginStore.setTable({
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    })

    systemStore.loadingEnd()
  }
  const onChangeSearch = (values: IOnChangeSearch) => {
    pageSettingsFinanceOriginStore.setFormSearch(values)
  }
  const resetSearch = () => {
    pageSettingsFinanceOriginStore.setFormSearch({
      query: '',
      enable: 1,
      type_id: [],
      wallet_id: null,
      parent_id: null
    })
  }
  const onChangePage = (value: number) => {
    pageSettingsFinanceOriginStore.setTablePage(value)
  }
  const onChangeLimit = (value: _limitApi) => {
    pageSettingsFinanceOriginStore.setTableLimit(value)
  }


  return {
    getItems,
    onChangeSearch,
    resetSearch,
    onChangePage,
    onChangeLimit,
  }
}