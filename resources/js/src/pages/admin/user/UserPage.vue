<script setup>
    import UserTable from './components/UserTable.vue';
    import { onMounted } from 'vue';
    import { useUserStore } from "../../../stores/user/user-store";
    import { storeToRefs } from 'pinia';
    import { TailwindPagination } from 'laravel-vue-pagination';


    const userStore = useUserStore();

    const {userData, loading} = storeToRefs(userStore);

    onMounted(async() => {
        await userStore.getUsers();
    })

</script>

<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">User Page</h1>
        <UserTable :users="userData?.data" @get-users="userStore.getUsers"/>
        
        <!-- pagination -->
        <div class="mt-2">
            <TailwindPagination
                :data="userData"
                @pagination-change-page="userStore.getUsers"
            />
        </div>
    </div>
</template>

<style scoped>
    /* If you pagination doesnt looks good use this i add add this manually */
    button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus\:z-20.bg-blue-50.border-blue-500.text-blue-600.z-30 {
        background: #4f46e5;
        color: white;
        /* border-radius: 5px; */
    }
    
    ::v-deep span.sr-only {
        padding: 0px 10px !important;
    }

</style>