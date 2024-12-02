<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.suppliers.supplier_id') }}</th>
          <th scope="col" @click="$emit('name', toggleSortByName)" class="sticky">{{
            $t('ConfigSettings.suppliers.supplier_name') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('company', toggleSortByCompany)">{{
            $t('ConfigSettings.suppliers.supplier_company')
          }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col">{{ $t('ConfigSettings.suppliers.supplier_phone') }}</th>
          <th scope="col">{{ $t('ConfigSettings.suppliers.supplier_address') }}</th>
          <th scope="col" class="text-center action">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="suppliers.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.suppliers.not_found') }}</td>
        </tr>
        <tr v-for="supplier in paginatedSuppliers" :key="supplier.sysIdNhaCungCap">
          <td scope="row">{{ supplier.sysIdNhaCungCap }}</td>
          <td class="sticky">{{ supplier.tenNhaCungCap }}</td>
          <td>{{ supplier.tenCongTy }}</td>
          <td>{{ supplier.soDienThoai }}</td>
          <td>{{ supplier.diaChi }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', supplier)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', supplier.sysIdNhaCungCap)">
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
  suppliers: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete', 'name', 'company']);


const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.suppliers.length / pageSize.value);
});

const paginatedSuppliers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.suppliers.slice(start, end);
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

/* th:nth-child(2) {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
} */

.action {
  width: 150px;
}
</style>