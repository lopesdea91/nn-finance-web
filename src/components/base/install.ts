import { Component } from "vue"

import AppButton from './Button/AppButton.vue'
import AppButtonGroup from './Button/AppButtonGroup.vue'
import AppDivisor from './Divisor/AppDivisor.vue'
import AppForm from './Form/AppForm.vue'
import AppInput from './Form/AppInput.vue'
import AppTextarea from './Form/AppTextarea.vue'
import AppText from './Text/AppText.vue'
import AppTextLink from './Text/AppTextLink.vue'
import AppIcon from './Icon/AppIcon.vue'

const components: Record<string, Component> = {
    AppButton,
    AppButtonGroup,
    AppDivisor,
    AppForm,
    AppInput,
    AppTextarea,
    AppText,
    AppTextLink,
    AppIcon
};

export default components;