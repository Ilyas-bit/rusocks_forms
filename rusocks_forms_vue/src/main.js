import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Функция для инициализации Vue приложения
function initializeApp() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

function checkAppealNewChangeFormStore() {
  return new Promise((resolve) => {
    if (window.appealNewChangeFormStore) {
      resolve(true)
    } else {
      const intervalId = setInterval(() => {
        if (window.appealNewChangeFormStore) {
          clearInterval(intervalId)
          resolve(true)
        }
      }, 1000)
    }
  })
}

checkAppealNewChangeFormStore().then(() => {
  initializeApp()
})
