<script setup>
    import { useLoginStore } from '../../../stores/auth/login-store';
    import { storeToRefs } from 'pinia';

    const loginStore = useLoginStore();
    const {step1Input, vStep1$} = storeToRefs(loginStore);

</script>

<template>
    
    <inputError :errors="vStep1$.email.$errors">
        <input type="text" v-model="step1Input.email" placeholder="Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    </inputError>

    <button @click="loginStore.next" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%]">Next</button>
</template>