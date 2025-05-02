<script setup>
    import { useSignUpStore } from '../../../stores/auth/signup-store';
    import { storeToRefs } from 'pinia';
   
    const signupStore = useSignUpStore();
    const {vStep2$, step2Input} = storeToRefs(signupStore);

</script>

<template>

    <inputError :errors="vStep2$.password.$errors">
        <input type="password" v-model="step2Input.password" placeholder="Password" class="mb-2 border rounded-md p-2 w-[100%]">
    </inputError>

    <div class="flex justify-between">
        <button @click="signupStore.moveStep2" class="border border-ingigo-700 text-gray-500 p-2 mb-2 rounded-md shadow-sm w-[48%]">Previous</button>
        <button @click="signupStore.moveStep3" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[48%]">Next</button>
    </div>

</template>