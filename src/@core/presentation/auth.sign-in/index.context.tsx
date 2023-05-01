import React, { createContext } from "react";

export interface AuthSignInContext { }

export const authSignInContext = createContext({} as AuthSignInContext)

export const AuthSignInProvider = (
  { children, value }: { children: React.ReactNode, value: AuthSignInContext }
) => {
  return (
    <authSignInContext.Provider value={value}>
      {children}
    </authSignInContext.Provider>
  )
}