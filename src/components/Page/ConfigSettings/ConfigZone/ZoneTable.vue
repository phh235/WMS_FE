<template>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.zones.zone_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zones.zone_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zones.zone_desc') }}</th>
          <th scope="col" class="d-none">{{ $t('ConfigSettings.zones.warehouse_id') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="zones.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.zones.not_found') }}</td>
        </tr>
        <tr v-for="zone in zones" :key="zone.sysIdKhuVuc" @dblclick="showZoneDetail(zone.maKhuVuc)">
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
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  zones: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
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