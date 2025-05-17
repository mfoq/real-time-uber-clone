<script setup>
    import { ref } from 'vue';
    import { useUploadVehicleImageStore } from '../../../../stores/vehicle/upload-vehicle-image-store';
    import { storeToRefs } from 'pinia';
import { App } from '../../../../api/api';
import { showError } from '../../../../helper/utils';

    const uploadVehicleImageStore = useUploadVehicleImageStore();
    const {loading, uploadImageInput, modalVal} = storeToRefs(uploadVehicleImageStore);

    function selectImage(e) {
        const selectedImage = e.target.files[0];
        const output = document.getElementById('outputImage');
        output.src = URL.createObjectURL(selectedImage);
        output.onload = function() {
            URL.revokeObjectURL(selectImage)
        }
        uploadImageInput.value.image = selectedImage;
    }

    const props = defineProps(['show']);
    const emit = defineEmits(['getVehicles']);

   async function uploadImage() {
        const payload = await uploadVehicleImageStore.uploadVehicleImage();
        loading.value = true;
        fetch(App.apiBaseUrl + "/vehicles/image", payload)
            .then((response) => response.json())
            .then(async (result) => {
                document.querySelector('#outputImage').src ='';
                loading.value = false;
                modalVal.value = false;
                await emit('getVehicles')
            })
            .catch((error) => {
                showError(error?.message);
                loading.value = false;
            });
    }
    
</script>

<template>
    <BaseModal :show="props.show">
        <template #title>
            <div class="text-2xl font-semibold">Upload Vehicle image</div>
        </template>
        <template #body>
            <img style="height:150px;" alt="image" id="outputImage">
            <label for="name">Select image:</label>
            <input type="file" @change="selectImage" class="mb-2 border rounded-md p-2 w-[100%]">
        </template>
        <template #footer>
            <button @click="modalVal=false" class="border border-indigo-700 text-gray-700 p-2 mb-2 rounded-md shadow-sm">Close</button>
            <button :disabled="loading" type="submit" 
                    @click="uploadImage"
                    class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm">
                {{ loading ? 'Uploading...' : 'Upload' }}
            </button>
        </template>
    </BaseModal>
</template>