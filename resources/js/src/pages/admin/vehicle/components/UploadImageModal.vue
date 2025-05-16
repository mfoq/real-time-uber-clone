<script setup>
    import { ref } from 'vue';
    import { useUploadVehicleImageStore } from '../../../../stores/vehicle/upload-vehicle-image-store';
    import { storeToRefs } from 'pinia';

    const uploadVehicleImageStore = useUploadVehicleImageStore();
    const {loading, uploadImageInput } = storeToRefs(uploadVehicleImageStore);

    function selectImage(e) {
        const selectedImage = e.target.files[0];
        const output = document.getElementById('outputImage');
        output.src = URL.createObjectURL(selectedImage);
        output.onload = function() {
            URL.revokeObjectURL(selectImage)
        }
        uploadImageInput.value.image = selectedImage;
    }

    const props = defineProps(['show', 'loading']);
    const emit = defineEmits(['toggleModal']);
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
            <button @click="emit('toggleModal')" class="border border-indigo-700 text-gray-700 p-2 mb-2 rounded-md shadow-sm">Close</button>
            <button :disabled="loading" type="submit" 
                        class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm">
                {{ loading ? 'Uploading...' : 'Upload' }}
            </button>
        </template>
    </BaseModal>
</template>