<template>
  <main class="container-fluid p-0">
    <!-- Logo and Title -->
    <div class="mb-4 top-0 start-0 position-absolute p-2 d-flex align-items-center user-select-none">
      <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" alt="Logo WMS"
        width="45" class="me-2 rounded-4" loading="lazy" />
      <p class="h6 fw-bold mt-2" style="color: var(--nav-link-color);"> {{
        $t("LoginForgotForm.logo_title") }}
      </p>
    </div>
    <div class="tab-container">
      <button v-for="tab in tabs" :key="tab" @click="changeLanguage(tab)"
        :class="['tab-button', { active: activeTab === tab }]">
        {{ tab }}
      </button>
    </div>
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <div class="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center">
        <!-- Form -->
        <router-view></router-view>
      </div>
      <div class="col-12 col-lg-7 vh-100 d-none d-lg-block">
        <!-- <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" alt="Logo WMS"
          class="w-100 h-100 user-select-none" /> -->
        <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1730820774/cfnfpawbgsu02hbmqrfn.png" alt="Logo WMS"
          class="w-100 h-100 user-select-none" loading="lazy" />
      </div>
    </div>
  </main>
  <Cre />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
import Cre from "@layouts/Cre/Cre.vue";
import { useAuthStore } from "@/store/authStore.js";

const { t, locale } = useI18n();
const authStore = useAuthStore();
const tabs = ["VI", "EN"];
const activeTab = ref("VI");

const changeLanguage = (tab) => {
  activeTab.value = tab;
  locale.value = tab === "VI" ? "vi" : "en";
  localStorage.setItem("language", tab);
  authStore.setLanguage(tab);
};

onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }
})
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
  background-color: var(--background-color);
  transition: all 0.2s ease;
}

.tab-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media screen and (max-width: 992.98px) {
  .container-fluid {
    overflow: hidden;
    background-color: var(--background-color);
    background-image: var(--background-image);
    background-size: 30px 30px;
    background-position: -5px -5px;
  }
}
</style>
