import { User } from '@/types/system'

export interface authStateSlice {
  user: User
}

const initialState: authStateSlice = {
  user: {
    id: null,
    name: '',
    email: ''
  },
}

export default initialState