import { RouteRecordRaw } from 'vue-router';
import { verifyAuth } from '../../middlewares'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/homepage',
        name: 'Homepage',
        beforeEnter: [verifyAuth],
        component: () => import(/* webpackChunkName: "HomePage" */ './pages/Homepage.vue'),
    },
    {
        path: '/collection',
        name: 'Collection',
        beforeEnter: [verifyAuth],
        component: () => import(/* webpackChunkName: "Collection" */ './pages/Collection.vue'),
    },
    {
        path: '/merch',
        name: 'Merch',
        beforeEnter: [verifyAuth],
        component: () => import(/* webpackChunkName: "Merch" */ './pages/Merch.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        beforeEnter: [verifyAuth],
        component: () => import(/* webpackChunkName: "Profile" */ './pages/Profile.vue'),
    },
    {
        path: '/checkout',
        name: 'Checkout',
        beforeEnter: [verifyAuth],
        component: () => import(/* webpackChunkName: "Checkout" */ './pages/Checkout.vue'),
    },
]

export default routes;