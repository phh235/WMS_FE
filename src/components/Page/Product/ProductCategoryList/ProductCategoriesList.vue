<template>
  <div class="category-selector box-shadow p-2">
    <div class="scrollable-wrapper" style="max-height: 740px; overflow-y: auto;">
      <ul class="list-group d-flex flex-md-column flex-row flex-nowrap overflow-auto">
        <li class="list-group-item flex-shrink-0 d-flex align-items-center px-3" @click="selectCategory('')"
          :class="{ active: selectedCategory === '' }">
          <span class="material-symbols-outlined me-2">open_in_new</span>
          {{ $t('Product.table.categories.title') }}
        </li>
        <li v-for="category in categories" :key="category.sysIdDanhMuc"
          class="list-group-item flex-shrink-0 d-flex align-items-center px-3"
          @click="selectCategory(category.sysIdDanhMuc)"
          :class="{ active: selectedCategory === category.sysIdDanhMuc }">
          <span class="material-symbols-outlined me-2">open_in_new</span>
          {{ category.tenDanhMuc }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: [String, Number],
    default: ''
  }
});

const emit = defineEmits(['categorySelected']);
const selectedCategory = ref('');

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  emit('categorySelected', categoryId);
};
</script>

<style scoped>
.list-group-item {
  border: none;
  margin: 3px 5px;
  font-size: 0.875rem;
  padding: 0.875rem 10px;
  transition: all .2s ease;
  border-radius: 0.625rem;
  background-color: var(--secondary-color);
  color: var(--nav-link-color);
}

.list-group-item:hover {
  background-color: var(--secondary-color-hover);
  border-radius: 0.625rem;
  cursor: pointer;
}

.list-group-item.active {
  background-color: var(--primary-color);
  border-radius: 0.625rem;
  color: var(--btn-primary-color) !important;
  margin: 3px 5px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}

.category-selector {
  background-color: var(--background-color);
  border: 1px solid var(--border-main-color) !important;
  border-radius: 8px;
}
</style>