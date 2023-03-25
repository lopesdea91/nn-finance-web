import { DependencyList, useEffect, useRef, useState } from 'react'
import { AxiosResponse } from 'axios';
import { $cookie } from '@/utils';

interface Props<D, S> {
  searchKey: string
  initialSearch: S
  defaultSearch: S
  initialItems?: D[]
  request: <D, S>(args?: {
    search?: Partial<S>;
  }) => Promise<AxiosResponse<{
    items: D[]
    page: number
    total: number
    limit: number
    lastPage: number
  }, any>>,
}
let time = 0
export const usePageList = <D, S>(props: Props<D, S>, deps: DependencyList = []) => {
  const effect = useRef<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<D[]>(props.initialItems || [])
  const [search, setSearch] = useState<S>(props.initialSearch)

  const onChangeSearch = (value: Partial<S>) => {
    const newSearch: S = { ...search, ...value }
    setSearch(newSearch)
  }
  const resetSearch = () => {
    $cookie.setSearchPage({
      searchKey: props.searchKey,
      value: JSON.stringify(props.defaultSearch)
    })
    setSearch(props.defaultSearch)
  }
  const updateCookieSearch = (newSearch: Partial<S> = {}) => {
    const value = {
      ...search,
      ...newSearch
    } as Record<string, string>

    delete value?._total
    delete value?.lastPage


    $cookie.setSearchPage({
      searchKey: props.searchKey,
      value: JSON.stringify(value)
    })
  }
  const getItems = async (args: { search?: Partial<S> } = {}) => {
    setLoading(true)

    const { data, status } = await props.request<D, S>({ search: { ...search, ...args.search } })

    if (status !== 200) {
      //   updateCookieSearch()

      //   setItems([])

      //   setLoading(false)
      return
    }

    const newSearch = {
      ...search,
      page: data.page,
      _total: data.total,
      _limit: data.limit,
      lastPage: data.lastPage,
    }

    onChangeSearch(newSearch)

    // updateCookieSearch(newSearch)

    // setItems(data.items)

    // setLoading(false)
  }

  useEffect(() => {

    async function handler() {
      await getItems()
    }

    if (effect.current && time < 2) {
      time++
      handler()
    }

    return () => {
      effect.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps])

  return {
    loading,
    items,
    getItems,
    search,
    onChangeSearch,
    resetSearch
  }
}
