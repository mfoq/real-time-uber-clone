import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from "../../helper/http";
import { showError, successMsg, setUserData, getUserData } from "../../helper/utils";


export const useLoginStore = defineStore("login", () => {

    const userData = ref({});

    async function logout() {
        try{
            const userData = getUserData();

            loading.value = true;
            const data = await postData('/logout',
                    {userId: userData?.user?.id});

            //redirect the user to the login page
            localStorage.clear();
            window.location.href = '/app/login';

            //cookie
            successMsg(data?.message);

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
       
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}