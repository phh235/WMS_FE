<template>
  <div class="container-fluid p-3 box-shadow">
    <router-view />
  </div>
</template>

<style scoped>
.container-fluid {
  width: 70%;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

@media screen and (max-width: 1200px) {
  .container-fluid {
    width: 100%;
  }
}
</style>
