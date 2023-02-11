import { useStoreAuth } from '@/hooks/useStoreAuth'
import { useStoreSystem } from '@/hooks/useStoreSystem'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  const { authState, dispatchSetUser } = useStoreAuth()
  const { systemState, dispatchToggleMenu } = useStoreSystem()

  function aaa() {
    dispatchSetUser({
      email: 'email2@email.com',
      id: 2,
      name: 'anderson'
    })
  }

  return (
    <div>
      <h1>teste 2</h1>
      <button onClick={() => aaa()}>dispatchSetUser</button>
      <button onClick={() => dispatchToggleMenu()}>toggleMenu</button>
      <p>authState {JSON.stringify(authState)}</p>
      <p>systemState {JSON.stringify(systemState)}</p>
      <div>
        <Link href="/teste1">teste 1</Link>
        <Link href="/teste2">teste 2</Link>
      </div>
    </div>
  )
}
