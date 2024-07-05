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
      :class="{ 'input-error': showError }"
      @focus="focused = true"
      @blur="focused = false"
    />
    <label :for="placeholder_value" class="">{{ placeholder_value }}</label>
  </div>
  <!-- <span v-if="errorMessage && !focused" class="error-message">{{ errorMessage }}</span> -->
</template>

<script setup>
import { useField } from 'vee-validate'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  name: String,
  type: String,
  placeholder_value: String
})

const { value, errorMessage } = useField(props.name)
const focused = ref(false)

const showError = computed(() => errorMessage.value && !focused.value)

// Слежение за изменениями в поле ввода, чтобы обновлять состояние при вводе текста
watch(value, (newValue) => {
  if (newValue) {
    focused.value = true
  } else {
    focused.value = false
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
