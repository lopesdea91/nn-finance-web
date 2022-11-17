import axios from 'axios'
// import appStore from '@/appStore'
// import { computed, watch } from 'vue'

// const token = computed(() => {
//     return window.localStorage.getItem('nn-finance') ||  appStore.state.token || ''
// })

// console.log(token.value);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API,
    // headers: {
    //     'Authorization': `Bearer ${token.value}`
    // }
})

// axiosInstance.interceptors.response.use(undefined, error => {
//     console.log(error);
// })

// axiosInstance.defaults.baseURL = import.meta.env.BASE_URL
// axiosInstance.defaults.headers.common['Authorization'] = `Bearer 123`

export default axiosInstance

