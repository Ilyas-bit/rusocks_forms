<template>
  <div class="form-container">
    <h2 class="form-container__header">Зарегистристрироваться</h2>
    <CustomErrorMassage
      class="form-container__error-message"
      textError="Пользователь с таким Email уже существует."
    />
    <div class="form-wrapper">
      <div class="form-wrapper__text">
        Цены и заказ доступны только зарегистрированным и авторизованным оптовым покупателям. Все
        поля формы обязательные.
      </div>
      <form novalidate @submit="onSubmit">
        <template v-for="(field, index) in formSettings.fields" :key="index">
          <CustomInput
            v-if="field.type !== 'checkbox'"
            :name="field.name"
            :type="field.type"
            :placeholder_value="field.placeholder_value"
            :required="field.required"
          />
          <CustomChekbox v-else :name="field.name" :required="field.required" />
        </template>
        <button :class="formSettings.submitButton.className">
          {{ formSettings.submitButton.text }}
        </button>
        <div class="form-wrapper__login-link">Уже зарегистрированы?<br />Тогда жмите Войти.</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from './components/custom-input.vue'
import CustomErrorMassage from './components/custom-error-message.vue'
import CustomChekbox from './components/custom-checkbox.vue'

const formSettings = window.appealNewChangeFormStore.formSettings

let schemaObject = {}

formSettings.fields.forEach(function (item) {
  const strValidationSchema = item.validationSchema
  const yupOobject = eval(`${strValidationSchema}`)
  schemaObject[item.name] = yupOobject
})

const schema = yup.object().shape(schemaObject)

const initialValuesFromJson = {
  acceptTerms: true
}

const { handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: initialValuesFromJson
})

const onSubmit = handleSubmit((values) => {
  const [surname, name, patronymic] = values.fullName.split(' ')
  const formData = { ...values, surname, name, patronymic }
  alert(JSON.stringify(formData, null, 2))
})
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  padding: 40px 12px;
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
.form-wrapper {
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
    font-weight: 400; /* normal */
    font-style: normal; /* normal */
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
