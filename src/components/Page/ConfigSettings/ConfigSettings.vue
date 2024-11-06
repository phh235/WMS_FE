<template>
  <div class="container-fluid p-3 box-shadow">
    <router-view />
  </div>
</template>

<style scoped>
.container-fluid {
  width: 100%;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

@media screen and (max-width: 1200px) {
  .container-fluid {
    width: 100%;
  }
}
</style>
