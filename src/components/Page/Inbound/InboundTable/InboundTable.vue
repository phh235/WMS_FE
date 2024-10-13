<template>
  <div class="sub-content mb-3 d-flex">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="search" class="form-control" placeholder="Tìm theo mã tham chiếu" v-model="searchQuery" />
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
        <tr v-if="filteredInbounds.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy</td>
        </tr>
        <tr v-for="inbound of filteredInbounds" :key="inbound.id" style="cursor: pointer">
          <td>{{ inbound.id }}</td>
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
</template>

<script setup>
import { ref, computed } from "vue";
import inboundList from "@/components/Page/Inbound/inbound.json";

const inbounds = ref(inboundList);
const searchQuery = ref("");

const filteredInbounds = computed(() => {
  return inbounds.value.filter((inbound) =>
    inbound.id.toString().includes(searchQuery.value.toUpperCase())
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
</style>
