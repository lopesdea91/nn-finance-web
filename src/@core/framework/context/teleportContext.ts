import { createContext, ReactNode } from 'react'
import { ITeleportType } from '@/types/system'

interface ITeleportContext {
  teleportMap: Map<ITeleportType, ReactNode>
  addTeleport: (p: { type: ITeleportType; el: ReactNode }) => void
  removeTeleport: (p: { type: ITeleportType }) => void
}

export const TeleportContext = createContext({} as ITeleportContext)
