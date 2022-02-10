<template>
  <div class="error-modal p-6 text-white fixed">
    <h1>{{ error || 'Something went wrong' }}</h1>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style scoped>
.error-modal {
  top: 70px;
  border-radius: 5px;
  left: 50%;
  background: var(--c-accent);
  transform: translateX(-50%);
  z-index: 9999;
}
</style>