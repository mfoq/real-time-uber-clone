<script setup>
    import { App } from "../../api/api";
    import  Step1  from "./login/Step1Login.vue";
    import  Step2  from "./login/Step2Login.vue";
    import { useLoginStore } from "../../stores/auth/login-store";
    import { onMounted } from "vue";

    const loginStore = useLoginStore();

    onMounted(() => {
      loginStore.currentStep=Step1;
      loginStore.step1 = Step1;
      loginStore.step2 = Step2;
    });
</script>

<template>
  <div class="flex flex-row justify-between mt-40">
    <div></div>
    <div class="w-[300px]">
      <h1 class="mb-3 text-3xl font-semibold text-center">Sign In</h1>
       <!-- render stes based on state -->
        <keep-alive>
          <component :is="loginStore.currentStep" />
        </keep-alive>

        <div class="flex text-sm text-indigo-900">
            <span class="me-2 font-semibold">You have an account ?</span>
            <Router-link to="/signup" class="hover:underline font-bold">Signup</Router-link>
        </div>
        
        <div class="flex gap-2 mb-2">
            <hr class="h-[1px] bg-black w-[47%] mt-3">
            <div>or</div>
            <hr class="h-[1px] bg-black w-[47%] mt-3">
        </div>

        <button class="flex justify-center gap-2 bg-gray-300 rounded-md p-2 w-[100%]">
            <img :src="App.baseUrl + 'img/google-icon.svg'" alt="google logo" width="27px" />
            <span>Continue with Google</span>
        </button>
    </div>
    <div></div>
  </div>
</template>
