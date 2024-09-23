<template>
  <div class="container mt-5">
    <div class="d-flex align-items-stretch">
      <div
        class="nav flex-column nav-pills me-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
        style="flex: 0 0 auto; width: 15rem"
      >
        <button
          class="nav-link active p-3 d-flex align-items-center justify-content-start"
          id="v-pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-home"
          type="button"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
        >
          <span class="material-symbols-outlined ms-2"> category </span>
          <span class="ms-5"> Danh mục </span>
        </button>
        <button
          class="nav-link p-3 d-flex align-items-center justify-content-start"
          id="v-pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-profile"
          type="button"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
        >
          <span class="material-symbols-outlined ms-2"> warehouse </span>
          <span class="ms-5">Quản lý kho</span>
        </button>
      </div>
      <div class="tab-content" id="v-pills-tabContent" style="flex: 1 1 auto">
        <div
          class="tab-pane show active"
          id="v-pills-home"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
          tabindex="0"
        >
          <ConfigCategory />
        </div>
        <div
          class="tab-pane"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
          tabindex="0"
        >
          <ConfigWarehouse />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfigCategory from "./ConfigCategory/ConfigCategory.vue";
import ConfigWarehouse from "./ConfigWarehouse/ConfigWarehouse.vue";
</script>

<style scoped>
.nav-link.active {
  color: #000;
  background-color: var(--primary-color);
  &:hover {
    background-color: var(--primary-color);
  }
}
.nav-link {
  font-size: 15px;
  color: #000;
}
.btn {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
