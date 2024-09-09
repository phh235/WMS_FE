<script setup>
import MenuBar from "@components/Header/MenuBar/index.vue";
</script>

<template>
  <div class="container-fluid p-0">
    <MenuBar />
    <div class="p-3">
      <router-view></router-view>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 p-3">
    <span class="fw-bold" style="font-size: 14px"
      >Developed by <span style="color: var(--main-text-color)">Tech Tribe</span></span
    >
  </div>
</template>
