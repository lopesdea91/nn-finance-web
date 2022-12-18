import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setSettingsFinanceWallet } from '@/store/features/pages/pagesSlice'
import { FinanceWalletParams } from '@/types/entities/FinanceWallet'

export const usePageSettingsWallet = () => {
  const search = useSelector((state: RootState) => state.pages.SettingsFinanceWallet)

  const dispatch = useDispatch()

  const setSearch = (newValue: FinanceWalletParams) => {
    dispatch(
      setSettingsFinanceWallet(newValue)
    )
  }

  return {
    search,
    setSearch
  }
}