<script setup>
    import { useSignUpStore } from '../../../stores/auth/signup-store';
    import { storeToRefs } from 'pinia';
    
    const signupStore = useSignUpStore();

    const {vStep1$, step1Input} = storeToRefs(signupStore);

</script>

<template>

    <inputError :errors="vStep1$.name.$errors">
        <input type="text" v-model="step1Input.name" placeholder="Name" class="mb-2 border rounded-md p-2 w-[100%]">
    </inputError>

    <inputError :errors="vStep1$.email.$errors">
        <input type="text" v-model="step1Input.email" placeholder="Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    </inputError>

    <button @click="signupStore.moveStep1" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Next</button>
</template>