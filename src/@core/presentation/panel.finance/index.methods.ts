import { http } from "@/@core/infra/http"
import { FinanceStore, PagePanelFinanceStore, SystemStore } from "@/store/hook"
import { useCallback } from "react"

export const PanelFinanceMethods = () => {
  const systemStore = SystemStore()
  const financeStore = FinanceStore()
  const pagePanelFinance = PagePanelFinanceStore()

  const getItems = useCallback(async () => {
    systemStore.loadingPageStart()

    const { data } = await http.financeWallet
      .consolidateMonth({
        period: systemStore.state.period,
        wallet_id: Number(systemStore.state.walletPanelId)
      })

    systemStore.loadingPageEnd()

    data.composition.map(el => {
      const find = financeStore.state.tag.find(e => e.id === Number(el.tag_id))
      el.tag_description = find?.description as string
      return el
    })

    pagePanelFinance.setData(data)
  }, [systemStore.state.period, systemStore.state.walletPanelId])

  const processConsolidateMonth = useCallback(async () => {
    systemStore.loadingPageStart()

    await http.financeWallet
      .processConsolidateMonth({
        period: systemStore.state.period,
        wallet_id: Number(systemStore.state.walletPanelId)
      })

    systemStore.loadingPageEnd()
  }, [systemStore.state.period, systemStore.state.walletPanelId])

  // async function handleClick(values: Partial<FinanceExtractFormSearchFields>) {
  //   const newSearch: FinanceExtractFormSearchFields = {
  //     ...pageFinanceExtractStore.state.search,
  //     ...values,
  //     page: 1,
  //     enable: 1,
  //     _q: '',
  //     _limit: 30,
  //     type_preveiw: 'extract'
  //   }

  //   pageFinanceExtractStore.setSearch(newSearch)

  //   router.push('/finance/extract')
  // }

  return {
    getItems,
    processConsolidateMonth
  }
}