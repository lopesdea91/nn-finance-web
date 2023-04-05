import { actionsAuthSlice } from '@/store/features/auth'
import { useAppDispatch } from '@/store/hook'
import { User } from "@/types/system"

export const useStoreAuth = () => {
  const dispatch = useAppDispatch()

  const setUser = (value: User) => {
    dispatch(actionsAuthSlice.setUser(value))
  }

  return {
    setUser
  }
}