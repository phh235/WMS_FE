<template>
  <div class="container-fluid p-0">
    <MenuBar />
    <div class="p-3">
      <router-view></router-view>
    </div>
  </div>
  <Cre />
</template>

<script setup>
import MenuBar from "@components/Header/MenuBar/index.vue";
import Cre from "@layouts/Cre/Cre.vue";
</script>
