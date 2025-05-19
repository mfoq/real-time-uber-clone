import {createRouter, createWebHistory } from 'vue-router'
import { isAdmin } from '../middleware/isAdmin'

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
                beforeEnter: isAdmin
            },
            {
                path: '/vehicles',
                name: 'vehicles',
                component: () => import('../pages/admin/vehicle/VehiclePage.vue'),
            },
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('../pages/admin/welcome/WelcomePage.vue'),
            }
        ]
    },

]

export const router = createRouter({
    history:createWebHistory('/app'),
    routes,
})