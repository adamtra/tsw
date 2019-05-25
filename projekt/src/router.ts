import Vue from 'vue';
import Router from 'vue-router';
import FanPanel from '@/views/FanPanel';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: FanPanel,
        },
        {
            path: '/judges',
            component: () => import('./views/Judge.vue'),
        },
        {
            path: '/judges/:id',
            component: () => import('./views/JudgeDetails.vue'),
        },
        {
            path: '/horses',
            component: () => import('./views/Horse.vue'),
        },
        {
            path: '/horses/:id',
            component: () => import('./views/HorseDetails.vue'),
        },
        {
            path: '/classes',
            component: () => import('./views/Class.vue'),
        },
        {
            path: '/classes/:id',
            component: () => import('./views/ClassDetails.vue'),
        },
        {
            path: '/classes/:id/:hid',
            component: () => import('./views/HorseScore.vue'),
        },
        {
            path: '**',
            redirect: '/',
        },
    ],
});
