import { ParsedUrlQuery } from 'querystring'

export const checkParamIdIsNew = (params: ParsedUrlQuery | undefined): boolean => {
  return params?.id === 'new' ? true : false
}

export const checkParamIdSSR = (params: ParsedUrlQuery | undefined): boolean => {
  return params?.id && !Number.isInteger(+params?.id) ? true : false
}
