<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky" @click="$emit('id', toggleSortById)">{{ $t('ConfigSettings.zones.zone_id') }}
            <span class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
          </th>
          <th scope="col" @click="$emit('name', toggleSortByName)">{{ $t('ConfigSettings.zones.zone_name') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th scope="col">{{ $t('ConfigSettings.zones.zone_desc') }}</th>
          <th scope="col" class="d-none">{{ $t('ConfigSettings.zones.warehouse_id') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="zones.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.zones.not_found') }}</td>
        </tr>
        <tr v-for="zone in paginatedZones" :key="zone.sysIdKhuVuc" @dblclick="showZoneDetail(zone.maKhuVuc)">
          <td scope="row" class="d-none">{{ zone.sysIdKhuVuc }}</td>
          <td class="sticky">{{ zone.maKhuVuc }}</td>
          <td>{{ zone.tenKhuVuc }}</td>
          <td>{{ zone.moTa }}</td>
          <td class="d-none">{{ zone.maKho }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', zone)">
              <span class="material-symbols-outlined d-flex align-items-center"> edit_square </span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', zone.maKhuVuc)">
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
  zones: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete', 'id', 'name']);

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.zones.length / pageSize.value);
});

const paginatedZones = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.zones.slice(start, end);
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