import { useEffect, useState } from "react"
import { $cookie } from "@/utils"

interface usePageSearchCookieProps<S> {
  key: string
  search: S
  initialSearch: S
}

export const usePageSearchCookie = <S>(props: usePageSearchCookieProps<S>) => {
  const [search, setSearch] = useState<S>(props.search)

  const setCookieSearch = (value: Partial<S>) => {
    $cookie.set({
      key: props.key,
      value: JSON.stringify(value),
      options: {
        path: window.location.pathname
      }
    })
  }
  // const getCookieSearch = (): Partial<S> => {
  //   const searchCoockie = $cookie.get<string>({ key: props.key })
  //   return searchCoockie ? JSON.parse(searchCoockie) : {}
  // }
  const onChangeSearch = (value: Partial<S>) => {
    const newSearch: S = { ...search, ...value }
    setSearch(newSearch)
  }
  const resetSearch = () => {
    setCookieSearch(props.initialSearch)
    setSearch(props.initialSearch)
  }
  // const handler = () => {
  //   const searchCoockie = getCookieSearch() as S

  //   const newSearch = {
  //     ...props.search,
  //     ...searchCoockie,
  //   }

  //   setCookieSearch(newSearch)
  // }

  // useEffect(() => {
  //   handler()
  // }, [])

  return {
    search,
    onChangeSearch,
    setCookieSearch,
    resetSearch
  }
}
