<template>
  <div class="error-modal p-6 text-white fixed">
    <h1>Error</h1>
  </div>
</template>

<style scoped>
.error-modal {
  top: 200px;
  border-radius: 5px;
  left: 50%;
  background: var(--c-accent);
  transform: translateX(-50%);
  z-index: 99;
}
</style>