import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import AppButton from './components/AppButton.vue'
import './assets/main.css'

const app = createApp(App)
app.component('AppButton', AppButton)
app.use(createPinia())
app.use(router)

app.mount('#app')
