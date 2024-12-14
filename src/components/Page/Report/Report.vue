<template>
  <div class="row">
    <div class="col-12 col-md-6 vh-100">
      <CardIBOB />
      <WasteRecently />
    </div>
    <div class="col-12 col-md-6 vh-100">
      <TotalProduct />
    </div>
  </div>
</template>

<script setup>
import TotalProduct from "./Detail/TotalProduct.vue";
import CardIBOB from "./Detail/CardIBOB.vue";
import WasteRecently from "./Detail/WasteRecently.vue";
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
