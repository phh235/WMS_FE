<template>
  <div class="container-fluid box-shadow p-3">
    <router-view />
  </div>
</template>

<script setup>

</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}
</style>
