export interface systemStateSlice {
  menu: boolean
  period: string
  walletPanelId: number | null
  loading: boolean
  loadingPage: boolean
}

const initialState: systemStateSlice = {
  menu: false,
  period: '',
  walletPanelId: null,
  loading: false,
  loadingPage: false,
}

export default initialState