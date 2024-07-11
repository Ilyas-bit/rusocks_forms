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
        type: 'text',
        validationSchema: 'yup.string().required()'
      },
      {
        name: 'email',
        placeholder_value: 'Email',
        type: 'email',
        validationSchema: 'yup.string().required().email()'
      },
      {
        name: 'companyName',
        placeholder_value: 'Название компании',
        type: 'text',
        validationSchema: 'yup.string().required()'
      },
      {
        name: 'password',
        placeholder_value: 'Пароль',
        type: 'password',
        validationSchema: 'yup.string().required().min(6)'
      },
      {
        name: 'passwordConfirm',
        placeholder_value: 'Подтверждение пароля',
        type: 'password',
        validationSchema: 'yup.string().required().min(6).oneOf([yup.ref("password")])'
      },
      {
        name: 'acceptTerms',
        type: 'checkbox',
        validationSchema: 'yup.boolean().oneOf([true])'
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
