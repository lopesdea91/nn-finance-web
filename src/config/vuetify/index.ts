import { App } from "vue";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default {
    install: (app: App) => {
        const vuetify = createVuetify({
            components,
            directives,
        })
        app.use(vuetify)
    },
};