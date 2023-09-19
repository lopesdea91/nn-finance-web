import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/--- old/index-old'

const ReduxProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ReduxProvider
