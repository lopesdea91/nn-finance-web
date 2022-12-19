import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setMenu, setLoading } from '@/store/features/layout/layoutSlice'

const useLayoutStore = () => {
  const state = useSelector((state: RootState) => state.layout)

  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(setMenu(!state.menu))
  }
  const openMenu = () => {
    dispatch(setMenu(true))
  }
  const closeMenu = () => {
    dispatch(setMenu(false))
  }

  const startLoading = () => {
    dispatch(
      setLoading(true)
    )
  }
  const endLoading = () => {
    dispatch(
      setLoading(false)
    )
  }

  return {
    state,
    toggleMenu,
    openMenu,
    closeMenu,
    startLoading,
    endLoading,
  }
}
export default useLayoutStore