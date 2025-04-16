<script setup>
    import { onMounted } from 'vue';
    import { useSignUpStore } from '../../../stores/auth/signup-store';
    

    const signupStore = useSignUpStore();
    onMounted(() => {
       console.log('render step 1');
    })
</script>

<template>
    <input type="text" placeholder="Enter Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    <button @click="signupStore.moveStep2" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Next</button>
</template>