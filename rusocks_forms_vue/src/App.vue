<template>
  <div class="form-container-app">
    <div class="form-container__error-message">
      <CustomErrorMessage v-if="objectError.length" :objectError="objectError" />
    </div>

    <div class="form-wrapper-app">
      <div class="form-wrapper-app_shell">
        <div
          v-if="
            formSettings &&
            (formSettings.heading?.text || formSettings.text || formSettings.heading)
          "
          class="form-wrapper__text"
        >
          {{ formSettings.heading.text }}
        </div>
        <form novalidate @submit.prevent="onSubmit">
          <template v-for="(field, index) in formSettings.fields" :key="index">
            <CustomInput
              v-if="field.type !== 'checkbox'"
              :name="field.name"
              :type="field.type"
              :placeholder_value="field.placeholder_value"
              :required="field.required"
              v-model="values[field.name]"
              :error="errors[field.name]"
            />
            <CustomCheckbox
              v-else
              :name="field.name"
              :agreementText="field.agreementText"
              :required="field.required"
              v-model="values[field.name]"
              :error="errors[field.name]"
            />
          </template>
          <button class="twpx-catalog-auth__form_button">
            {{ formSettings.submitButton.text }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from './components/custom-input.vue'
import CustomErrorMessage from './components/custom-error-message.vue'
import CustomCheckbox from './components/custom-checkbox.vue'

const formSettings = window.appealNewChangeFormStore.formSettings

let schemaObject = {}
formSettings.fields.forEach((field) => {
  let schemaBuilder = yup.string()

  if (field.required) {
    schemaBuilder = schemaBuilder.required('Это поле обязательно для заполнения')
  }

  switch (field.type) {
    case 'email':
      schemaBuilder = schemaBuilder.email('Введите корректный email')
      break
    case 'password':
      schemaBuilder = schemaBuilder.min(6, 'Пароль должен содержать минимум 6 символов')
      break
    case 'checkbox':
      schemaBuilder = yup.boolean().oneOf([true], 'Вы должны согласиться с условиями')
      break
    case 'tel':
      schemaBuilder = schemaBuilder.matches(/^[\d\s()+-]+$/, 'Введите корректный номер телефона')
      break
    default:
      break
  }

  // Добавляем проверку для поля подтверждения пароля
  if (field.name === 'passwordConfirm') {
    schemaBuilder = yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Это поле обязательно для заполнения')
  }

  schemaObject[field.name] = schemaBuilder
})

const schema = yup.object().shape(schemaObject)

let initialValues = {}
formSettings.fields.forEach((field) => {
  initialValues[field.name] = field.initialValue
})

const { handleSubmit, resetForm, errors, values } = useForm({
  validationSchema: schema,
  initialValues: initialValues
})

const objectError = ref([])

const onSubmit = handleSubmit(async (values) => {
  let formData = { ...values }

  if (formData.fullName) {
    const parts = formData.fullName.split(' ')
    formData['REGISTER[LAST_NAME]'] = parts[0] || ''
    formData['REGISTER[NAME]'] = parts[1] || ''
    formData['REGISTER[SECOND_NAME]'] = parts[2] || ''
  }

  const form = new FormData()
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value)
  })
  console.log('FormData contents:')
  for (let pair of form.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`)
  }
  try {
    const response = await fetch(formSettings.submitUrl, {
      method: 'POST',
      body: form
    })

    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status)
    }

    const responseData = await response.json()

    if (responseData && responseData.errors) {
      objectError.value = responseData.errors
      console.log(a.value)
    } else {
      objectError.value = []
      resetForm()
    }
    // Если регистрация прошла успешно, перенаправляем на указанный URL
    if (
      responseData &&
      responseData.status === 'success' &&
      responseData.data &&
      responseData.data[0].url
    ) {
      window.location.href = responseData.data[0].url
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
    objectError.value = [
      {
        message: error.message,
        code: 0,
        customData: null
      }
    ]
  }
})
</script>

<style scoped>
.form-container-app {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container__header {
  margin-bottom: 16px;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 37px;
}
.form-wrapper-app {
  background: #fcfcfc 0% 0% no-repeat padding-box;
  width: 100%;
}
.form-wrapper-app_shell {
  margin: 0 auto;
  padding: 64px 30px 32px;
  max-width: 408px;
}
.form-wrapper__text {
  margin-bottom: 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
}
.form-wrapper__text-password {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 16px;
}
.twpx-catalog-auth__form_button {
  text-align: center;
  border-radius: 3px;
  height: 60px;
  padding: 0;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 18px;
  color: #fff;
  width: 100%;
  background-color: #000;
}
.form-container__error-message {
  box-sizing: border-box;
  width: 100%; /* Блок занимает всю ширину экрана */
  padding: 0 13px; /* Внутренние отступы по 13px слева и справа */
  margin: 0 auto 32px; /* Центрирование блока и отступ снизу 32px */
}

.form-wrapper__login-link {
  font: normal normal normal 16px/19px;
  text-align: center;
}
@media (max-width: 768px) {
  .form-container {
    padding: 22px 12px;
  }
  .form-wrapper {
    margin: 0 30px;
  }
  .form-container__header {
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    line-height: 37px;
  }
  .form-container__header {
    margin-bottom: 37px;
  }
  .form-container__error-message {
    margin-bottom: 23px;
  }
  .form-wrapper-app_shell {
    margin: 0 auto;
    padding: 30px 30px 16px;
    max-width: 408px;
  }
}
</style>
