<template>
  <input type="checkbox" v-model="value" />
  <p :class="['norm', { 'twpx-catalog-auth__form-control--error': errorMessage }]">
    Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookies и других
    пользовательских данных, в соответствии с политика обработки персональных данных.
  </p>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: String
})

const { value, errorMessage, validate } = useField(props.name)
</script>

<style scoped>
.twpx-catalog-auth__form-control--error {
  color: rgb(255, 0, 0);
}
</style>
