<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th class="id">ID</th>
          <th>Tên sản phẩm</th>
          <th>Giá bán</th>
          <th>Chi phí</th>
          <th>Hiện có</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="products.id"
          @click="handleRowClick(product)"
          style="cursor: pointer"
        >
          <td class="id">{{ product.id }}</td>
          <td>{{ product.tenSanPham }}</td>
          <td>{{ product.giaBan }} ₫</td>
          <td>{{ product.chiPhi }} ₫</td>
          <td>{{ product.hienCo }} đơn vị</td>
          <td>{{ product.ghiChu }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import listProduct from "../Product.json";

const products = ref(listProduct);

function handleRowClick(product) {
  console.log("Thông tin sản phẩm:", product);
}
</script>

<style scoped>
.table {
  font-size: 14px;
  width: 100%;
}
.id {
  text-align: center;
  width: 60px;
}
</style>
