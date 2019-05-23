import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/judges',
            name: 'judge',
            component: () => import('./views/Judge.vue'),
        },
        {
            path: '/horses',
            name: 'horse',
            component: () => import('./views/Horse.vue'),
        },
        {
            path: '/classes',
            name: 'class',
            component: () => import('./views/Class.vue'),
        },
        {
            path: '**',
            redirect: '/',
        },
    ],
});
