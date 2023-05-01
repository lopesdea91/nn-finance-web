import { http } from "@/@core/infra/http"
import { SystemStore } from "@/store/hook"
import { PageSettingsFinanceOriginStore } from "@/store/hook/PageSettingsFinanceOrigin"
import { FinanceOriginSearch } from "@/types/entities/finance-origin"

export const SettingsFinanceOriginMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceOriginStore = PageSettingsFinanceOriginStore()

  async function getItems(args: { search?: Partial<FinanceOriginSearch> } = { search: {} }) {
    try {
      systemStore.loadingStart()

      const { data } = await http.financeOrigin.page({
        ...pageSettingsFinanceOriginStore.state.search,
        ...args.search
      })

      pageSettingsFinanceOriginStore.setList(data)

      pageSettingsFinanceOriginStore.setSearch({
        page: data.page,
      })

    } catch (error) {
      console.log('... error getItems', error);

    } finally {
      systemStore.loadingEnd()
    }
  }

  function onChangeSearch(values: Partial<FinanceOriginSearch>) {
    pageSettingsFinanceOriginStore.setSearch(values)
  }

  function resetSearch() {
    pageSettingsFinanceOriginStore.setSearch({
      _limit: 15,
      _q: '',
      page: 1,
      enable: 1,
      type_id: null,
      wallet_id: null,
      parent_id: null
    })
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch
  }
}