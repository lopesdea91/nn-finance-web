import { App } from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add()

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    install(app: App) {
        app.component('Icon', FontAwesomeIcon)
    }
}
