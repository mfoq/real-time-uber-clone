<script setup>
    import { onMounted } from 'vue';
    import { useLoginStore } from '../../../stores/auth/login-store';

    const loginStore = useLoginStore();

    onMounted(() => {
       console.log('render step 2');
    })
</script>

<template>
        <input type="text" placeholder="Enter Password" class="mb-2 border rounded-md p-2 w-[100%]" />
        <div class="flex justify-between">
            <button @click="loginStore.previous" class="border border-ingigo-700 text-gray-500 p-2 mb-2 rounded-md shadow-sm w-[48%]">Previous</button>
            <button class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[48%]">Sign In</button>
        </div>

</template>