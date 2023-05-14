import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsAuthSlice } from "@/store/features/auth"
import { User } from "@/types/system"
import { $memory } from "@/@core/infra/memory"

export const AuthStore = () => {
  const dispatch = useAppDispatch()

  const state = useAppSelector((e) => e.auth)

  const setUser = (value: User) => {
    $memory.cookie.set('data_user', JSON.stringify({
      id: value.id,
      name: value.name,
    }))

    dispatch(actionsAuthSlice.setUser(value))
  }

  return {
    state,
    setUser
  }
}