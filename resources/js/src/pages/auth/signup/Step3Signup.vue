<script setup>
    import { useSignUpStore } from '../../../stores/auth/signup-store';
    import { storeToRefs } from 'pinia';
   
    const signupStore = useSignUpStore();
    const {vStep3$, step3Input, step1Input} = storeToRefs(signupStore);
   
</script>

<template>

        <span>
            <a href="#" class="text-indigo-700 font-semibold">{{ step1Input.email }}</a>
        </span>

        <inputError :errors="vStep3$.otp_code.$errors">
            <input type="text" v-model="step3Input.otp_code" placeholder="OTP" class="mb-2 mt-2 border rounded-md p-2 w-[100%]">
        </inputError>
        <div class="flex justify-between">
            <button @click="signupStore.moveStep1" class="border border-ingigo-700 text-gray-500 p-2 mb-2 rounded-md shadow-sm w-[48%]">Previous</button>
            <button @click="signupStore.signupUser" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[48%]">Sign up</button>
        </div>

</template>