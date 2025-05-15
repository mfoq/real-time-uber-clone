<script setup>
    import { App } from '../../../api/api';
    import { ref } from 'vue';
    import { getUserData } from '../../../helper/utils';
    import { useLoginStore } from "../../../stores/auth/login-store";
    import { RouterLink } from 'vue-router';

    const loginStore = useLoginStore();

    const toggleSideBar = ref(false);
    const topNavBarMenu = ref(false);

    function toggleNavBarMenu() {
        topNavBarMenu.value =!topNavBarMenu.value;
    }

    function toggle() {
        toggleSideBar.value = !toggleSideBar.value;
    }

    const userData = getUserData();

</script>

<template>
    <div class="h-screen">
            <nav :class="`h-full bg-slate-50 ${toggleSideBar ? '[w-210px]' : ''}`" >
                <div class="flex justify-between p-2 gap-4">
                    <img v-show="toggleSideBar" :src="App.baseUrl+'img/logo.png'" alt="logo" 
                        class="w-[100px]">
                    <button v-if="toggleSideBar" @click="toggle" class="hover:bg-slate-200 p-2 rounded-md">
                        <ChevronLeftIcon/>
                    </button>
                    <button v-else @click="toggle" class="hover:bg-slate-200 p-2 rounded-md">
                        <ChevronRightIcon/>
                    </button>
                </div>
                <ul class="flex flex-col gap-2 p-2">
                    <li class="flex gap-2 bg-slate-200 p-2 rounded-md cursor-pointer">
                        <HomeIcon class="mt-1"/>
                        <span v-show="toggleSideBar">Home</span>
                    </li>
                    <li class="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                        <PaymentIcon class="mt-1"/>
                        <span v-show="toggleSideBar" >Payments</span>
                    </li>

                    <li class="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                       <Router-link class="flex" to="users">
                            <UsersIcon class="mt-1"/>
                            <span v-show="toggleSideBar" class="ml-2">Users</span>
                       </Router-link>
                    </li>

                    <li class="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                       <Router-link class="flex" to="vehicles">
                            <TruckIcon class="mt-1"/>
                            <span v-show="toggleSideBar" class="ml-2">Vehicles</span>
                       </Router-link>
                    </li>

                    
                    <hr>
                    <li @click="loginStore.logout" class="flex gap-2 text-red-600 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                        <LogoutIcon class="mt-1"/>
                        <span v-show="toggleSideBar">Logout</span>
                    </li>
                </ul>
            </nav>
    </div>

    <!-- navbar right dropdpwn section -->
    <div class="bg-slate-200 w-full">
        <div class="flex justify-between">
            <div></div>
            <div class="p-3">
                <img @click="toggleNavBarMenu" :src="App.baseUrl+'img/avatar.jpeg'" alt="logo" class="rounded-full w-10 cursor-pointer border-2 hover:border-white">
                <ul v-show="topNavBarMenu" class="bg-white absolute right-4 p-3 rounded-md shadow-lg divide-y divide-gray-200 w-[300px]">
                    <li class="p-2">
                        {{ userData?.user.name }}
                        <br>
                        <small><a class="text-indigo-700" href="">
                            {{ userData?.user.email }}
                        </a></small>
                    </li>
                    
                    <li @click="loginStore.logout" class="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600 font-semibold">
                        Logout
                    </li>
                </ul>
            </div>
        </div>

        <slot name="main">

        </slot>
    </div>
    <!-- navbar right dropdpwn section -->

</template>