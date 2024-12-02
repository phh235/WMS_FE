<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { updateTheme } from '@/theme/themeManager';
import { useAuthStore } from "@/store/authStore";

const { locale } = useI18n();

// Biến trạng thái để lưu chế độ Light/Dark
const isDarkMode = ref(false);
const authStore = useAuthStore();

// Hàm để cập nhật ngôn ngữ
const updateLanguage = (lang) => {
  locale.value = lang === 'VI' ? 'vi' : 'en';
};

// Hàm lấy theme từ localStorage
const getThemeFromLocalStorage = () => {
  const savedTheme = localStorage.getItem('isDarkMode');
  return savedTheme ? JSON.parse(savedTheme) : false; // Mặc định là Light theme
};

// Khi ứng dụng khởi tạo, cung cấp theme và ngôn ngữ cho các component con
onMounted(() => {

  const savedLanguage = localStorage.getItem('language') || 'VI';
  const savedTheme = getThemeFromLocalStorage();

  // Cập nhật ngôn ngữ và theme
  updateLanguage(savedLanguage);
  isDarkMode.value = savedTheme;
  updateTheme(savedTheme); // Áp dụng theme khi tải

  // Cung cấp giá trị isDarkMode cho toàn bộ các component con
  provide('isDarkMode', isDarkMode);

  // Kiểm tra nếu account có active === false thì chuyển hướng về trang login
  if (sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user")).active === false) {
    authStore.logout();
  }
});
</script>
