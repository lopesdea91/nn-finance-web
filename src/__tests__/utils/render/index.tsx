import { Provider } from 'react-redux'
import { render } from "@testing-library/react"
import { Action, configureStore } from "@reduxjs/toolkit"
import { reducer } from "../../../store/reducer"

export const renderWithRedux = (
  ui: React.ReactNode,
  // { initialState }: { initialState?: RootState } = {}
) => {

  const store = configureStore({
    reducer: reducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false
    //   })
    // preloadedState: initialState || preloadedStateMock
  })

  const utils = {
    dispatch: (action: Action) => store.dispatch(action),
    getState: () => store.getState()
  }

  const wrapperComponent = render(<Provider store={store}> {ui} </Provider>)

  return {
    ...wrapperComponent,
    ...utils,
  }
}