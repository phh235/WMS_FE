<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.suppliers.supplier_id') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.suppliers.supplier_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.suppliers.supplier_desc') }}</th>
          <th scope="col" class="text-center action">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="suppliers.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.suppliers.not_found') }}</td>
        </tr>
        <tr v-for="supplier in suppliers" :key="supplier.sysIdNhaCungCap">
          <td scope="row">{{ supplier.sysIdNhaCungCap }}</td>
          <td class="sticky">{{ supplier.tenNhaCungCap }}</td>
          <td>{{ supplier.moTa }}</td>
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
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  suppliers: {
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

/* th:nth-child(2) {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
} */

.action {
  width: 150px;
}
</style>