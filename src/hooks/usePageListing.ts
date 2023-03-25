import { AxiosResponse } from "axios";
import { DependencyList, useEffect, useState } from "react"
import { useStoreSystem } from "./useStoreSystem";

interface Props<D, S> {
	initialItems?: D[]
	search: S,
	request: <D, S>(args?: {
		search?: Partial<S>;
	}) => Promise<AxiosResponse<{
		items: D[]
		page: number
		total: number
		limit: number
		lastPage: number
	}, any>>,
	updateSearch: (args: Partial<S>) => void
}

export const usePageListing = <D, S>(props: Props<D, S>, deps: DependencyList = []) => {
	const { systemState: { loading }, loadingStart, loadingEnd } = useStoreSystem()
	const [items, setItems] = useState<D[]>(props.initialItems || [])

	async function getItems(searchMerge: Partial<S> = {}) {
		loadingStart()

		try {
			const { data, status } = await props.request<D, S>({
				search: {
					...props.search,
					...searchMerge
				}
			})

			if (status !== 200) {
				setItems([])
				return
			}

			props.updateSearch({
				...props.search,
				page: data.page,
				_total: data.total,
				_limit: data.limit,
				lastPage: data.lastPage,
			} as S)

			setItems(data.items)

		} catch (error) {
			console.log('... error', error);

		} finally {
			loadingEnd()
		}
	}

	// useEffect(() => {
	// 	getItems()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [...deps])

	return {
		items,
		loading,
		getItems
	}
}