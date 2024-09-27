<template>
  <div class="container p-4 rounded-2">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}
</style>
