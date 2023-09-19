import { ITeleportType } from '@/types/system'
import { ObserverPublish, ObserverSubscribe } from './ObserverAbstract'

type IActions = 'add' | 'remove'

type TeleportObserverData = { type: ITeleportType; el: React.ReactNode }

export class TeleportObserverSubscribe implements ObserverSubscribe {
  // readonly name = 'setup.teleport'
  constructor(readonly name: IActions, readonly callback: (p: TeleportObserverData) => void) {}
}

export class TeleportObserverPublish implements ObserverPublish {
  // readonly name = 'setup.teleport'
  constructor(readonly name: IActions, readonly data: TeleportObserverData) {}
}
