import { actionsLayout } from "@/store/features/layout"
import { Toast } from "@/types/layout"
import { useAppDispatch, useAppSelector } from ".."

export const LayoutStore = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(e => e.layout)

  function addTost(values: Toast[]) {
    dispatch(actionsLayout.addToast(values))
  }
  function removeTost(id: Toast['id']) {
    dispatch(actionsLayout.removeToast(id))
  }

  return {
    state,
    addTost,
    removeTost
  }
}