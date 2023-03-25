export interface systemStateSlice {
  menu: boolean
  period: string,
  walletPanelId: number | null,
  loading: boolean,
}

const initialState: systemStateSlice = {
  menu: false,
  period: '',
  walletPanelId: null,
  loading: false
}

export default initialState