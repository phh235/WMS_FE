<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// Hàm để cập nhật ngôn ngữ
const updateLanguage = (lang) => {
  locale.value = lang === 'VI' ? 'vi' : 'en';
};

// Khởi tạo ngôn ngữ khi ứng dụng được tạo
onMounted(() => {
  const savedLanguage = localStorage.getItem('language') || 'VI';
  updateLanguage(savedLanguage);
});
</script>