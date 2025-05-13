<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../../../../stores/user/user-store';


    const userStore=useUserStore()
    const props = defineProps(["show", "roles","loading"]);

    const emit=defineEmits(['toggleModal'])
    const role=ref(null)

    function changeRole(event){
        console.log(event.target.value)
        role.value=event.target.value
    }

    async function saveRole(){
        userStore.modifyRole(role.value)
    }
</script>

<template>
    <BaseModal :show="props.show">
        <template #title>Edit Role</template>
        <template #body>
            <select @change="changeRole" name="" id="" class="mb-2 border rounded-md p-2 w-[100%]">
                <option value="">Select a role ..</option>
                <option :value="role" v-for="role in roles" :key="role">
                    {{role}}
                </option>
            </select>
        </template>
        <template #footer>
            <button @click="emit('toggleModal')" class="border border-indigo-700 text-gray-700 p-2 mb-2 rounded-md shadow-sm">Close</button>
            <button 
                        :disabled="loading" 
                        @click="saveRole" 
                        class="bg-indigo-700 text-white p-2 mb-2 rounded-md shadow-sm">
                {{ loading ? 'Saving...' : 'Save'  }}
            </button>
        </template>
    </BaseModal>
</template>