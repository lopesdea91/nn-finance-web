import { RouteRecordRaw } from "vue-router"

import PageDashboard from '../resource/pages/dashboard/Dashboard.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: PageDashboard
    }
]

export default routes