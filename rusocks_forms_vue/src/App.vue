<template>
  <div class="form-wrapper">
    <form novalidate @submit="onSubmit">
      <CustomInput name="name" placeholder_value="ФИО" />
      <CustomInput name="email" type="email" placeholder_value="Email" />
      <CustomInput name="сompanyName" placeholder_value="Название компании" />
      <CustomInput name="password" type="password" placeholder_value="Пароль" />
      <CustomInput
        name="passwordConfirm"
        type="password"
        placeholder_value="Подтверждение пароля"
      />
      <button class="twpx-catalog-auth__form_button">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from './components/custom-input.vue'

// Установка кастомных сообщений на русском языке
yup.setLocale({
  mixed: {
    required: 'Это поле обязательно для заполнения',
    oneOf: 'Значения должны совпадать'
  },
  string: {
    email: 'Введите корректный адрес электронной почты',
    min: 'Минимальная длина поля ${min} символов'
  }
})

const schema = yup.object({
  name: yup.string().required('Введите ваше имя'),
  сompanyName: yup.string().required('Введите вашу фамилию'),
  email: yup
    .string()
    .required('Введите адрес электронной почты')
    .email('Некорректный адрес электронной почты'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
  passwordConfirm: yup
    .string()
    .required('Введите подтверждение пароля')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style scoped>
.form-wrapper {
  width: 408px;
}
.twpx-catalog-auth__form_button {
  border-radius: 3px;
  height: 48px;
  padding: 0;
  border: none;
  font: inherit;
  color: #fff;
  width: 100%;
  background-color: #000;
}
</style>
