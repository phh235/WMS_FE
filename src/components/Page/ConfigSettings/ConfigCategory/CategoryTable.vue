<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky" @click="$emit('sort', toggleSortByName)">{{
            $t('ConfigSettings.categories.category_name') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col">{{ $t('ConfigSettings.categories.category_desc') }}</th>
          <th scope="col">{{ $t('ConfigSettings.categories.warehouse_name') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="categories.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.categories.not_found') }}</td>
        </tr>
        <tr v-for="category in paginatedCategories" :key="category.sysIdDanhMuc">
          <td scope="row">{{ category.sysIdDanhMuc }}</td>
          <td class="sticky">{{ category.tenDanhMuc }}</td>
          <td>{{ category.moTa }}</td>
          <td>{{ category.tenKho }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', category)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', category.sysIdDanhMuc)">
              <span class="material-symbols-outlined d-flex align-items-center">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
        @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed } from 'vue';
import Pagination from '@/components/Common/Pagination/Pagination.vue';

const { t } = useI18n();

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete', 'sort']);

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.categories.length / pageSize.value);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.categories.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (itemsPerPage) => {
  pageSize.value = itemsPerPage;
  currentPage.value = 1;
};
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>
