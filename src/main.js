import { createApp} from 'vue'
import App from './App.vue'
import 'bootstrap'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

createApp(App).use(router).use(BootstrapVue).mount('#app')
