<script setup>
    import { App } from '../../../api/api';
    import ChevronLeftIcon from '../../../components/icons/ChevronLeftIcon.vue'
    import ChevronRightIcon from '../../../components/icons/ChevronRightIcon.vue'
    import HomeIcone from '../../../components/icons/HomeIcon.vue'
    import PaymentIcon from '../../../components/icons/PaymentIcon.vue'
    import LogoutIcon from '../../../components/icons/LogoutIcon.vue'
    import { ref } from 'vue';

    const toggleSideBar = ref(false);
    function toggle() {
        toggleSideBar.value = !toggleSideBar.value;
    }

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
                        <HomeIcone class="mt-1"/>
                        <span v-show="toggleSideBar">Home</span>
                    </li>
                    <li class="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                        <PaymentIcon class="mt-1"/>
                        <span v-show="toggleSideBar" >Payments</span>
                    </li>
                    <hr>
                    <li class="flex gap-2 text-red-600 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                        <LogoutIcon class="mt-1"/>
                        <span v-show="toggleSideBar">Logout</span>
                    </li>
                </ul>
            </nav>
    </div>
</template>