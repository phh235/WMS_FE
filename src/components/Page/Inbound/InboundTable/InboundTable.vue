<template>
  <div class="sub-content mb-3 d-flex">
    <div class="form-group has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="text" class="form-control" placeholder="Tìm phiếu nhập" />
    </div>
    <select class="form-select" aria-label="Default select example">
      <option value="" selected>Sắp xếp</option>
      <option value="name-asc">A-Z</option>
      <option value="name-desc">Z-A</option>
    </select>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
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
        <tr v-for="inbound of inbounds" :key="inbound.id" style="cursor: pointer">
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
import { ref } from "vue";
import inboundList from "@/components/Page/Inbound/inbound.json";

const inbounds = ref(inboundList);
</script>

<style scoped>
.table {
  font-size: 14px;
}
.form-group,
.form-select {
  width: 200px;
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
