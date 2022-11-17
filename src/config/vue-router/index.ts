import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    /**
     * verifica se existe token
     * -- se exitir, fazer validação e redirecionar para /dashboard
     * -- se não existir, redirecionar para /login
     */

    return next();
});

export default router
