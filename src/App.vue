<template>
  <router-view></router-view>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Sử dụng computed để lấy giá trị headerTitle từ meta của route hiện tại
const headerTitle = computed(() => route.meta.headerTitle || "Default Title");

// Theo dõi sự thay đổi của route và cập nhật tiêu đề trang
watchEffect(() => {
  document.title = headerTitle.value;
});
</script>
