<template>
  <div class="custom-error-massage">
    <img src="../icons/IconAlert.svg" alt="" />
    {{ textError }}
  </div>
</template>

<script setup>
const props = defineProps({
  textError: String
})
</script>

<style scoped>
.custom-error-massage {
  width: 100%;
  color: #fff;
  background-color: #ff0d0d;
  text-align: center;
  padding: 23px 16px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.custom-error-massage img {
  margin-right: 16px;
}
</style>
