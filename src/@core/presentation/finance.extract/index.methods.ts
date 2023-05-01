import { http } from "@/@core/infra/http"
import { PageFinanceExtractStore, SystemStore } from "@/store/hook"
import { FinanceExtractFormSearchFields } from "@/types/form/financeExtract"

export const FinanceExtractMethods = () => {
  const systemStore = SystemStore()
  const pageFinanceExtractStore = PageFinanceExtractStore()

  async function getItems(args: { search?: Partial<FinanceExtractFormSearchFields> } = { search: {} }) {
    systemStore.loadingStart()

    const { error, data } = await http.financeItem.page({
      ...pageFinanceExtractStore.state.search,
      ...args.search
    })

    if (error) {
      systemStore.loadingEnd()

      return console.log('... error getItems', error);
    }

    pageFinanceExtractStore.setList({
      items: data.items,
      lastPage: data.lastPage,
      total: data.total,
    })

    pageFinanceExtractStore.setSearch({
      _limit: data.limit,
      page: data.page,
    })

    systemStore.loadingEnd()
  }
  const onChangeSearch = (values: Partial<FinanceExtractFormSearchFields>) => {
    pageFinanceExtractStore.setSearch(values)
  }
  const resetSearch = () => {
    pageFinanceExtractStore.setSearch({
      _limit: 15,
      _q: '',
      enable: 1,
      page: 1,
      origin_id: null,
      type_id: null,
      status_id: null,
      tag_ids: []
    })
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch,
  }
}