import { App } from "vue";

import fontAwesome from '@/config/fontawesome'
import globalComponents from '@/config/global-components'
import services from '@/config/services'
import vueRouter from '@/config/vue-router'

export default {
    install: (app: App) => {
        app.use(fontAwesome)
        app.use(globalComponents)
        app.use(services)
        app.use(vueRouter)
    },
};