import { RouteRecordRaw } from "vue-router"

import PageAdmin from '../resource/pages/admin/Admin.vue'

const routes: RouteRecordRaw[] = [
    {
        path: 'admin',
        name: 'admin',
        components: PageAdmin
    }
]

export default routes