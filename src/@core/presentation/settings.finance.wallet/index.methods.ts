import { http } from "@/@core/infra/http"
import { PageSettingsFinanceWalletStore, SystemStore } from "@/store/hook"
import { FinanceWalletSearch } from "@/types/entities/finance-wallet"

export const SettingsFinanceWalletMethods = () => {
  const systemStore = SystemStore()
  const pageSettingsFinanceWalletStore = PageSettingsFinanceWalletStore()

  async function getItems(args: { search?: Partial<FinanceWalletSearch> } = { search: {} }) {
    systemStore.loadingStart()

    const { error, data } = await http.financeWallet.page({
      ...pageSettingsFinanceWalletStore.state.search,
      ...args.search
    })

    if (error) {
      systemStore.loadingEnd()

      return console.log('... error getItems', error);
    }

    pageSettingsFinanceWalletStore.setList({
      items: data.items,
      lastPage: data.lastPage,
      total: data.total
    })

    pageSettingsFinanceWalletStore.setSearch({
      page: data.page,
    })

    systemStore.loadingEnd()
  }
  function onChangeSearch(values: Partial<FinanceWalletSearch>) {
    pageSettingsFinanceWalletStore.setSearch(values)
  }
  function resetSearch() {
    pageSettingsFinanceWalletStore.setSearch({
      _limit: 15,
      _q: '',
      // page: 1,
      enable: 1,
      panel: 0,
    })
  }

  return {
    getItems,
    onChangeSearch,
    resetSearch
  }
}