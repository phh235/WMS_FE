<template>
  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active d-flex align-items-center"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        <span class="material-symbols-outlined"> view_cozy </span>
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link d-flex align-items-center"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
      >
        <span class="material-symbols-outlined"> table_rows </span>
      </button>
    </li>
  </ul>
  <div class="sub-content mb-3 d-flex">
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
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
      tabindex="0"
    >
      <ProductCard />
    </div>
    <div
      class="tab-pane"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
      tabindex="0"
    >
      <ProductTable />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "@components/Page/Product/ProductTab/ProductCard/ProductCard.vue";
import ProductTable from "@components/Page/Product/ProductTab/ProductTable/ProductTable.vue";
</script>

<style scoped>
.nav-pills {
  background-color: #fff;
  border: 1px solid #d2d2d2;
  border-radius: 6px;
  padding: 4px;
  display: inline-flex;
}
.nav-item {
  margin: 0 2px;
}
.nav-link {
  border-radius: 4px !important;
  padding: 10px 10px !important;
  color: #666 !important;
  transition: none;
}
.nav-link.active {
  background-color: var(--secondary-color) !important;
  color: #333 !important;
  transition: none;
}
.material-symbols-outlined {
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
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
