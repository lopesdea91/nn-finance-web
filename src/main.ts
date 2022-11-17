import { createApp } from 'vue'
import App from '@/App.vue'

import '@/assets/css/app.scss'

import configFontAwesome from '@/config/fontawesome'
import configGlobalComponents from '@/config/global-components'
import router from '@/config/vue-router'

const app = createApp(App)

app.use(configFontAwesome)
app.use(configGlobalComponents)
app.use(router)

app.mount('#app')
