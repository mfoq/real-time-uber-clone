<script setup>
    const props = defineProps(['vehicles']);

    console.log(props.vehicles);

    const emit = defineEmits(['editVehicles', 'uploadImage', 'deleteVehicles']); //events
</script>

<template>
        <table class="bg-white rounded-md shadow-md border border-gray-300 w-full">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <td class="border border-gray-300 py-2 px-4">#</td>
                    <td class="border border-gray-300 py-2 px-4">Name</td>
                    <td class="border border-gray-300 py-2 px-4">Model</td>
                    <td class="border border-gray-300 py-2 px-4">price/KM</td>
                    <td class="border border-gray-300 py-2 px-4">Image</td>
                    <td class="border border-gray-300 py-2 px-4">Actions</td>
                </tr>
            </thead>
            <tbody>
                <tr class="text-left" v-for="vehicle in vehicles" :key="vehicle?.id">
                    <td class="border border-gray-300 py-2 px-4">{{ vehicle?.id }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ vehicle?.name }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ vehicle?.model }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ vehicle?.price }}</td>
                    <td class="border border-gray-300 py-2 px-4">
                        <img :src="vehicle?.image" alt="vehicle-image" class="w-20">
                    </td>
                    <td class="border border-gray-300 py-2 px-4">
                        <a @click="emit('uploadImage', vehicle?.id)" class="text-indigo-700 font-bold" href="#">upload</a>
                        <!-- <a @click="emit('toggleModal', vehicle?.id)" class="text-indigo-700 font-bold" href="#">Edit</a>
                        <a @click="emit('toggleModal', vehicle?.id)" class="text-indigo-700 font-bold" href="#">delete</a> -->
                    </td>
                </tr>
            </tbody>
        </table>
</template>