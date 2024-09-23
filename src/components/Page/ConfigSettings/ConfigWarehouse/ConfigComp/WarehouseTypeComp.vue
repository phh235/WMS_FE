<template>
  <div class="container p-4 rounded-2">
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h4 class="fw-bold">Loại kho</h4>
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#warehouseTypeModal"
      >
        <span class="material-symbols-outlined me-2"> add </span>
        Thêm loại kho
      </button>
    </div>
    <table class="table table-hover" @click="handleRowClick">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên loại kho</th>
          <th scope="col">ID Kho</th>
          <th scope="col">Mô Tả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="warehouse in warehouses" :key="warehouse.id" :data-id="warehouse.id">
          <td scope="row">{{ warehouse.id }}</td>
          <td>{{ warehouse.warehouseTypeName }}</td>
          <td>{{ warehouse.warehouseId }}</td>
          <td>{{ warehouse.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="modal fade"
    id="warehouseTypeModal"
    tabindex="-1"
    aria-labelledby="warehouseTypeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="warehouseTypeModalLabel">Thêm Loại kho</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="warehouseId" class="form-label">Mã loại kho</label>
              <input
                type="text"
                class="form-control"
                id="warehouseId"
                aria-describedby="categoryIdHelp"
                v-model="selectedCategory.id"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseName" class="form-label">Tên loại kho</label>
              <input
                type="text"
                class="form-control"
                id="warehouseName"
                aria-describedby="warehouseNameHelp"
                v-model="selectedCategory.warehouseTypeName"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseLocate" class="form-label">ID Kho</label>
              <input
                type="text"
                class="form-control"
                id="warehouseLocate"
                aria-describedby="warehouseLocateHelp"
                v-model="selectedCategory.warehouseId"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseDescription" class="form-label">Mô Tả</label>
              <textarea
                class="form-control"
                id="warehouseDescription"
                aria-describedby="warehouseDescriptionHelp"
                v-model="selectedCategory.description"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-primary">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const warehouses = ref([
  { id: 1, warehouseTypeName: "Loại kho 1", warehouseId: "ID Kho 1", description: "Mô tả" },
  {
    id: 2,
    warehouseTypeName: "Loại kho 1",
    warehouseId: "ID Kho 1",
    description: "Mô tả",
  },
  { id: 3, warehouseTypeName: "Loại kho 1", warehouseId: "ID Kho 1", description: "Mô tả" },
]);
const selectedCategory = ref({});

const handleRowClick = (event) => {
  const row = event.target.closest("tr");
  const id = row.getAttribute("data-id");
  const selectedCategoryValue = warehouses.value.find((warehouse) => warehouse.id === parseInt(id));
  selectedCategory.value = { ...selectedCategoryValue };
};
</script>

<style scoped>
.container {
  width: 80%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #00000014;
}
/* th {
  background-color: var(--primary-color);
} */
td {
  font-size: 15px;
}
input,
textarea {
  padding: 0.5rem;
  font-size: 15px;
  border-radius: 8px;
  /* border: 2px solid var(--secondary-color); */
  border: 2px solid #dcdcdc !important;
  transition: all 0.2s;
  &:focus,
  &:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border: 2px solid var(--border-input-color) !important;
  }
}
td {
  cursor: pointer;
}
</style>
