import { actionsAuthSlice } from '@/store/features/auth'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { User } from "@/types/system"

export const useStoreAuth = () => {
  const dispatch = useAppDispatch()

  const authState = useAppSelector(e => e.auth)

  const dispatchSetUser = (value: User) => {
    dispatch(actionsAuthSlice.setUser(value))
  }

  return {
    authState,
    dispatchSetUser
  }
}