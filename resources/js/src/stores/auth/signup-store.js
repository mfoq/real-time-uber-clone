import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from "../../helper/http";
import { showError, successMsg, setUserData } from "../../helper/utils";

export const useSignUpStore = defineStore("signup-store", () => {

    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const step3 = ref("step3");

    const step1Input = ref({name: "mahmood", email: "m@g.com"});
    const step2Input = ref({password: ""});
    const step3Input = ref({otp_code: ""});
    const loading = ref(false);

    const rulesStep1Input = {
         name: {required},
         email: {required, email}
    };

    const rulesStep2Input = {
        password: {required},
    };
    
    const rulesStep3Input = {
        otp_code: {required},
   };

    const vStep1$ = useVuelidate(rulesStep1Input, step1Input)
    const vStep2$ = useVuelidate(rulesStep2Input, step2Input)
    const vStep3$ = useVuelidate(rulesStep3Input, step3Input)

    async function moveStep1(){
        const valid = await vStep1$.value.$validate();
        if(!valid) return;
        currentStep.value = step2.value;
    }

    function moveStep2(){
        currentStep.value = step1.value;
    }

    async function moveStep3(){
        const valid = await vStep2$.value.$validate();
        if(!valid) return;
        try{
            loading.value = true;
            const data = await postData('/users', {...step1Input.value, ...step2Input.value});
            successMsg(data?.message);

            loading.value = false;

            currentStep.value = step3.value;
        }catch(error){
            loading.value = false;

            for(const message of error){
                showError(message)
            }
        }
    }

    async function signupUser() {
        const valid = await vStep3$.value.$validate();
        if(!valid) return;
       
        try{
            loading.value = true;
            const data = await postData('/users/verify-email',
                     {...step3Input.value, ...step1Input.value});

            //http (set the authenticated user token in the local storage to use it in the future requests)
            setUserData(data);

            //redirect the authenticated user to the dashboard page
            window.location.href = '/app/dashboard';

            //cookie
            successMsg(data?.message);

            loading.value = false;

        }catch(error){
            loading.value = false;

            for(const message of error){
                showError(message)
            }
        }
    }

    return {
        step1,
        step2,
        step3,
        step1Input,
        step2Input,
        step3Input,
        vStep1$,
        vStep2$,
        vStep3$,
        signupUser,
        loading,

        moveStep1,
        moveStep2,
        moveStep3,
        currentStep
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot))
}