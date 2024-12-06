<template>
  <div class="row">
    <div class="col-12 col-md-6 vh-100">
      <TotalCategory />
    </div>
    <div class="col-12 col-md-6 vh-100">
      <TotalProduct />
    </div>
  </div>
</template>

<script setup>
import TotalCategory from "./Detail/TotalProduct.vue";
import TotalProduct from "./Detail/TotalCategory.vue";
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-12 {
  width: 100%;
}

.col-md-6 {
  width: 50%;
}
</style>
