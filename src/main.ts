import { createApp } from 'vue'
import App from './App.vue'
// tailwind css
import './assets/styles/tailwind.css'
import i18n from './i18n'
// router
import { router } from './router'

const app = createApp(App)

app.use(router);
app.use(i18n)
app.mount('#app')

