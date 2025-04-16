<script setup>
    import { onMounted } from 'vue';
    import { useSignUpStore } from '../../../stores/auth/signup-store';
   
    const signupStore = useSignUpStore();
    onMounted(() => {
       console.log('render step 2');
    })
</script>

<template>
        <input type="text" placeholder="Enter Password" class="mb-2 border rounded-md p-2 w-[100%]" />
        <div class="flex justify-between">
            <button @click="signupStore.moveStep1" class="border border-ingigo-700 text-gray-500 p-2 mb-2 rounded-md shadow-sm w-[48%]">Previous</button>
            <button @click="signupStore.moveStep3" class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[48%]">Next</button>
        </div>

</template>