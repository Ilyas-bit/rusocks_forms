<template>
  <div v-if="objectError && objectError.length" class="custom-error-message">
    <img src="../icons/IconAlert.svg" alt="Alert Icon" />
    <div>
      <div
        v-for="(error, index) in objectError"
        :key="index"
        class="custom-error-message__item"
        v-html="error.message"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  objectError: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.custom-error-message {
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 880px;
  color: #fff;
  background-color: #ff0d0d;
  text-align: center;
  padding: 23px 16px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.custom-error-message img {
  margin-right: 16px;
}

.custom-error-message__item {
  line-height: 18px;
  text-align: start;
}
</style>
