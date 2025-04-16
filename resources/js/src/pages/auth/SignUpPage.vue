<script setup>
    import { App } from "../../api/api";
    import  Step1  from "./signup/Step1Signup.vue";
    import  Step2  from "./signup/Step2Signup.vue";
    import  Step3  from "./signup/Step3Signup.vue";
    import { onMounted } from "vue";
    import { useSignUpStore } from "../../stores/auth/signup-store";

    const signupStore = useSignUpStore();

    onMounted(() => {
        signupStore.currentStep=Step1;
        signupStore.step1 = Step1;
        signupStore.step2 = Step2;
        signupStore.step3 = Step3;
    });
</script>

<template>
  <div class="flex flex-row justify-between mt-40">
    <div></div>
    <div class="w-[300px]">
      <h1 class="mb-3 text-3xl font-semibold text-center">Sign Up</h1>
       <!-- render stes based on state -->
        <keep-alive>
          <component :is="signupStore.currentStep" />
        </keep-alive>
        
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
