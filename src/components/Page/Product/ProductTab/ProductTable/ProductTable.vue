<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá bán</th>
          <th>Chi phí</th>
          <th>Hiện có</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div class="d-flex align-items-center">
              <img
                :src="product.anh"
                alt="Product Image"
                class="me-3 rounded-2"
                width="60"
                height="60"
              />
              <div>
                <div class="fw-bold" style="font-size: 15px">{{ product.tenSanPham }}</div>
                <div
                  class="badge text-dark"
                  style="
                    background-color: var(--secondary-color-border);
                    border-radius: 3px;
                    font-size: 13px;
                  "
                >
                  {{ product.loaiSanPham }}
                </div>
              </div>
            </div>
          </td>
          <td>{{ product.giaBan }} đ</td>
          <td>{{ product.chiPhi }} đ</td>
          <td>{{ product.hienCo }} cái</td>
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
.thead-img,
.td-img {
  text-align: center;
}
.table td {
  vertical-align: middle;
}
</style>
