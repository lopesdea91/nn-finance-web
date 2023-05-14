import { parseCookies, setCookie, destroyCookie } from "nookies"
import { CookieSerializeOptions } from "cookie"
import { MemoryImplements } from "..";
import { ContextSSR } from "@/types/system";
import { FinanceOriginFormSearchFields } from "@/types/form/settingsFinanceOrigin";
import { FinanceTagFormSearchFields } from "@/types/form/settingsFinanceTag";
import { IPageFinanceExtractFormSearch, IPageFinanceExtractTable } from "@/types/pages/FinanceExtract";
import { IPageSettingsFinanceWalletFormSearch, IPageSettingsFinanceWalletTable } from "@/types/pages/SettingsFinanceWallet";
import { IPageSettingsFinanceOriginTable } from "@/types/pages/SettingsFinanceOrigin";
import { IPageSettingsFinanceTagFormSearch, IPageSettingsFinanceTagTable } from "@/types/pages/SettingsFinanceTag";

type KeysType = 'data_user' | 'period' | 'walletPanelId' | 'token'
  | 'financeWalletFormSearch'
  | 'financeWalletTable'
  | 'financeOriginFormSearch'
  | 'financeOriginTable'
  | 'financeTagFormSearch'
  | 'financeTagTable'
  //
  | 'financeExtractTable'
  | 'financeExtractFormSearch'

type OptionsType = {
  jsonParse?: boolean
}

export default class CookieMemory implements MemoryImplements<KeysType, OptionsType> {
  private ctxLocal: ContextSSR | undefined

  public setContext(ctx: ContextSSR) {
    this.ctxLocal = ctx
  }

  public init() {
    this.set('financeWalletFormSearch', JSON.stringify(financeWalletFormSearch))
    this.set('financeWalletTable', JSON.stringify(financeWalletTable))
    this.set('financeOriginFormSearch', JSON.stringify(financeOriginFormSearch))
    this.set('financeOriginTable', JSON.stringify(financeOriginTable))
    this.set('financeTagFormSearch', JSON.stringify(financeTagFormSearch))
    this.set('financeTagTable', JSON.stringify(financeTagTable))
    //
    this.set('financeExtractFormSearch', JSON.stringify(financeExtractFormSearch))
    this.set('financeExtractTable', JSON.stringify(financeExtractTable))
  }

  public reset() {
    const keys: KeysType[] = [
      'financeWalletFormSearch',
      'financeWalletTable',
      'financeOriginFormSearch',
      'financeOriginTable',
      'financeTagFormSearch',
      'financeTagTable',
      //
      'financeExtractFormSearch',
      'financeExtractTable',
    ]

    keys.forEach((key) => destroyCookie(undefined, key))

    destroyCookie(undefined, 'period')
    destroyCookie(undefined, 'data_user')
    destroyCookie(undefined, 'token')
    destroyCookie(undefined, 'walletPanelId')
  }

  public get<T>(key: KeysType, { jsonParse }: OptionsType = {}) {
    let value = ''

    value = parseCookies(this.ctxLocal)[key]

    if (value && jsonParse) {
      value = JSON.parse(value)
    }

    return value as T
  }

  public set(key: KeysType, value: string) {
    const options: CookieSerializeOptions = {
      path: '/'
    }

    return setCookie(
      this.ctxLocal,
      key,
      value,
      options
    )
  }
}

const financeWalletFormSearch: IPageSettingsFinanceWalletFormSearch = {
  query: '',
  enable: 1,
  panel: 0,
}
const financeWalletTable: IPageSettingsFinanceWalletTable = {
  items: [],
  total: 0,
  page: 0,
  limit: 15,
}
const financeOriginFormSearch: FinanceOriginFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 1,
  enable: 1,
  type_id: null,
  wallet_id: null,
  parent_id: null
}
const financeOriginTable: IPageSettingsFinanceOriginTable = {
  items: [],
  total: 0,
  page: 0,
  limit: 15,
}
const financeTagFormSearch: IPageSettingsFinanceTagFormSearch = {
  query: '',
  enable: 1,
  type_id: null,
  wallet_id: null,
}
const financeTagTable: IPageSettingsFinanceTagTable = {
  items: [],
  total: 0,
  page: 0,
  limit: 15,
}
// 
const financeTagSearch: FinanceTagFormSearchFields = {
  _limit: 15,
  _q: '',
  page: 0,
  enable: 1,
  type_id: null,
  wallet_id: null,
}
const financeExtractFormSearch: IPageFinanceExtractFormSearch = {
  query: '',
  enable: 1,
  status_id: 1,
  type_id: 2,
  origin_id: null,
  tag_ids: [],
  type_preveiw: 'extract',
}
const financeExtractTable: IPageFinanceExtractTable = {
  items: [],
  total: 0,
  page: 0,
  limit: 15,
}
