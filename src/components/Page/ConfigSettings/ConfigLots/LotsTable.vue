<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.consignments.consignment_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_product') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_quantity') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_date') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_date_exp') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_area') }}</th>
          <th scope="col">{{ $t('ConfigSettings.consignments.consignment_zone_detail') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="consignments.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.consignments.not_found') }}</td>
        </tr>
        <tr v-for="consignment in consignments" :key="consignment.sysIdLoHang">
          <td scope="row">{{ consignment.sysIdLoHang }}</td>
          <td class="sticky">{{ consignment.maLo }}</td>
          <td>{{ consignment.sysIdSanPham }}</td>
          <td>{{ consignment.soLuong }}</td>
          <td>{{ consignment.ngaySanXuat }}</td>
          <td>{{ consignment.hanSuDung }}</td>
          <td>{{ consignment.dungTich }}</td>
          <td>{{ consignment.maChiTietKhuVuc }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', consignment)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', consignment.maLo)">
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
  consignments: {
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