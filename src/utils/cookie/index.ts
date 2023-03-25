import { NextApiRequest, NextPageContext } from "next"
import { parseCookies, setCookie } from "nookies"
import { CookieSerializeOptions } from "cookie"
// import { $crypto } from "@/utils/crypto"

type setProps = {
  ctx?: Pick<NextPageContext, "res"> | null
  key: string
  value: string
  options?: CookieSerializeOptions
  keyCrypto?: boolean
  valueCrypto?: boolean
  jsonStringify?: boolean
}
type getProps = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
  key: string
  keyCrypto?: boolean
  valueCrypto?: boolean
  jsonParse?: boolean
}
type getAll = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
}
type getUserProps = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
}
type getSearchPageProps = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
  searchKey: string
}
type setSearchPageProps = {
  searchKey: string
  value: string
}
type getPeriodProps = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
}
type getWalletPanelIdProps = {
  ctx?: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | null | undefined
}

const set = ({ ctx, key, value, options, keyCrypto, valueCrypto }: setProps) => {
  // if (keyCrypto) {
  //   key = $crypto.encode(key)
  // }
  // if (valueCrypto) {
  //   value = $crypto.encode(value)
  // }

  return setCookie(ctx || null, key, value, options)
}
const get = <T>({ ctx, key, keyCrypto, valueCrypto, jsonParse }: getProps) => {
  const cookie = parseCookies(ctx)

  // if (!!keyCrypto) {
  //   key = $crypto.encode(key)
  // }


  let value = ''
  value = cookie[key]

  // if (value && !!valueCrypto) {
  //   value = $crypto.decode(value)
  // }

  if (value && !!jsonParse) {
    value = JSON.parse(value)
  }

  return value as T
}
const all = <T>({ ctx }: getAll = {}) => {
  const cookie = parseCookies(ctx)

  return cookie as T
}
const getUser = ({ ctx }: getUserProps) => {
  return get<{
    id: number,
    name: string
  }>({
    ctx,
    key: 'data_user',
    keyCrypto: true,
    valueCrypto: true,
    jsonParse: true
  })
}
const getSearchPage = <D>({ ctx, searchKey }: getSearchPageProps) => {
  return get<D>({
    ctx,
    // keyCrypto: true,
    key: searchKey,
    // valueCrypto: true,
    jsonParse: true
  })
}
const setSearchPage = ({ searchKey, value }: setSearchPageProps) => {
  return set({
    // keyCrypto: true,
    key: searchKey,
    // valueCrypto: true,
    value,
    options: {
      path: '/'
    }
    // jsonParse: true
  })
}
const getPeriod = ({ ctx }: getPeriodProps = {}) => {
  return get<string>({
    ctx,
    key: 'period'
  })
}
const getWalletPanelId = ({ ctx }: getWalletPanelIdProps = {}) => {
  return get<number>({
    ctx,
    key: 'walletPanelId'
  })
}

export const $cookie = {
  all, get, set,
  getUser, getSearchPage, setSearchPage, getPeriod, getWalletPanelId
}