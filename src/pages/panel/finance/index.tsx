import { LayoutStore } from '@/store/hook'
import React from 'react'

export default function index() {

  const layoutStore = LayoutStore()

  function add() {
    const id = `${(new Date).getTime()}`
    const msg = `msg ${id}`

    layoutStore.addTost([
      { id, msg, type: 'success' }
    ])
  }

  return (
    <div>
      teste

      <button onClick={add}>add toas</button>
    </div>
  )
}
