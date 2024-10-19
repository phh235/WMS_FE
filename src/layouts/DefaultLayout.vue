<template>
  <div class="container-fluid p-0">
    <MenuBar class="navbar-sticky" />
    <div class="p-3">
      <router-view></router-view>
    </div>
  </div>
  <Cre />
</template>

<script setup>
import MenuBar from "@components/Header/MenuBar/MenuBar.vue";
import Cre from "@layouts/Cre/Cre.vue";
</script>


<style scoped>
.container-fluid {
  background-color: var(--background-color);
  transition: all 0.2s ease;
}
</style>
