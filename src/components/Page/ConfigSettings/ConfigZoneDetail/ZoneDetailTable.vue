<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.zone-detail.zone_detail_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zone-detail.zone_detail_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zone-detail.zone_detail_desc') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zone-detail.area_storage') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zone-detail.area_available') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zone-detail.zone_id') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="zoneDetail.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.zone-detail.not_found') }}</td>
        </tr>
        <tr v-for="zoneDetail in zoneDetail" :key="zoneDetail.sysIdChiTietKhuVuc"
          @dblclick="$emit('detail', zoneDetail.maChiTietKhuVuc)">
          <td scope="row" class="d-none">{{ zoneDetail.sysIdChiTietKhuVuc }}</td>
          <td class="sticky">{{ zoneDetail.maChiTietKhuVuc }}</td>
          <td>{{ zoneDetail.tenChiTietKhuVuc }}</td>
          <td>{{ zoneDetail.moTa }}</td>
          <td>{{ zoneDetail.theTichLuuTru }}</td>
          <td>{{ zoneDetail.theTichKhaDung }}</td>
          <td>{{ zoneDetail.maKhuVuc }}</td>
          <td class="text-center">
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
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  zoneDetail: {
    type: Array,
    required: true
  }
});

defineEmits(['detail', 'edit', 'delete']);
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