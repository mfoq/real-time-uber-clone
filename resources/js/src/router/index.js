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
        component: () => import('../pages/admin/AdminPage.vue'),
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('../pages/admin/user/UserPage.vue'),
            },
            {
                path: '/vehicles',
                name: 'vehicles',
                component: () => import('../pages/admin/vehicle/VehiclePage.vue'),
            }
        ]
    },

]

export const router = createRouter({
    history:createWebHistory('/app'),
    routes,
})