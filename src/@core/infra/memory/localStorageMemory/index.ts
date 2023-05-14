import { MemoryImplements } from "..";

type KeysType = ''
type OptionsType = {}

export default class LocalStorageMemory implements MemoryImplements<KeysType, OptionsType> {
  public init() { }
  public reset() { }
  public get(key: KeysType, options: OptionsType = {}): string {
    return ''
  }
  public set(key: KeysType, value: string) { }
}