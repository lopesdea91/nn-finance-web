import { useAppDispatch, useAppSelector } from "@/store/hook"
import { actionsAuthSlice } from "@/store/features/auth"
import { User } from "@/types/system"
import { $cookie } from "@/utils"

export const AuthStore = () => {
  const dispatch = useAppDispatch()

  const state = useAppSelector((e) => e.auth)

  const setUser = (value: User) => {
    $cookie.set({
      key: 'data_user',
      value: JSON.stringify({
        id: value.id,
        name: value.name,
      }),
      options: {
        path: '/'
      },
      keyCrypto: true,
      valueCrypto: true
    })

    dispatch(actionsAuthSlice.setUser(value))
  }

  return {
    state,
    setUser
  }
}