<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 mb-3 px-md-3 p-0">
        <CategoryList :categories="categoryStore.categories" @categorySelected="handleCategorySelected" />
      </div>
      <div class="col-12 col-md-9">
        <ProductTable :products="productStore.products" :selectedCategory="selectedCategory"
          @updateProducts="handleUpdateProducts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from "@/store/categoryStore.js";
import { useProductStore } from "@/store/productStore.js";
import CategoryList from './ProductCategoryList/ProductCategoriesList.vue';
import ProductTable from './ProductTable/ProductTable.vue';

const categoryStore = useCategoriesStore();
const productStore = useProductStore();
const selectedCategory = ref('');

onMounted(async () => {
  await productStore.getProducts();
  await categoryStore.getCategories();
});

const handleCategorySelected = (categoryId) => {
  selectedCategory.value = categoryId;
};

const handleUpdateProducts = async () => {
  await productStore.getProducts();
};
</script>

<style scoped>
.container-fluid {
  max-width: 1600px;
  /* padding: 15px; */
}

.box-shadow {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}
</style>