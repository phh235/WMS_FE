<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.customers.customer_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.customers.customer_company') }}</th>
          <th scope="col">{{ $t('ConfigSettings.customers.phone') }}</th>
          <th scope="col">{{ $t('ConfigSettings.customers.supplier_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.customers.address') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customers.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.customers.not_found') }}</td>
        </tr>
        <tr v-for="customer in customers" :key="customer.sysIdKhachHang">
          <td scope="row">{{ customer.sysIdKhachHang }}</td>
          <td class="sticky">{{ customer.tenKhachHang }}</td>
          <td class="sticky">{{ customer.tenCongTy }}</td>
          <td class="sticky">{{ customer.soDienThoai }}</td>
          <td class="sticky">{{ customer.tenNhaCungCap }}</td>
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
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  customers: {
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
</style>