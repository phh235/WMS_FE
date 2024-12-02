<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none" style="width: 0px">ID</th>
          <th scope="col" class="sticky" style="width: 150px">{{ $t('ConfigSettings.zone-detail.zone_detail_id') }}</th>
          <th scope="col" style="width: 200px">{{ $t('ConfigSettings.zone-detail.zone_detail_name') }}</th>
          <th scope="col" style="width: 250px">{{ $t('ConfigSettings.zone-detail.zone_detail_desc') }}</th>
          <th scope="col" style="width: 150px">{{ $t('ConfigSettings.zone-detail.area_storage') }}</th>
          <th scope="col" style="width: 150px">{{ $t('ConfigSettings.zone-detail.area_available') }}</th>
          <th scope="col" style="width: 150px">{{ $t('ConfigSettings.zone-detail.zone_id') }}</th>
          <th scope="col" class="text-center" style="width: 120px">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="zoneDetail.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.zone-detail.not_found') }}</td>
        </tr>
        <tr v-for="zoneDetail in paginatedZoneDetail" :key="zoneDetail.sysIdChiTietKhuVuc"
          @dblclick="$emit('detail', zoneDetail.maChiTietKhuVuc)">
          <td scope="row" class="d-none" style="width: 0px">{{ zoneDetail.sysIdChiTietKhuVuc }}</td>
          <td class="sticky" style="width: 150px">{{ zoneDetail.maChiTietKhuVuc }}</td>
          <td style="width: 200px">{{ zoneDetail.tenChiTietKhuVuc }}</td>
          <td style="width: 250px">{{ zoneDetail.moTa }}</td>
          <td style="width: 150px">{{ zoneDetail.theTichLuuTru }}</td>
          <td style="width: 150px">{{ zoneDetail.theTichKhaDung }}</td>
          <td style="width: 150px">{{ zoneDetail.maKhuVuc }}</td>
          <td class="text-center" style="width: 120px">
            <button class="btn btn-secondary me-2" @click="$emit('edit', zoneDetail)">
              <span class="material-symbols-outlined d-flex align-items-center"> edit_square </span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', zoneDetail.maChiTietKhuVuc)">
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
import { ref, computed } from 'vue';
import Pagination from '@/components/Common/Pagination/Pagination.vue';

const { t } = useI18n();

const props = defineProps({
  zoneDetail: {
    type: Array,
    required: true
  }
});

defineEmits(['detail', 'edit', 'delete']);

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.zoneDetail.length / pageSize.value);
});

const paginatedZoneDetail = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.zoneDetail.slice(start, end);
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
