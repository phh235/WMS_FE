<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky" @click="$emit('id', toggleSortById)">{{
            $t('ConfigSettings.warehouses.warehouse_id') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" @click="$emit('name', toggleSortByName)">{{ $t('ConfigSettings.warehouses.warehouse_name') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('area', toggleSortByArea)">{{ $t('ConfigSettings.warehouses.warehouse_area') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col">{{ $t('ConfigSettings.warehouses.warehouse_desc') }}</th>
          <th scope="col" @click="$emit('manager', toggleSortByManager)">{{ $t('ConfigSettings.warehouses.manager') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="warehouses.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.warehouses.not_found') }}</td>
        </tr>
        <tr v-for="warehouse in paginatedWarehouse" :key="warehouse.sysIdKho">
          <td scope="row" class="d-none">{{ warehouse.sysIdKho }}</td>
          <td class="sticky">{{ warehouse.maKho }}</td>
          <td>{{ warehouse.tenKho }}</td>
          <td>{{ warehouse.dienTich }}</td>
          <td>{{ warehouse.moTa }}</td>
          <td>{{ warehouse.nguoiPhuTrach }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', warehouse)">
              <span class="material-symbols-outlined d-flex align-items-center"> edit_square </span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', warehouse.maKho)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
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
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import { ref, computed } from 'vue';

const { t } = useI18n();

const props = defineProps({
  warehouses: {
    type: Array,
    required: true
  },
});

defineEmits(['id', 'name', 'area', 'manager', 'edit', 'delete']);


const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.warehouses.length / pageSize.value);
});

const paginatedWarehouse = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.warehouses.slice(start, end);
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

th:nth-child(2) {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>