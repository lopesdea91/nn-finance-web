import { RouteRecordRaw } from "vue-router"

import PageSettingsAccount from '../resource/views/settings/Account.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/settings/account',
        name: 'settings-account',
        components: PageSettingsAccount
    }
]

export default routes