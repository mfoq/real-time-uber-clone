import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export const useSignUpStore = defineStore("signup-store", () => {

    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const step3 = ref("step3");

    const step1Input = ref({name: "", email: ""});
    const rulesStep1Input = {
         name: {required},
         email: {required, email}
    };

    const v$ = useVuelidate(rulesStep1Input, step1Input)

    function moveStep1(){
        currentStep.value = step1.value;
    }

    async function moveStep2(){
        const valid = await v$.value.$validate();
        if(!valid) return;
        currentStep.value = step2.value;
    }

    function moveStep3(){
        currentStep.value = step3.value;
    }


    return {
        step1,
        step2,
        step3,
        step1Input,
        v$,
        moveStep1,
        moveStep2,
        moveStep3,
        currentStep
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot))
}