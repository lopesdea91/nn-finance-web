import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { layoutDone, signIn as signInSlice, signUp as signUpSlice } from '@/store/features/system/systemSlice'
import { User } from '@/types/system'

export default () => {
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

  const signUpSystem = () => {
    dispatch(signUpSlice())
  }

  return {
    state,
    layoutIsReady,
    signInSystem,
    signUpSystem,
  }
}