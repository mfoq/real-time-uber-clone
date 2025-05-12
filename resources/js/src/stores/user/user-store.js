import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { showError } from "../../helper/utils";

export const useUserStore = defineStore("user-store", () => {

    const userData = ref({});
    const loading = ref(false);

    async function getUsers(page = 1, query = '') {
        try{
            loading.value = true;
            const data = await getData(`/users?page=${page}&query=${query}`,);
            userData.value = data;

            loading.value = false;

        }catch(error){
            loading.value = false;

            console.log(error);

            for(const message of error){
                showError(message)
            }
        }
    }

    return {
        getUsers,
        userData,
        loading,
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}