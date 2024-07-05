<template>
  <label class="license-agreement-auth__container">
    <input class="license-agreement-auth__checkbox" type="checkbox" v-model="value" />
    <span class="license-agreement-auth__fake-checkbox"></span>
    <p
      :class="[
        'license-agreement-auth__text',
        { 'license-agreement-auth__form-control--error': errorMessage }
      ]"
    >
      Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookies и других
      пользовательских данных, в соответствии с политика обработки персональных данных.
    </p>
  </label>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: String
})

const { value, errorMessage, validate } = useField(props.name)
</script>

<style scoped>
.license-agreement-auth__container {
  margin-top: 3px;
  margin-bottom: 16px;
  display: flex;
  align-items: start;
}
.license-agreement-auth__checkbox {
  display: none;
}
.license-agreement-auth__fake-checkbox {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  min-width: 24px;
  background: #ffffff;
  border: 2px solid #ff0000;
  margin-right: 15px; /* отступ между чекбоксом и текстом */
  transition:
    background-color 0.2s ease-in,
    border-color 0.2s ease-in;
}
.license-agreement-auth__fake-checkbox::before {
  content: '';
  background-color: transparent;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: 1px;
  transition: transform 0.2s ease-in;
}

.license-agreement-auth__fake-checkbox::after {
  z-index: 10;
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: transform 0.2s ease-in;
}
.license-agreement-auth__checkbox:checked + .license-agreement-auth__fake-checkbox {
  border-color: #000000;
  background-color: #000000;
}

.license-agreement-auth__text {
  display: inline-block;
  margin-top: 0px;
  user-select: none;
  transition: color 0.2s ease-in;
}
.license-agreement-auth__form-control--error {
  transition: color 0.2s ease-in;
  color: rgb(255, 0, 0);
}

@media (max-width: 768px) {
  .license-agreement-auth__container {
    margin-top: 0px;
  }
}
</style>
