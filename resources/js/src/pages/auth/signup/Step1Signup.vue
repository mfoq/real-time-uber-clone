<script setup>
    import { onMounted } from 'vue';
    import { useSignUpStore } from '../../../stores/auth/signup-store';
    import { storeToRefs } from 'pinia';
    import inputError  from '../../../components/base-components/inputError.vue';
    
    const signupStore = useSignUpStore();

    const {v$, step1Input} = storeToRefs(signupStore);

    // onMounted(() => {
    //    console.log('render step 1');
    // })
</script>

<template>

    <inputError :errors="v$.name.$errors">
        <input type="text" v-model="step1Input.name" placeholder="Name" class="mb-2 border rounded-md p-2 w-[100%]">
    </inputError>

    <inputError :errors="v$.email.$errors">
        <input type="text" v-model="step1Input.email" placeholder="Email" class="mb-2 border rounded-md p-2 w-[100%]" />
    </inputError>

    <button @click="signupStore.moveStep2" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Next</button>
</template>