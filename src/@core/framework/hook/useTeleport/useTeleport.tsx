import React, { DependencyList, FC, ReactNode, useContext, useEffect } from 'react'
import { ITeleportType } from '@/types/system'
import { TeleportContext } from '../../context/teleportContext'

export const useTeleportHook = () => {
  const { addTeleport, removeTeleport } = useContext(TeleportContext)

  return { addTeleport, removeTeleport, TeleportIn, TeleportOut }
}

interface TeleportInProps {
  type: ITeleportType
  children: ReactNode
  deps?: DependencyList | undefined
}
const TeleportIn: FC<TeleportInProps> = function ({ type, children, deps }) {
  const { addTeleport } = useContext(TeleportContext)

  useEffect(() => {
    addTeleport({ type, el: children })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, deps])

  return null
}

interface TeleportOutProps {
  type: ITeleportType
}
const TeleportOut: FC<TeleportOutProps> = function ({ type }) {
  const { teleportMap } = useContext(TeleportContext)

  return (teleportMap.get(type) as JSX.Element) || null
}
