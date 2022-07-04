import { createRouter, createWebHistory, RouteRecordRaw, RouteRecordName } from 'vue-router';
import { verifyAuth } from '../middlewares';
import Public from '../modules/Public';
import Private from '../modules/Private';
import useAppSetup from '../composables/useAppSetup';
import GAnalytics from "../utils/GAnalytics"

const { setSelectedLanguage } = useAppSetup();

const appRoutes: RouteRecordName[] = [];
const routes: Array<RouteRecordRaw> = [
    {
        path: '/error',
        name: 'ErrorPage',
        component: () => import(/* webpackChunkName: "ErrorPage" */ '../pages/ErrorPage.vue'),
    },
    {
        path: '/error/auth',
        name: 'AuthErrorPage',
        component: () => import(/* webpackChunkName: "AuthErrorPage" */ '../pages/AuthErrorPage.vue'),
    },
    ...Public,
    ...Private
]

for (let x = 0; x < routes.length; x++) {
    if (routes[x].name) {
        appRoutes.push(routes[x].name!)
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // console.log('to fullpath: ', to.fullPath)
    // console.log('to path: ', to.path)
    // console.log('from fullpath: ', from.fullPath)
    // console.log('fromName: ', from.name)
    // console.log('from: ', from.path)

    GAnalytics.logRoute(to)

    if (to.query?.lang) {
        setSelectedLanguage(to.query.lang as string)
    } else if (window.localStorage.getItem('lang')) {
        setSelectedLanguage(window.localStorage.getItem('lang') as string)
    }

    // // if routing to an error page, go to it
    // if (to.fullPath.includes('error')) {
    //     next();
    //     return;
    // }

    // // if loading from a full refresh, go to splash route to verify auth
    // if (from.path === '/' && !from.name && to.path !== '/') {
    //     next({
    //         name: 'SplashPage'
    //     })
    //     return;
    // }

    next();
})

export {
    router,
    appRoutes,
}