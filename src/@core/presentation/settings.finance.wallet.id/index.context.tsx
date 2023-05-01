import React, { createContext } from "react";

export interface SettingsFinanceWalletIdContext { }

export const SettingsFinanceWalletIdContext = createContext({} as SettingsFinanceWalletIdContext)

export const SettingsFinanceWalletIdProvider = (
  { children, value }: { children: React.ReactNode, value: SettingsFinanceWalletIdContext }
) => {
  return (
    <SettingsFinanceWalletIdContext.Provider value={value}>
      {children}
    </SettingsFinanceWalletIdContext.Provider>
  )
}
