import { Toast } from "@/types/layout"

export interface financeStateSlice {
  titlePage: string
  toast: Toast[]
}

const initialState: financeStateSlice = {
  titlePage: '',
  toast: []
}

export default initialState
