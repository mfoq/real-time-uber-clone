import './bootstrap';

import { createApp } from 'vue';
import { router } from './src/router';
import App from './src/App.vue';
import { createPinia } from 'pinia';

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
registerComponents(app);
app.mount('#app');