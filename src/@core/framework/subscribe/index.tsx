import React from 'react'

import { AppSubscribe } from './AppSubscribe';
import { CookieSubscribe } from './CookieSubscribe';
import { StoreSubscribe } from './StoreSubscribe';

export const AppSubscribed = () => {
  return (
    <>
      <AppSubscribe />
      <CookieSubscribe />
      <StoreSubscribe />
    </>
  )
}