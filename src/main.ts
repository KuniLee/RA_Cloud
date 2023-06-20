import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.css'
import './styles/theme.css'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { app } from './firebase'
import { createPinia } from 'pinia'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueFire, {
    firebaseApp: app,
    modules: [VueFireAuth()],
  })
  .mount('#app')
