<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div
        class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2"
        v-for="(product, index) in products"
        :key="products.id"
        @click="handleRowClick(product)"
      >
        <div class="card">
          <img :src="product.anh" class="card-img-top py-2" alt="Product Image" />
          <div class="card-body text-center">
            <div class="card-text h6 fw-bold" style="color: var(--main-text-color)">
              {{ product.tenSanPham }}
            </div>
            <div class="card-text fw-bold">
              <p>{{ product.giaBan }}₫</p>
              <p>
                Hiện có: <span class="text-danger">{{ product.hienCo }} đơn vị</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.card {
  font-size: 14px;
  border: 1px solid var(--secondary-color-border);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.1s;
  &:hover {
    cursor: pointer;
    border: 1px solid var(--secondary-color-border-hover);
  }
}
</style>
