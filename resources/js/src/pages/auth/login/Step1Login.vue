<script setup>
    import { onMounted } from 'vue';
    import { useLoginStore } from '../../../stores/auth/login-store';

    const loginStore = useLoginStore();
    onMounted(() => {
       console.log('render step 1');
    })
</script>

<template>
    <input type="text" placeholder="Enter Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    <button @click="loginStore.next" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Next</button>
</template>