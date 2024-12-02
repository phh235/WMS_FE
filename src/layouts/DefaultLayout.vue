<template>
  <div class="container-fluid p-0">
    <MenuBar class="navbar-sticky" />
    <div class="p-3">
      <router-view></router-view>
    </div>
  </div>
  <Cre />
  <div v-if="$route.path !== '/inventory/scan-qr'" class="position-fixed bottom-0 end-0 p-2 py-2 user-select-none">
    <router-link to="/inventory/scan-qr" class="btn btn-primary">
      <span class="material-symbols-outlined align-middle me-2">qr_code_scanner</span>
      Tìm lô hàng
    </router-link>
  </div>
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
