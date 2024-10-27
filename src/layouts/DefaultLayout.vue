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
import { useUserStore } from "@/store/userStore";
import Cre from "@layouts/Cre/Cre.vue";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserByUsername(sessionStorage.getItem("user"));
})

</script>


<style scoped>
.container-fluid {
  background-color: var(--background-color);
  transition: all 0.2s ease;
}
</style>
