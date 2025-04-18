import {createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/LoginPage.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../pages/auth/SignUpPage.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../pages/admin/DashboardPage.vue'),
    }
]

export const router = createRouter({
    history:createWebHistory('/app'),
    routes,
})