<script setup>
    import { onMounted } from 'vue';
    import { useSignUpStore } from '../../../stores/auth/signup-store';
import { storeToRefs } from 'pinia';
    
    const signupStore = useSignUpStore();

    const {v$, step1Input} = storeToRefs(signupStore);

    onMounted(() => {
       console.log('render step 1');
    })
</script>

<template>

    <div :class="{ error: v$.firstName.$errors.length }">
        <input v-model="step1Input.name">
        <input type="text" placeholder="Enter Name" class="mb-2 border rounded-md p-2 w-[100%]" />
        <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <input type="text" placeholder="Enter Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    <button @click="signupStore.moveStep2" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Next</button>
</template>