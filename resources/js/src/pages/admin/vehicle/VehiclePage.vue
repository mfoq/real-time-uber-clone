<script setup>
    import { useVehicleStore } from '../../../stores/vehicle/vehicle-store';
    import VehicleTable from './components/VehicleTable.vue';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';

    const vehicleStore = useVehicleStore();

    const {vehicleData} = storeToRefs(vehicleStore);

    onMounted(async() => {
        await vehicleStore.getVehicles();
        console.log(VehicleData);
    })

</script>

<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">Cars</h1>
        
        <VehicleTable :vehicles="vehicleData" />
    
    </div>
</template>