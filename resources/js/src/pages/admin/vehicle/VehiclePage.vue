<script setup>
    import { useVehicleStore } from '../../../stores/vehicle/vehicle-store';
    import VehicleTable from './components/VehicleTable.vue';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import VehicleModal from './components/VehicleModal.vue';
    import { confirmDelation } from '../../../helper/utils';
    import UploadImageModal from './components/UploadImageModal.vue';
    import { useUploadVehicleImageStore } from '../../../stores/vehicle/upload-vehicle-image-store';

    
    const vehicleStore = useVehicleStore();
    const {vehicleData, modalVal, edit, vehicleInput} = storeToRefs(vehicleStore);

    const uploadVehicleImageStore = useUploadVehicleImageStore();
    const {modalVal:uploadImageVehicleModal, uploadImageInput} = storeToRefs(uploadVehicleImageStore);
    

    function editVehicle(vehicle) {
        edit.value = true;
        vehicleInput.value = vehicle;
        modalVal.value = !modalVal.value;
    }

    function deleteVehicle(id) {
        confirmDelation().then(async()=>{
            await vehicleStore.deleteVehicle(id);
             vehicleStore.getVehicles();
        })
    }

    function uploadImage(id) {
        uploadImageInput.value.id = id;
        uploadImageVehicleModal.value = true;
    }

    onMounted(async() => {
        await vehicleStore.getVehicles();
    })

</script>

<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">Cars</h1>
        <VehicleModal :show="modalVal" @toggleModal="vehicleStore.toggleModal"/>
        <VehicleTable :vehicles="vehicleData" 
            @deleteVehicle="deleteVehicle" 
            @editVehicle="editVehicle" 
            @toggleModal="vehicleStore.toggleModal"
            @uploadImage="uploadImage"
            />
        <UploadImageModal 
            :show="uploadImageVehicleModal"
            @getVehicles="vehicleStore.getVehicles()"/>
    </div>
</template>