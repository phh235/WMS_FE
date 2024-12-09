<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.consignments.consignment_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_product') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_quantity') }} (Kg)</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_date') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_date_exp') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_area') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_zone_detail') }}</th>
          <!-- <th scope="col">{{ $t('ConfigSettings.consignments.consignment_detail_inbound') }}</th> -->
          <!-- <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-if="consignments.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.consignments.not_found') }}</td>
        </tr>
        <tr v-for="consignment in paginatedConsigments" :key="consignment.sysIdLoHang">
          <td scope="row">{{ consignment.sysIdLoHang }}</td>
          <td class="sticky">{{ consignment.maLo }}</td>
          <td>{{ consignment.tenSanPham }}</td>
          <td>{{ parseFloat(consignment.soLuong).toLocaleString('vi-VN') }}</td>
          <td>{{ consignment.ngaySanXuat }}</td>
          <td>{{ consignment.hanSuDung }}</td>
          <td>{{ consignment.dungTich }}</td>
          <td>{{ consignment.maChiTietKhuVuc }} <button class="btn btn-secondary opacity-0"
              @click="$emit('edit', consignment)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button></td>
          <!-- <td>{{ consignment.sysIdChiTietNhapHang || 'Không có' }}</td> -->
          <!-- <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', consignment)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', consignment.maLo)">
              <span class="material-symbols-outlined d-flex align-items-center">delete</span>
            </button>
          </td> -->
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
  consignments: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);


const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.consignments.length / pageSize.value);
});

const paginatedConsigments = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.consignments.slice(start, end);
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