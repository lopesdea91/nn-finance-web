import { RouteRecordRaw } from "vue-router"

import routesAuth from './routes-auth'
import routesDashboard from './routes-dashboard'
import routesSettings from './routes-settings'

const routes: RouteRecordRaw[] = [
    ...routesAuth,
    ...routesDashboard,
    ...routesSettings,
]

export default routes