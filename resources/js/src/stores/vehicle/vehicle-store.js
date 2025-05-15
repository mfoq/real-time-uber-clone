import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";

export const useVehicleStore = defineStore("vehicle-store", () => {

    const vehicleData = ref({});
    const loading = ref(false);
  
    // function toggleModal(id){
    //     modalVal.value = !modalVal.value;
    //     userId.value = id;
    // }

    // async function modifyRole(role) {
    //     try{
    //         loading.value = true;
    //         const data = await postData(`/users/modify-role`,{
    //             role:role,
    //             userId:userId.value
    //         });
    //         successMsg(data.message);
    //         getUsers();
    //         loading.value = false;
    //     }catch(error){
    //         loading.value = false;
    //         console.log(error);
    //         for(const message of error){
    //             showError(message)
    //         }
    //     }
    // }

    async function getVehicles() {
        try{
            loading.value = true;
            const data = await getData(`/vehicles`,);
            vehicleData.value = data;
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
        getVehicles,
        vehicleData,
        loading,
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot))
}