<template>
  <div class="sub-content mb-1 d-flex">
    <div class="form-group has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="text" class="form-control" placeholder="Tìm sản phẩm" />
    </div>
    <select class="form-select" aria-label="Default select example" style="font-size: 14px">
      <option value="" selected>Sắp xếp</option>
      <option value="name-asc">A-Z</option>
      <option value="name-desc">Z-A</option>
    </select>
  </div>
  <div class="row p-3">
    <div class="col-12 col-md-2 left-side">
      <div class="d-md-none d-flex justify-content-center mb-3">
        <select class="form-select" aria-label="Default select example" style="font-size: 14px">
          <option value="" selected>Category</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <ul class="list-group d-none d-md-block">
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="list-group-item p-3 border-0 d-flex align-items-center"
        >
          <span class="material-symbols-outlined me-2">{{ category.icon }}</span
          >{{ category.name }}
        </li>
      </ul>
    </div>
    <div class="col-12 col-md-10 right-side"><ProductTable /></div>
  </div>
</template>

<script setup>
// import ProductCard from "@components/Page/Product/ProductTab/ProductCard/ProductCard.vue";
import ProductTable from "@components/Page/Product/ProductTab/ProductTable/ProductTable.vue";

const categories = [
  { id: 1, name: "Điện thoại", icon: "phone_iphone" },
  { id: 2, name: "Quần áo", icon: "apparel" },
  { id: 3, name: "Gia dụng", icon: "chair" },
  { id: 4, name: "Thực phẩm", icon: "ramen_dining" },
  { id: 5, name: "Điện tử", icon: "cable" },
];
</script>

<style scoped>
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
.list-group-item {
  margin: 5px;
  font-size: 14px;
  &:hover {
    background-color: var(--secondary-color);
    border-radius: 10px;
    cursor: pointer;
  }
}
.left-side {
  max-width: 270px;
  background-color: #fff;
  border: 1px solid var(--secondary-color);
  padding: 5px;
  border-radius: 8px;
}
.right-side {
  background-color: #fff;
  border: 1px solid var(--secondary-color);
  padding: 10px;
  border-radius: 8px;
}
</style>
