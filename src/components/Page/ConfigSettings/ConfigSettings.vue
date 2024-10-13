<template>
  <div class="container p-4 box-shadow">
    <router-view />
  </div>
</template>

<style scoped>
.container {
  width: 60%;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
  }
}
</style>
