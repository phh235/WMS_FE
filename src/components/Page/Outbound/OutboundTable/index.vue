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
        <tr v-for="outbound of outbounds" :key="outbound.id" style="cursor: pointer">
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
import { ref } from "vue";
import outboundList from "@/components/Page/Outbound/outbound.json";

const outbounds = ref(outboundList);
</script>

<style scoped>
.table {
  font-size: 14px;
}
</style>
