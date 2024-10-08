<template>
  <main class="container-fluid p-0">
    <!-- Logo and Title -->
    <div
      class="mb-4 top-0 start-0 position-absolute p-2 d-flex align-items-center justify-content-center user-select-none"
    >
      <img
        src="https://res.cloudinary.com/dnfccnxew/image/upload/v1727249885/fqzo9a6ok3qk4ykxnzxu.png"
        alt="Logo WMS"
        width="30"
        class="me-2"
      />
      <p class="h6 fw-bold mt-2">Quản lý kho hàng - WMS</p>
    </div>
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <div
        class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-black"
      >
        <!-- Form -->
        <router-view></router-view>
      </div>
      <div class="col-12 col-md-6 text-black vh-100 d-none d-lg-block">
        <img
          src="https://res.cloudinary.com/dnfccnxew/image/upload/v1725710674/aepjhdbiizkukw60fhuf.png"
          alt="Logo WMS"
          class="w-100 h-100 user-select-none"
        />
      </div>
    </div>
  </main>
  <Cre />
</template>

<script setup>
import Cre from "@layouts/Cre/Cre.vue";
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
}
</style>
