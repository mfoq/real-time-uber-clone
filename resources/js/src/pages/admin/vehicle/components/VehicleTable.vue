<script setup>
    const props = defineProps(['vehicles']);
    const emit = defineEmits(['editVehicle', 'uploadImage', 'deleteVehicle', 'toggleModal']); //events
</script>

<template>

        <div class="flex justify-end p-2">
            <button @click="emit('toggleModal')" class="text-white bg-indigo-700 p-2 border rounded-md font-semibold">
                Create
            </button>
        </div>

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
                        <div class="flex justify-evenly items-center">
                            <a @click="emit('uploadImage', vehicle?.id)" 
                                class="hover:bg-indigo-700 hover:text-white text-indigo-700 font-bold no-underline border rounded-md border-indigo-700 p-2" 
                                href="#">
                                <UploadIcon/>
                            </a>
                            
                            <a @click="emit('editVehicle', vehicle)" 
                                class="hover:bg-indigo-700 hover:text-white text-indigo-700 font-bold no-underline border rounded-md border-indigo-700 p-2"                                 href="#">
                                <EditIcon/>
                            </a>

                            <a @click="emit('deleteVehicle', vehicle?.id)" 
                                class="hover:bg-indigo-700 hover:text-white text-indigo-700 font-bold no-underline border rounded-md border-indigo-700 p-2"                                 href="#">
                                <DeleteIcon/>
                            </a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
</template>