import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')