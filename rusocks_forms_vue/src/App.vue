<template>
  <div class="form-сontainer">
    <CustomErrorMassage
      class="error-message"
      textError="Пользователь с таким Email уже существует."
    />

    <div class="form-wrapper">
      <div class="form-wrapper__text">
        Цены и заказ доступны только зарегистрированным и авторизованным оптовым покупателям. Все
        поля формы обязательные.
      </div>
      <form novalidate @submit="onSubmit">
        <CustomInput name="name" placeholder_value="ФИО" />
        <CustomInput name="email" type="email" placeholder_value="Email" />
        <CustomInput name="companyName" placeholder_value="Название компании" />
        <CustomInput name="password" type="password" placeholder_value="Пароль" />
        <div class="form-wrapper__text-password">
          Пароль должен быть не менее 6 символов длиной.
        </div>
        <CustomInput
          name="passwordConfirm"
          type="password"
          placeholder_value="Подтверждение пароля"
        />
        <CustomChekbox name="acceptTerms" />
        <button class="twpx-catalog-auth__form_button">Отправить</button>
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
  companyName: yup.string().required('Введите вашу фамилию'),
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
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  acceptTerms: yup.boolean().oneOf([true], 'Вы должны принять условия использования')
})

const initialValuesFromJson = {
  name: '',
  email: '',
  companyName: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: true
}

const { handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: initialValuesFromJson // Используем начальные значения из JSON
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
  // Дополнительные действия по отправке формы, если необходимо
})
</script>

<style scoped>
.form-сontainer {
  margin: 0 auto;
  width: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-wrapper {
  width: 408px;
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
  margin-top: -8px;
  margin-bottom: 16px;
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

@media (min-width: 768px) {
  .error-message {
    margin-bottom: 96px;
  }
}
</style>
