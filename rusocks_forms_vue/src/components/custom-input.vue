<template>
  <div
    :class="[
      'twpx-catalog-auth__form-control',
      { 'twpx-catalog-auth__form-control--active': value || focused },
      { 'twpx-catalog-auth__form-control--error': showError }
    ]"
  >
    <input
      :id="placeholder_value"
      v-model="value"
      :type="type || 'text'"
      :inputmode="isTel ? 'tel' : undefined"
      :class="{ 'input-error': showError }"
      @focus="focused = true"
      @blur="focused = false"
      @paste="onPaste"
      ref="input"
    />
    <label :for="placeholder_value">{{ placeholder_value }}</label>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { ref, computed, onMounted, watch } from 'vue'
import Inputmask from 'inputmask'

const props = defineProps({
  name: String,
  type: String,
  placeholder_value: String
})

const { value, errorMessage } = useField(props.name)
const focused = ref(false)
const showError = computed(() => errorMessage.value && !focused.value)

const isTel = computed(() => props.type === 'tel')

const onPaste = (event) => {
  if (!isTel.value) {
    return
  }

  const clipboardData = event.clipboardData || window.clipboardData
  let pastedData = clipboardData.getData('Text')

  if (pastedData.startsWith('+7')) {
    pastedData = pastedData.slice(2)
  } else if (pastedData.startsWith('8')) {
    pastedData = pastedData.slice(1)
  }

  const cleanedData = pastedData.replace(/\D/g, '')

  value.value = cleanedData
  event.preventDefault()
}

onMounted(() => {
  if (isTel.value) {
    const inputElement = document.querySelector(`#${props.placeholder_value}`)
    Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: false,
      placeholder: '_'
    }).mask(inputElement)
  }
})

watch(value, (newValue) => {
  if (newValue) {
    focused.value = true
  } else {
    focused.value = false
  }
})

onMounted(() => {
  if (value.value) {
    focused.value = true
  }
})
</script>

<style scoped>
.twpx-catalog-auth__form-control {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0 0 16px;
  position: relative;
}
.twpx-catalog-auth__form-control input {
  box-sizing: border-box;
  font-size: 14px;
  display: block;
  width: 100%;
  background-color: transparent;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  height: 48px;
  line-height: 48px;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
  padding: 0 15px;
}
.twpx-catalog-auth__form-control input:focus {
  border: 1px solid #000;
  outline: none;
}
.twpx-catalog-auth__form-control label {
  user-select: none;
  cursor: text;
  position: absolute;
  top: 0;
  left: 0;
  color: #3e3e3e;
  font-size: 14px;
  font-weight: normal;
  transform: translateY(0.9rem);
  transition:
    transform 0.5s ease,
    font-size 0.5s ease;
  margin-left: 15px;
  z-index: 10;
}
.twpx-catalog-auth__form-control input:focus + label,
.twpx-catalog-auth__form-control.twpx-catalog-auth__form-control--active input + label {
  font-size: 9px;
  transform: translateY(0.25rem);
  color: #3e3e3e;
}
.twpx-catalog-auth__form-control--error input {
  background-color: #ffe6e6;
  border-color: red;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

@media (max-width: 768px) {
}
</style>
