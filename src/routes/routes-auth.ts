import { RouteRecordRaw } from "vue-router"

import PageSignIn from '../resource/views/auth/SignIn.vue'
import PageSignUp from '../resource/views/auth/SignUp.vue'
import PageSignOut from '../resource/views/auth/SignOut.vue'
import PageForgotPassword from '../resource/views/auth/ForgotPassword.vue'

const routes: RouteRecordRaw[] = [

    {
        path: '/sign-in',
        name: 'sign-in',
        component: PageSignIn
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: PageSignUp
    },
    {
        path: '/sign-out',
        name: 'sign-out',
        component: PageSignOut
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: PageForgotPassword
    },
]

export default routes