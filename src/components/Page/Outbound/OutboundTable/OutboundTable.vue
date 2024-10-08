<template>
  <div class="sub-content mb-3 d-flex">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input
        type="search"
        class="form-control"
        placeholder="Tìm theo mã tham chiếu"
        v-model="searchQuery"
      />
    </div>
    <select class="form-select fs" aria-label="Default select example">
      <option value="" selected>Sắp xếp</option>
      <option value="name-asc">A-Z</option>
      <option value="name-desc">Z-A</option>
    </select>
  </div>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Mã tham chiếu</th>
          <th>Từ</th>
          <th>Đến</th>
          <th>Liên hệ</th>
          <th>Người phụ trách</th>
          <th>Ngày theo kế hoạch</th>
          <th>Tình trạng</th>
          <th>Ngày hiệu lực</th>
          <th>Hết hạn</th>
          <th>Đơn hàng chậm trễ của</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredOutbounds.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy</td>
        </tr>
        <tr v-for="outbound of filteredOutbounds" :key="outbound.id" style="cursor: pointer">
          <td>{{ outbound.id }}</td>
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
