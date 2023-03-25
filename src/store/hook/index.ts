import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppStore } from ".."

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector