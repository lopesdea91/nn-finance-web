import { App } from "vue"

import AppButton from './Button/AppButton.vue'
import AppButtonGroup from './Button/AppButtonGroup.vue'
import AppDivisor from './Divisor/AppDivisor.vue'
import AppForm from './Form/AppForm.vue'
import AppInput from './Form/AppInput.vue'
import AppTextarea from './Form/AppTextarea.vue'
import AppText from './Text/AppText.vue'
import AppTextLink from './Text/AppTextLink.vue'

export default {
    install(app: App) {
        app.component('AppButton', AppButton)
        app.component('AppButtonGroup', AppButtonGroup)
        app.component('AppDivisor', AppDivisor)
        app.component('AppForm', AppForm)
        app.component('AppInput', AppInput)
        app.component('AppTextarea', AppTextarea)
        app.component('AppText', AppText)
        app.component('AppTextLink', AppTextLink)
    }
}