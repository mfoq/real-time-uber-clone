<script setup>
    import { App } from "../../api/api";

    const baseUrl = App.baseUrl;
</script>

<template>
  <div class="flex flex-row justify-between mt-40">
    <div></div>
    <div class="w-[300px]">
      <h1 class="mb-3 text-3xl font-semibold text-center">Sign In</h1>
      <input type="text" placeholder="Enter Email" class="mb-2 border rounded-md p-2 w-[100%]" />
      <!-- <div class="flex flex-column"> -->
        <button class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm w-[100%] ">Sign In</button>

        <div class="flex gap-2 mb-2">
            <hr class="h-[1px] bg-black w-[47%] mt-3">
            <div>or</div>
            <hr class="h-[1px] bg-black w-[47%] mt-3">
        </div>

        <button class="flex justify-center gap-2 bg-gray-300 rounded-md p-2 w-[100%]">
            <img :src="baseUrl + 'img/google-icon.svg'" alt="google logo" width="27px" />
            <span>Continue with Google</span>
        </button>
      <!-- </div> -->
    </div>
    <div></div>
  </div>
</template>
