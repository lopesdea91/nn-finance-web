import { http } from "@/@core/infra/http"
import { SystemStore } from "@/store/hook"
import { PageSettingsFinanceTagStore } from "@/store/hook/PageSettingsFinanceTag"
import { FinanceTagSearch } from "@/types/entities/finance-tag"

export const SettingsFinanceTagMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceTagStore = PageSettingsFinanceTagStore()

  async function getItems(args: { search?: Partial<FinanceTagSearch> } = { search: {} }) {
    systemStore.loadingStart()

    const { error, data } = await http.financeTag.page({
      ...pageSettingsFinanceTagStore.state.search,
      ...args.search
    })

    if (error) {
      systemStore.loadingEnd()

      return console.log('... error getItems', error);
    }

    pageSettingsFinanceTagStore.setList({
      items: data.items,
      lastPage: data.lastPage,
      total: data.total
    })

    pageSettingsFinanceTagStore.setSearch({
      page: data.page,
    })

    systemStore.loadingEnd()
  }
  function onChangeSearch(values: Partial<FinanceTagSearch>) {
    pageSettingsFinanceTagStore.setSearch(values)
  }
  function resetSearch() {
    pageSettingsFinanceTagStore.setSearch({
      _limit: 15,
      _q: '',
      enable: 1,
      type_id: null,
      wallet_id: null,
    })
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch
  }
}