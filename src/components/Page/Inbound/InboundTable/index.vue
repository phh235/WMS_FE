<template>
  <div>
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
</style>
