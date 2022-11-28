import { createApp } from 'vue'
import App from '@/App.vue'

import '@/assets/css/app.scss'

import config from '@/config'

const app = createApp(App)
app.use(config)
app.mount('#app')
