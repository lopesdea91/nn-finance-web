import React, { ReactNode } from 'react'
import { render as renderTesting, screen } from '@testing-library/react'
import { act } from "react-dom/test-utils"
import { AppProvider } from '@/@core/framework/providers';
import { StoreSubscribe } from '@/@core/framework/subscribe/StoreSubscribe';
import { observerMock } from './store';

const renderUI = async (ui: ReactNode) => {
  const rend = renderTesting(
    <AppProvider>
      <StoreSubscribe />
      {ui}
    </AppProvider>
  )

  await observerMock()

  return rend
}

export {
  renderUI,
  screen,
  act
}
