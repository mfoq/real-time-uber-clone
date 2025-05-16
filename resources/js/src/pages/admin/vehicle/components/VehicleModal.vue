<script setup>
    import { ref } from 'vue';
    import { useVehicleStore } from '../../../../stores/vehicle/vehicle-store';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';

    const vehicleStore=useVehicleStore()
    const {vehicleValidation$,vehicleInput, loading, edit} = storeToRefs(vehicleStore);
    const props = defineProps(['show']);
    const emit = defineEmits(['toggleModal']);
    const saveBtnLabel = computed(() => edit.value ? 'Update' : 'Save');
</script>

<template>
    <BaseModal :show="props.show">
        <template #title>
            <div class="text-2xl font-semibold">Create Vehicle</div>
        </template>
        <template #body>
            <inputError :errors="vehicleValidation$.name.$errors">
                <label for="name">Name</label>
                <input type="text" v-model="vehicleInput.name" placeholder="Name" class="mb-2 border rounded-md p-2 w-[100%]">
            </inputError>
            <inputError :errors="vehicleValidation$.model.$errors">
                <label for="name">Model</label>
                <input type="text" v-model="vehicleInput.model" placeholder="Model" class="mb-2 border rounded-md p-2 w-[100%]">
            </inputError>
            <inputError :errors="vehicleValidation$.price.$errors">
                <label for="name">Price/Km</label>
                <input type="text" v-model="vehicleInput.price" placeholder="Price/KM" class="mb-2 border rounded-md p-2 w-[100%]">
            </inputError>
        </template>
        <template #footer>
            <button @click="emit('toggleModal')" class="border border-indigo-700 text-gray-700 p-2 mb-2 rounded-md shadow-sm">Close</button>
            <button :disabled="loading" @click="vehicleStore.createOrUpdateVehicle()" type="submit" 
                        class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm">
                {{ loading ? 'Saving...' : saveBtnLabel }}
            </button>
        </template>
    </BaseModal>
</template>