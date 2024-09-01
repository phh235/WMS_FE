<script setup>
import MenuBar from "@components/Header/MenuBar/index.vue";
</script>

<template>
  <div class="container-fluid p-0">
    <MenuBar />
    <router-view></router-view>
  </div>
</template>
