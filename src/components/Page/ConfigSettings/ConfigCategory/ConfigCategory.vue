<template>
  <div class="container p-4 rounded-2">
    <div class="mb-3 d-flex justify-content-end align-items-center">
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span class="material-symbols-outlined me-2"> add </span>
        Thêm danh mục
      </button>
    </div>
    <table class="table table-hover" @click="handleRowClick">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên Danh Mục</th>
          <th scope="col">Mô Tả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id" :data-id="category.id">
          <td scope="row">{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">Thêm Danh Mục</h5>
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
                <label for="categoryId" class="form-label">Mã Danh Mục</label>
                <input
                  type="text"
                  class="form-control"
                  id="categoryId"
                  aria-describedby="categoryIdHelp"
                  v-model="selectedCategory.id"
                />
              </div>
              <div class="mb-3">
                <label for="categoryName" class="form-label">Tên Danh Mục</label>
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  aria-describedby="categoryNameHelp"
                  v-model="selectedCategory.name"
                />
              </div>
              <div class="mb-3">
                <label for="categoryDescription" class="form-label">Mô Tả</label>
                <textarea
                  class="form-control"
                  id="categoryDescription"
                  aria-describedby="categoryDescriptionHelp"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
  { id: 1, name: "Gia dụng", description: "Gia dụng, đồ dùng nhà bếp" },
  { id: 2, name: "Thực phẩm", description: "Thực phẩm như cá, trứng, sữa và rau rủ" },
  { id: 3, name: "Điện tử", description: "Đồ điện tử" },
]);
const selectedCategory = ref({});

const handleRowClick = (event) => {
  const row = event.target.closest("tr");
  const id = row.getAttribute("data-id");
  const selectedCategoryValue = categories.value.find((category) => category.id === parseInt(id));
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
</style>
