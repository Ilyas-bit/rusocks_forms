import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const defaultFormStore = {
  formSettings: {
    fields: [
      {
        name: 'fullName',
        placeholder_value: 'ФИО',
        initialValue: 'ff',
        type: 'text',
        required: true
      },
      {
        name: 'telephone',
        placeholder_value: 'Телефон',
        initialValue: '',
        type: 'tel',
        required: true
      },
      {
        name: 'email',
        placeholder_value: 'Email',
        initialValue: '',
        type: 'email',
        required: true
      },
      {
        name: 'companyName',
        placeholder_value: 'Название компании',
        initialValue: '',
        type: 'text',
        required: true
      },
      {
        name: 'password',
        placeholder_value: 'Пароль',
        initialValue: '',
        type: 'password',
        required: true
      },
      {
        name: 'passwordConfirm',
        placeholder_value: 'Подтверждение пароля',
        initialValue: '',
        type: 'password',
        required: true
      },
      {
        name: 'acceptTerms',
        type: 'checkbox',
        initialValue: false,
        required: true
      }
    ],
    submitButton: {
      text: 'Зарегистрироваться'
    }
  }
}

if (!window.appealNewChangeFormStore) {
  window.appealNewChangeFormStore = defaultFormStore
}

app.use(createPinia())
app.use(router)

app.mount('#app')
