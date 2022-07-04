import { RouteRecordRaw } from 'vue-router';
import { redirect } from '../../middlewares'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: [redirect],
        component: () => import(/* webpackChunkName: "HomePage" */ './pages/Login.vue'),
    },
    {
        path: '/signup',
        name: 'Sign Up',
        beforeEnter: [redirect],
        component: () => import(/* webpackChunkName: "Signup" */ './pages/Signup.vue'),
    },
    {
        path: '/forgot-password',
        name: 'PasswordRecover',
        beforeEnter: [redirect],
        component: () => import(/* webpackChunkName: "PasswordRecover" */ './pages/PasswordRecover.vue'),
    }
]

export default routes;