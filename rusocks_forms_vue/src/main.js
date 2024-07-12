import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

window.appealNewChangeFormStore = {
  formSettings: {
    formName: 'AppealForm',
    action: '/submit',
    method: 'POST',
    fields: [
      {
        name: 'fullName',
        placeholder_value: 'ФИО',
        initialValue: 'ddd',
        type: 'text',
        required: true
      },
      {
        name: 'telephone',
        placeholder_value: 'Телефон',
        initialValue: 'ddd',
        type: 'tel',
        required: true
      },
      {
        name: 'email',
        placeholder_value: 'Email',
        initialValue: 'аааа',
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
        initialValue: 'ааа',
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
      text: 'Зарегистрироваться',
      className: 'twpx-catalog-auth__form_button'
    }
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
