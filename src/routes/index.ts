import { RouteRecordRaw } from "vue-router"

import routesAdmin from './routes-admin'
import routesAuth from './routes-auth'
import routesDashboard from './routes-dashboard'
import routesFinance from './routes-finance'
import routesSettings from './routes-settings'
import routesOthers from './routes-others'

const routes: RouteRecordRaw[] = [
    ...routesAdmin,
    ...routesAuth,
    ...routesDashboard,
    ...routesFinance,
    ...routesSettings,
    ...routesOthers,
]

export default routes