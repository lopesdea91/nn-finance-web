import { actionsFinanceSlice } from '@/store/features/finance/financeSlice'
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { FinanceWallet } from '@/types/entities/finance-wallet'
import { FinanceOrigin } from '@/types/entities/finance-origin'
import { FinanceTag } from '@/types/entities/finance-tag'
import { FinanceOriginType } from '@/types/entities/finance-originType'
import { FinanceType } from '@/types/entities/finance-type'
import { FinanceStatus } from '@/types/entities/finance-status'
import { FinanceExtractFormSearchFields } from '@/types/form/financeExtract'
import { FinanceWalletFormSearchFields } from '@/types/form/settingsFinanceWallet'
import { FinanceTagFormSearchFields } from '@/types/form/settingsFinanceTag'
import { FinanceOriginFormSearchFields } from '@/types/form/settingsFinanceOrigin'
import { useStoreSystem } from './useStoreSystem'

const mergeSearch = <F>(old: F, part: Partial<F>) => {
  const newObj = JSON.parse(JSON.stringify(old))
  const obj = part

  Object.keys(obj).forEach((key) => {
    const newValue = obj[key as keyof F]
    if (typeof newValue == 'string' && !newValue) {
      delete newObj[key]
    } else {
      newObj[key] = newValue
    }
  });

  return newObj
}

export const useStoreFinance = () => {
  const dispatch = useAppDispatch()

  const financeState = useAppSelector(e => e.finance)

  const dispatchSetFinanceWallet = (value: FinanceWallet[]) => {
    dispatch(actionsFinanceSlice.setWallet(value))
  }

  const dispatchSetFinanceOrigin = (value: FinanceOrigin[]) => {
    dispatch(actionsFinanceSlice.setOrigin(value))
  }

  const dispatchSetFinanceTag = (value: FinanceTag[]) => {
    dispatch(actionsFinanceSlice.setTag(value))
  }

  const dispatchSetFinanceList = (value: {
    originType: FinanceOriginType[],
    type: FinanceType[],
    status: FinanceStatus[],
  }) => {
    dispatch(actionsFinanceSlice.setLists(value))
  }

  return {
    financeState,
    dispatchSetFinanceWallet,
    dispatchSetFinanceOrigin,
    dispatchSetFinanceTag,
    dispatchSetFinanceList,
  }
}
export const useStoreFinanceWalletSearch = () => {
  const dispatch = useAppDispatch()
  const walletSearch = useAppSelector(e => e.finance.walletSearch)

  const onChangeSearch = (value: Partial<FinanceWalletFormSearchFields>) => {
    dispatch(actionsFinanceSlice.setWalletSearch(
      mergeSearch<FinanceWalletFormSearchFields>(walletSearch, value)
    ))
  }
  const setWalletSearch = (value: FinanceWalletFormSearchFields) => {
    dispatch(actionsFinanceSlice.setWalletSearch(value))
  }
  const resetWalletSearch = () => {
    dispatch(actionsFinanceSlice.setWalletSearch({
      _total: 0,
      _limit: 15,
      _q: '',
      page: 1,
      enable: 1,
      panel: 1,
    }))
  }

  return {
    walletSearch,
    setWalletSearch,
    resetWalletSearch,
    onChangeSearch,
  }
}
export const useStoreFinanceOriginSearch = () => {
  const dispatch = useAppDispatch()
  const originSearch = useAppSelector(e => e.finance.originSearch)
  const { systemState } = useStoreSystem()

  const onChangeSearch = (value: Partial<FinanceOriginFormSearchFields>) => {
    dispatch(actionsFinanceSlice.setOriginSearch(
      mergeSearch<FinanceOriginFormSearchFields>(originSearch, value)
    ))
  }
  const setOriginSearch = (value: FinanceOriginFormSearchFields) => {
    dispatch(actionsFinanceSlice.setOriginSearch(value))
  }
  const resetOriginSearch = () => {
    dispatch(actionsFinanceSlice.setOriginSearch({
      _total: 0,
      _limit: 15,
      _q: '',
      page: 1,
      enable: 1,
      type_id: [],
      parent_id: null,
      wallet_id: systemState.walletPanelId
    }))
  }

  return {
    originSearch,
    setOriginSearch,
    resetOriginSearch,
    onChangeSearch,
  }
}
export const useStoreFinanceTagSearch = () => {
  const dispatch = useAppDispatch()
  const tagSearch = useAppSelector(e => e.finance.tagSearch)
  const { systemState } = useStoreSystem()

  const onChangeSearch = (value: Partial<FinanceTagFormSearchFields>) => {
    dispatch(actionsFinanceSlice.setTagSearch(
      mergeSearch<FinanceTagFormSearchFields>(tagSearch, value)
    ))
  }
  const setTagSearch = (value: FinanceTagFormSearchFields) => {
    dispatch(actionsFinanceSlice.setTagSearch(value))
  }
  const resetTagSearch = () => {
    dispatch(actionsFinanceSlice.setTagSearch({
      _total: 0,
      _limit: 15,
      _q: '',
      page: 1,
      enable: 1,
      type_id: 1,
      wallet_id: systemState.walletPanelId
    }))
  }

  return {
    tagSearch,
    setTagSearch,
    resetTagSearch,
    onChangeSearch,
  }
}
export const useStoreFinanceExtractSearch = () => {
  const dispatch = useAppDispatch()
  const extractSearch = useAppSelector(e => e.finance.extractSearch)
  const { systemState } = useStoreSystem()

  const onChangeSearch = (value: Partial<FinanceExtractFormSearchFields>) => {
    dispatch(actionsFinanceSlice.setExtractSearch(
      mergeSearch<FinanceExtractFormSearchFields>(extractSearch, value)
    ))
  }
  const setExtractSearch = (value: FinanceExtractFormSearchFields) => {
    dispatch(actionsFinanceSlice.setExtractSearch(value))
  }
  const resetExtractSearch = () => {
    dispatch(actionsFinanceSlice.setExtractSearch({
      type_preveiw: 'extract',
      _total: 0,
      _limit: 15,
      _q: '',
      page: 1,
      enable: 1,
      status: 1,
      type_id: null,
      origin_id: null,
      tag_ids: null,
      wallet_id: systemState.walletPanelId
    }))
  }

  return {
    extractSearch,
    setExtractSearch,
    resetExtractSearch,
    onChangeSearch,
  }
}