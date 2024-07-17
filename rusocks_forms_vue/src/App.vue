<template>
  <div class="form-container-app">
    <CustomErrorMessage
      v-if="arrayError.length"
      class="form-container__error-message"
      :arrayError="arrayError"
    />
    <div class="form-wrapper-app">
      <div class="form-wrapper__text">
        Цены и заказ доступны только зарегистрированным и авторизованным оптовым покупателям. Все
        поля формы обязательные.
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

const arrayError = ref([])

const onSubmit = handleSubmit(async (values) => {
  let formData = { ...values }

  if (formData.fullName) {
    const parts = formData.fullName.split(' ')
    formData.surname = parts[0] || ''
    formData.name = parts[1] || ''
    formData.patronymic = parts[2] || ''
  }

  try {
    const response = await fetch(formSettings.submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status)
    }

    const responseData = await response.json()

    if (responseData && responseData.errors) {
      arrayError.value = responseData.errors
      throw new Error('Ошибка сервера: ' + responseData.message)
    }

    arrayError.value = []
    resetForm()
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
    arrayError.value = ['Ошибка при отправке формы']
  }
})
</script>

<style scoped>
.form-container-app {
  margin: 0 auto;
  max-width: 904px;
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
  max-width: 408px;
}
.form-wrapper__text {
  font-family: Montserrat;
  margin-bottom: 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
}
.form-wrapper__text-password {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 16px;
}
.twpx-catalog-auth__form_button {
  text-align: center;
  margin-bottom: 32px;
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
  margin-bottom: 96px;
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
    font-family: Montserrat;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    line-height: 37px;
  }
  .form-container__header {
    margin-bottom: 37px;
  }
  .form-container__error-message {
    margin-bottom: 53px;
  }
  .twpx-catalog-auth__form_button {
    margin-bottom: 16px;
  }
}
</style>
