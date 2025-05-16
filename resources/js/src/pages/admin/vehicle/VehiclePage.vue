<script setup>
    import { useVehicleStore } from '../../../stores/vehicle/vehicle-store';
    import VehicleTable from './components/VehicleTable.vue';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import VehicleModal from './components/VehicleModal.vue';

    const vehicleStore = useVehicleStore();

    const {vehicleData, modalVal, edit, vehicleInput} = storeToRefs(vehicleStore);

    onMounted(async() => {
        await vehicleStore.getVehicles();
    })

    function editVehicle(vehicle) {
        edit.value = true;
        vehicleInput.value = vehicle;
        vehicleStore.toggleModal();
    }

</script>

<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">Cars</h1>
        <VehicleModal :show="modalVal" @toggleModal="vehicleStore.toggleModal"/>
        <VehicleTable :vehicles="vehicleData" @editVehicle="editVehicle" @toggleModal="vehicleStore.toggleModal"/>
    </div>
</template>