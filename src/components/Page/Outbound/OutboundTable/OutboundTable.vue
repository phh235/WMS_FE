<template>
  <div class="container-fluid box-shadow p-4">
    <div class="mb-4 d-flex justify-content-end">
      <div class="form-group fs has-search d-flex align-items-center me-2">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input type="search" class="form-control" :placeholder="$t('Outbound.search_input')" v-model="searchQuery" />
      </div>
      <button class="btn btn-secondary d-flex align-items-center me-2"><span
          class="material-symbols-outlined">swap_vert</span></button>
      <button class="btn btn-secondary d-flex align-items-center me-2"><span
          class="material-symbols-outlined">person</span></button>
      <router-link to="/inventory/nhap/tao-phieu-xuat" class="btn btn-primary d-flex align-items-center">
        <span class="material-symbols-outlined me-2"> add </span> {{ $t('Outbound.btn_create_outbound') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="sticky">{{ $t('Outbound.table.reference_code') }}</th>
            <th>{{ $t('Outbound.table.from') }}</th>
            <th>{{ $t('Outbound.table.to') }}</th>
            <th>{{ $t('Outbound.table.contact') }}</th>
            <th>{{ $t('Outbound.table.person_in_charge') }}</th>
            <th>{{ $t('Outbound.table.plan_date') }}</th>
            <th>{{ $t('Outbound.table.condition') }}</th>
            <th>{{ $t('Outbound.table.effective_date') }}</th>
            <th>{{ $t('Outbound.table.expiry_date') }}</th>
            <th>{{ $t('Outbound.table.order_late') }}</th>
            <th>{{ $t('Outbound.table.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOutbounds.length === 0" style="text-align: center; font-style: italic">
            <td colspan="10">{{ $t('Outbound.not_found') }}</td>
          </tr>
          <tr v-for="outbound of filteredOutbounds" :key="outbound.id" style="cursor: pointer">
            <td class="sticky">{{ outbound.id }}</td>
            <td>{{ outbound.from }}</td>
            <td>{{ outbound.to }}</td>
            <td>{{ outbound.contact }}</td>
            <td>{{ outbound.manager }}</td>
            <td>{{ outbound.datePlan }}</td>
            <td>{{ outbound.condition }}</td>
            <td>{{ outbound.date }}</td>
            <td>{{ outbound.dateOut }}</td>
            <td>{{ outbound.orderLate }}</td>
            <td>{{ outbound.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import outboundList from "@/components/Page/Outbound/outbound.json";

const outbounds = ref(outboundList);
const searchQuery = ref("");

const filteredOutbounds = computed(() => {
  return outbounds.value.filter((outbound) =>
    outbound.id.toString().includes(searchQuery.value.toUpperCase())
  );
});
</script>

<style scoped>
.container-fluid {
  max-width: 1600px;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

.table {
  font-size: 14px;
}

.form-select {
  width: 200px;
}

.form-group {
  width: 230px;
}

.fs {
  font-size: 14px;
}

input,
select {
  font-size: 14px;
  border: 1px solid var(--secondary-color);

  &:focus,
  &:active {
    border: 1px solid var(--secondary-color);
    box-shadow: none;
  }
}
</style>
