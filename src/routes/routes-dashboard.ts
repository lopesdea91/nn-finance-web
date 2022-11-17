import { RouteRecordRaw } from "vue-router"

import PageDashboard from '../resource/views/dashboard/Dashboard.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: PageDashboard
    }
]

export default routes