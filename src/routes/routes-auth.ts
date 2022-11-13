import { RouteRecordRaw } from "vue-router"

import PageSignIn from '../resource/pages/auth/SignIn.vue'
import PageSignOut from '../resource/pages/auth/SignOut.vue'

const routes: RouteRecordRaw[] = [

    {
        path: '/sign-in',
        name: 'sign-in',
        component: PageSignIn
    },
    {
        path: '/sign-out',
        name: 'sign-out',
        component: PageSignOut
    },
]

export default routes