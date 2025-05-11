<script setup>
    const props = defineProps(['users']);
</script>

<template>
    <div class="flex">
            <input type="text" placeholder="Search..." class="mb-2 border border-gray-300 rounded-md p-2 focus:outline-none"/>
        </div>

        <table class="bg-white rounded-md shadow-md border border-gray-300 w-full">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <td class="border border-gray-300 py-2 px-4">#</td>
                    <td class="border border-gray-300 py-2 px-4">Name</td>
                    <td class="border border-gray-300 py-2 px-4">Email</td>
                    <td class="border border-gray-300 py-2 px-4">Role</td>
                    <td class="border border-gray-300 py-2 px-4">Actions</td>
                </tr>
            </thead>
            <tbody>
                <tr class="text-left" v-for="user in users" :key="user?.id">
                    <td class="border border-gray-300 py-2 px-4">{{ user?.id }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ user?.name }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ user?.email }}</td>
                    <td class="border border-gray-300 py-2 px-4">{{ user?.role }}</td>
                    <td class="border border-gray-300 py-2 px-4">
                        <a href="">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
</template>