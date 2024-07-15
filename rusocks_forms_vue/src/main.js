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
        initialValue: 'Иван Иванов Иванович',
        type: 'text',
        required: true
      },
      {
        name: 'telephone',
        placeholder_value: 'Телефон',
        initialValue: '89432742638',
        type: 'tel',
        required: true
      },
      {
        name: 'email',
        placeholder_value: 'Email',
        initialValue: 'asdfghjk@gmail.com',
        type: 'email',
        required: true
      },
      {
        name: 'companyName',
        placeholder_value: 'Название компании',
        initialValue: 'Рога и копыта',
        type: 'text',
        required: true
      },
      {
        name: 'password',
        placeholder_value: 'Пароль',
        initialValue: '123456789',
        type: 'password',
        required: true
      },
      {
        name: 'passwordConfirm',
        placeholder_value: 'Подтверждение пароля',
        initialValue: '123456789',
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
