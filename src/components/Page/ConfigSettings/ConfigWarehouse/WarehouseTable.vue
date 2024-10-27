<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.warehouses.warehouse_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.warehouses.warehouse_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.warehouses.warehouse_area') }}</th>
          <th scope="col">{{ $t('ConfigSettings.warehouses.warehouse_desc') }}</th>
          <th scope="col">{{ $t('ConfigSettings.warehouses.manager') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="warehouses.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.warehouses.not_found') }}</td>
        </tr>
        <tr v-for="warehouse in warehouses" :key="warehouse.sysIdKho" :data-id="warehouse.sysIdKho">
          <td scope="row" class="d-none">{{ warehouse.sysIdKho }}</td>
          <td class="sticky">{{ warehouse.maKho }}</td>
          <td>{{ warehouse.tenKho }}</td>
          <td>{{ warehouse.dienTich }}</td>
          <td>{{ warehouse.moTa }}</td>
          <td>{{ warehouse.sysIdUser }}</td>
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
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  warehouses: {
    type: Array,
    required: true
  },
});

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>