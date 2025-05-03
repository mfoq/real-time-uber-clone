import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from "../../helper/http";
import { showError, successMsg, setUserData, getUserData } from "../../helper/utils";


export const useLoginStore = defineStore("login", () => {

    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const loading = ref(false);
    
    const step1Input = ref({email: ""});
    const step2Input = ref({password: ""});

    const rulesStep1Input = {
        email: {required, email},
    };

    const rulesStep2Input = {
        password: {required},
    };

    const vStep1$ = useVuelidate(rulesStep1Input, step1Input)
    const vStep2$ = useVuelidate(rulesStep2Input, step2Input)

    async function next(){
        const valid = await vStep1$.value.$validate();
        if(!valid) return;
        
        currentStep.value = step2.value;
    }

    function previous(){
        currentStep.value = step1.value;
    }

    async function signin() {

        const valid = await vStep2$.value.$validate();
        if(!valid) return;
       
        try{
            loading.value = true;
            const data = await postData('/login',
                    {...step1Input.value, ...step2Input.value});

            //http (set the authenticated user token in the local storage to use it in the future requests)
            setUserData(data);

            //redirect the authenticated user to the dashboard page
            window.location.href = '/app/dashboard';

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
        step1,
        step2,
        step1Input,
        step2Input,
        signin,
        vStep1$,
        vStep2$,
        loading,
        logout,

        next,
        previous,
        currentStep
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}