<template>
  <main class="container-fluid p-0">
    <!-- Logo and Title -->
    <div
      class="mb-4 top-0 start-0 position-absolute p-2 d-flex align-items-center justify-content-center user-select-none">
      <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" alt="Logo WMS"
        width="45" class="me-2 rounded-4" />
      <p class="h6 fw-bold mt-2"> {{ $t("Login_forgot_form.logo_title") }}
      </p>
    </div>
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <div class="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center">
        <!-- Form -->
        <router-view></router-view>
      </div>
      <div class="col-12 col-lg-7 text-black vh-100 d-none d-lg-block">
        <!-- <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1725710674/aepjhdbiizkukw60fhuf.png" alt="Logo WMS"
          class="w-100 h-100 user-select-none" /> -->
        <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" alt="Logo WMS"
          class="w-100 h-100 user-select-none" />
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

/* .container-fluid {
  overflow: hidden;
  background-color: #ffffff;
  background-image: radial-gradient(rgba(0, 0, 0, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
} */
/* 
@media screen and (max-width: 992px) {
  .container-fluid {
    background-image: url("https: //res.cloudinary.com/dnfccnxew/image/upload/v1728920131/ghtmiow7s3tkln31gexr.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
} */
</style>
