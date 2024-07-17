<template>
  <label class="license-agreement-auth__container">
    <input
      class="license-agreement-auth__checkbox"
      :class="[
        'license-agreement-auth__checkbox-input',
        { 'license-agreement-auth__checkbox-input--error': errorMessage }
      ]"
      type="checkbox"
      v-model="isChecked"
      :checked="isChecked"
      @change="validateCheckbox"
    />
    <span
      :class="[
        'license-agreement-auth__fake-checkbox',
        { 'license-agreement-auth__fake-checkbox--error': errorMessage }
      ]"
    ></span>
    <p
      :class="[
        'license-agreement-auth__text',
        { 'license-agreement-auth__text--error': errorMessage }
      ]"
    >
      {{ name }}
    </p>
    <!-- <span v-if="errorMessage && !focused" class="error-message">{{ errorMessage }}</span> -->
  </label>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  required: Boolean
})

const { value, errorMessage, validate } = useField(props.name)

const isChecked = value

const validateCheckbox = () => {
  if (props.required) {
    validate(isChecked)
  }
}
</script>

<style scoped>
.license-agreement-auth__container {
  text-align: start;
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
  border: 2px solid #000000;
  margin-right: 15px;
  transition:
    background-color 0.1s ease,
    border-color 0.1s ease;
}

.license-agreement-auth__fake-checkbox--error {
  border-color: #ff0000;
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
  transition: transform 0.1s ease;
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
  transition: transform 0.1s ease;
}

.license-agreement-auth__checkbox:checked + .license-agreement-auth__fake-checkbox {
  border-color: #000000;
  background-color: #000000;
}

.license-agreement-auth__text {
  display: inline-block;
  margin-top: 0px;
  user-select: none;
  transition: color 0.1s ease;
}

.license-agreement-auth__text--error {
  color: #ff0000;
}

@media (max-width: 768px) {
  .license-agreement-auth__container {
    margin-top: 0px;
  }
}
</style>
