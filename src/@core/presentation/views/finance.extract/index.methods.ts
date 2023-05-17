import { useCallback } from "react"
import { http } from "@/@core/infra/http"
import { PageFinanceExtractStore, SystemStore } from "@/store/hook"
import { IPageFinanceExtractFormSearch } from "@/types/pages/FinanceExtract"
import { FinanceTypeId, _limitApi } from "@/types/enum"

interface IGetItems {
  period?: string
  wallet_id?: number | null
  page?: number
  limit?: number
}
interface IOnChangeSearch extends Partial<IPageFinanceExtractFormSearch> { }

export const FinanceExtractMethods = () => {
  const systemStore = SystemStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  const getItems = async (search: IGetItems = { wallet_id: null }) => {
    systemStore.loadingStart()

    const { formSearch, table } = pageFinanceExtractStore.state

    const { error, data } = await http.financeItem.page({
      /** formSearch */
      _q: formSearch.query,
      enable: formSearch.enable,
      status_id: formSearch.status_id,
      type_id: formSearch.type_id as FinanceTypeId,
      origin_id: formSearch.origin_id,
      tag_ids: formSearch.tag_ids,
      type_preveiw: formSearch.type_preveiw,
      /** table */
      _limit: (search.limit || table.limit) as _limitApi,
      page: search.page || table.page,
      /** others */
      period: search.period || systemStore.state.period,
      wallet_id: (search.wallet_id || systemStore.state.walletPanelId) as number,
    })

    if (error) {
      systemStore.loadingEnd()
      return console.log('... error getItems', error);
    }

    pageFinanceExtractStore.setTable({
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    })

    systemStore.loadingEnd()
  }
  const onChangeSearch = (values: IOnChangeSearch) => {
    pageFinanceExtractStore.setFormSearch(values)
  }
  const resetSearch = () => {
    pageFinanceExtractStore.setFormSearch({
      query: '',
      enable: 1,
      origin_id: null,
      type_id: null,
      tag_ids: []
    })
  }
  const onChangePage = (value: number) => {
    pageFinanceExtractStore.setTablePage(value)
  }
  const onChangeLimit = (value: _limitApi) => {
    pageFinanceExtractStore.setTableLimit(value)
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch,
    onChangePage,
    onChangeLimit,
  }
}