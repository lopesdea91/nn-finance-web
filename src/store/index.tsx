import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import featureSystem from './features/system/systemSlice'
import featureLayout from './features/layout/layoutSlice'

const store = configureStore({
    reducer: {
        system: featureSystem,
        layout: featureLayout
    }
})

export type RootState = ReturnType<typeof store.getState>

export const ProviderStore = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}