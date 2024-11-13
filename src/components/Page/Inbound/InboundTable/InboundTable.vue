<template>
  <div class="container-fluid box-shadow p-3">
    <div class="mb-4 d-flex justify-content-end">
      <SearchInput v-model="searchQuery" :placeholder="$t('Inbound.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2"><span
          class="material-symbols-outlined">swap_vert</span></button>
      <button class="btn btn-secondary d-flex align-items-center me-2"><span
          class="material-symbols-outlined">person</span></button>
      <router-link to="/inventory/inbound/new" class="btn btn-primary d-flex align-items-center">
        <span class="material-symbols-outlined me-2"> add </span> {{ $t('Inbound.btn_create_inbound') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="sticky">{{ $t('Inbound.table.reference_code') }}</th>
            <th>{{ $t('Inbound.table.from') }}</th>
            <th>{{ $t('Inbound.table.to') }}</th>
            <th>{{ $t('Inbound.table.contact') }}</th>
            <th>{{ $t('Inbound.table.person_in_charge') }}</th>
            <th>{{ $t('Inbound.table.plan_date') }}</th>
            <th>{{ $t('Inbound.table.condition') }}</th>
            <th>{{ $t('Inbound.table.effective_date') }}</th>
            <th>{{ $t('Inbound.table.expiry_date') }}</th>
            <th>{{ $t('Inbound.table.order_late') }}</th>
            <th>{{ $t('Inbound.table.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredInbounds.length === 0" style="text-align: center; font-style: italic">
            <td colspan="10">{{ $t('Inbound.not_found') }}</td>
          </tr>
          <tr v-for="inbound of filteredInbounds" :key="inbound.id" style="cursor: pointer">
            <td class="sticky">{{ inbound.id }}</td>
            <td>{{ inbound.from }}</td>
            <td>{{ inbound.to }}</td>
            <td>{{ inbound.contact }}</td>
            <td>{{ inbound.manager }}</td>
            <td>{{ inbound.datePlan }}</td>
            <td>{{ inbound.condition }}</td>
            <td>{{ inbound.date }}</td>
            <td>{{ inbound.dateOut }}</td>
            <td>{{ inbound.orderLate }}</td>
            <td>{{ inbound.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import inboundList from "@/components/Page/Inbound/inbound.json";
import SearchInput from "@/components/Common/Search/SearchInput.vue";

const inbounds = ref(inboundList);
const searchQuery = ref("");

const filteredInbounds = computed(() => {
  return inbounds.value.filter((inbound) =>
    inbound.id.toString().includes(searchQuery.value.toUpperCase())
  );
});
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

.table {
  font-size: 0.875rem;
}

.form-select {
  width: 200px;
}

.form-group {
  width: 230px;
}

.fs {
  font-size: 0.875rem;
}
</style>
