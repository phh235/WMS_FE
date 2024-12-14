<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" style="width: 70px" @click="$emit('id', toggleSortById)">{{ $t('ConfigSettings.no') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" style="width: 200px" @click="$emit('maLo', toggleSortByMaLo)" class="sticky">{{
            $t('ConfigSettings.consignments.consignment_id') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" style="width: 250px" @click="$emit('product', toggleSortByProduct)">{{
            $t('ConfigSettings.consignments.consignment_product') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" style="width: 150px" @click="$emit('quantity', toggleSortByQuantity)">{{
            $t('ConfigSettings.consignments.consignment_quantity') }} (Kg) <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" style="width: 150px">{{ $t('ConfigSettings.consignments.consignment_date') }}</th>
          <th scope="col" style="width: 150px">{{ $t('ConfigSettings.consignments.consignment_date_exp') }}</th>
          <th scope="col" style="width: 150px" @click="$emit('area', toggleSortByArea)">{{
            $t('ConfigSettings.consignments.consignment_area')
          }} <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col" style="width: 200px" @click="$emit('zoneDetail', toggleSortByZoneDetail)">{{
            $t('ConfigSettings.consignments.consignment_zone_detail') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <!-- <th scope="col">{{ $t('ConfigSettings.consignments.consignment_detail_inbound') }}</th> -->
          <th scope="col" class="text-end px-4" style="width: 200px">{{ $t('ConfigSettings.btn_action') }}</th>
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
          <td>{{ consignment.tenChiTietKhuVuc }} </td>
          <!-- <td>{{ consignment.sysIdChiTietNhapHang || 'Không có' }}</td> -->
          <td class="d-flex justify-content-end">
            <button class="btn btn-export d-flex me-2" @click="$emit('generate', consignment.maLo)">
              <span class="material-symbols-outlined me-2">qr_code</span> Xuất mã QR
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
  consignments: {
    type: Array,
    required: true
  }
});

defineEmits(['generate', 'delete', 'id', 'maLo', 'product', 'quantity', 'area', 'zoneDetail']);

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
.btn-export,
.btn-secondary {
  padding: 10px 10px;
}
</style>