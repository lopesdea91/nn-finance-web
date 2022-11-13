import { RouteRecordRaw } from "vue-router"

import PageNotFound from '../resource/pages/others/NotFound.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/sign-in'
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: PageNotFound
    },
]

export default routes