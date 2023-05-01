import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppStore } from ".."
export * from './PageFinanceExtract'
export * from './PageSettingsFinanceOrigin'
export * from './PageSettingsFinanceTag'
export * from './PageSettingsFinanceWallet'
export * from './PageSettingsFinanceWalletId'
export * from './PagePanelFinance'
export * from './Auth'
export * from './Finance'
export * from './Layout'
export * from './System'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector
