import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(
  createPersistedState({
    key: (id) => (console.log(id), `__persisted__${id}`),
    storage: sessionStorage
  })
)

app.use(pinia)
app.use(router)

app.mount('#app')
