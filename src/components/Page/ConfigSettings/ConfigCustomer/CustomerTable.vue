<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" @click="$emit('id', toggleSortById)">{{ $t('ConfigSettings.no') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('name', toggleSortByName)" class="sticky">{{
            $t('ConfigSettings.customers.customer_name') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('company', toggleSortByCompany)">{{
            $t('ConfigSettings.customers.customer_company') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('phone', toggleSortByPhone)">{{ $t('ConfigSettings.customers.phone') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('address', toggleSortByAddress)">{{ $t('ConfigSettings.customers.address') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customers.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.customers.not_found') }}</td>
        </tr>
        <tr v-for="customer in paginatedCustomers" :key="customer.sysIdKhachHang">
          <td scope="row">{{ customer.sysIdKhachHang }}</td>
          <td class="sticky">{{ customer.tenKhachHang }}</td>
          <td>{{ customer.tenCongTy }}</td>
          <td>{{ customer.soDienThoai }}</td>
          <td>{{ customer.diaChi }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', customer)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', customer.sysIdKhachHang)">
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
  customers: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete', 'id', 'name', 'company', 'phone', 'address']);


const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.customers.length / pageSize.value);
});

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.customers.slice(start, end);
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