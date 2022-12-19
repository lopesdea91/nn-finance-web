import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { layoutDone, signIn as signInSlice, signOut as signOutSlice } from '@/store/features/system/systemSlice'
import { User } from '@/types/system'

const useSystemStore = () => {
  const state = useSelector((state: RootState) => state.system)

  const dispatch = useDispatch()

  const layoutIsReady = () => {
    setTimeout(() => {
      dispatch(layoutDone())
    }, 1000)
  }

  const signInSystem = ({ user, period }: { user: User, period: string }) => {
    dispatch(
      signInSlice({
        user,
        period
      })
    )
  }

  const signOutSystem = () => {
    dispatch(signOutSlice())
  }

  return {
    state,
    layoutIsReady,
    signInSystem,
    signOutSystem,
  }
}
export default useSystemStore