<template>
  <div v-if="arrayError.length" class="custom-error-massage">
    <img src="../icons/IconAlert.svg" alt="" />
    <div>
      <div class="custom-error-massage__item" v-for="(error, index) in arrayError" :key="index">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  arrayError: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.custom-error-massage {
  box-sizing: border-box;
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

.custom-error-massage__item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
