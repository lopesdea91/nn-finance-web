import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/app.scss'

import baseComponnets from './components/base/install'
import router from './config/vue-router'

const app = createApp(App)

app.use(baseComponnets)
app.use(router)

app.mount('#app')
