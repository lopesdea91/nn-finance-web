import { createApp } from 'vue'
import App from '@/App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/app.scss'

import config from '@/config'

const app = createApp(App)
app.use(config)
app.mount('#app')
