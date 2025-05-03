<script setup>
    import { storeToRefs } from 'pinia';
    import { useLoginStore } from '../../../stores/auth/login-store';

    const loginStore = useLoginStore();
    const {step2Input, vStep2$, loading} = storeToRefs(loginStore);
</script>

<template>
    <Loading :loading="loading"/>

    <inputError :errors="vStep2$.password.$errors">
        <input type="password" v-model="step2Input.password" placeholder="Password" class="mb-2 border rounded-md p-2 w-[100%]">
    </inputError>

    <div class="flex justify-between">
        <button @click="loginStore.previous" class="border border-ingigo-700 text-gray-500 p-2 mb-2 rounded-md shadow-sm w-[48%]">Previous</button>
        <button @click="loginStore.signin" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[48%]">Sign In</button>
    </div>
</template>