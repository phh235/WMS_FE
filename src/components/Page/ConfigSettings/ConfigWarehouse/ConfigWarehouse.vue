<script setup>
import LocateComp from "./ConfigComp/LocateComp.vue";
import WarehouseComp from "./ConfigComp/WarehouseComp.vue";
import WarehouseTypeComp from "./ConfigComp/WarehouseTypeComp.vue";
</script>

<template>
  <div class="row">
    <div class="col-12">
      <WarehouseComp />
    </div>
    <div class="col-12 mt-3">
      <WarehouseTypeComp />
    </div>
    <div class="col-12 mt-3 mb-5">
      <LocateComp />
    </div>
  </div>
</template>
