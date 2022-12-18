import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { menuSet } from '@/store/features/layout/layoutSlice'

const useLayoutStore = () => {
  const state = useSelector((state: RootState) => state.layout)

  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(menuSet(!state.menu))
  }
  const openMenu = () => {
    dispatch(menuSet(true))
  }
  const closeMenu = () => {
    dispatch(menuSet(false))
  }

  return {
    state,
    toggleMenu,
    openMenu,
    closeMenu
  }
}
export default useLayoutStore