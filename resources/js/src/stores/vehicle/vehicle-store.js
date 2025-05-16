import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { getData, postData, putData, deleteData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";

export const useVehicleStore = defineStore("vehicle-store", () => {

    const vehicleData = ref({});
    const vehicleInput = ref({"name":"", "model":"", "price":""});
    const modalVal = ref(false);
    const loading = ref(false);
    const edit = ref(false);

    function toggleModal(){
        modalVal.value = !modalVal.value;
        if(edit.value){
            edit.value = false;
            vehicleInput.value = {};
        }
    }

    async function editVehicle(){
        return await putData(`/vehicles`,{...vehicleInput.value});
    }

    async function createVehicle()
    {
        return await postData(`/vehicles`,{...vehicleInput.value});
    }

    const rules = {
        name: {required},
        model: {required},
        price: {required, numeric},
    };

    const vehicleValidation$ = useVuelidate(rules, vehicleInput)

    async function createOrUpdateVehicle(){
        const valid = await vehicleValidation$.value.$validate();
        if(!valid) return;

        try{
            loading.value = true;
            const data = edit.value ? await editVehicle()
                : await createVehicle();
            vehicleValidation$.value.$reset();
            edit.value = false;
            toggleModal();
            vehicleInput.value = {"name":"", "model":"", "price":""};
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

    async function deleteVehicle(id){
        try{
            loading.value = true;
            const data = await deleteData(`/vehicles`,{id:id});
            console.log(data);
            successMsg(data?.message);
            loading.value = false;
        }catch(error){
            loading.value = false;
            for(const message of error){
                showError(message)
            }
        }
    }

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
        createOrUpdateVehicle,
        deleteVehicle,
        modalVal,
        toggleModal,
        getVehicles,
        edit,
        vehicleData,
        loading,
        vehicleValidation$,
        vehicleInput,
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot))
}