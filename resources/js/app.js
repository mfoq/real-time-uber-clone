import './bootstrap';

import { createApp } from 'vue';
import { router } from './src/router';
import App from './src/App.vue';
import { createPinia } from 'pinia';

// Toast Plugin
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

//sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


//Here is some code for auto import components
const importComponents = import.meta.glob('./src/components/**/*.vue');

function registerComponents(app) {
    for (const filePath of Object.keys(importComponents)) {
        const componentName = filePath.split('/').pop().replace('.vue', '');
        
        importComponents[filePath]().then(function(data) {
            app.component(componentName, data?.default);
        }).catch((error) =>console.log(error?.message ));
    }
}

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ToastPlugin);
app.use(VueSweetalert2);

registerComponents(app);
app.mount('#app');