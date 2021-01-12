import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/styles.scss'
createApp(App).use(router).mount('#app')
