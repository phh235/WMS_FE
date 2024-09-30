<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="form-group has-search w-100">
          <span class="material-symbols-outlined form-control-feedback">search</span>
          <input type="text" class="form-control" placeholder="Tìm sản phẩm" />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <select class="form-select w-100" aria-label="Default select example">
          <option value="" selected>Sắp xếp</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-3 mb-3">
        <div class="category-selector">
          <select
            class="form-select w-100 d-md-none mb-3"
            v-model="selectedCategory"
            @change="filterProducts"
          >
            <option value="" selected>Tất cả danh mục</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.sysIdCategoryProd"
            >
              {{ category.categoryName }}
            </option>
          </select>

          <ul class="list-group d-none d-md-block">
            <li
              class="list-group-item border-0 d-flex align-items-center"
              @click="selectCategory('')"
              :class="{ active: selectedCategory === '' }"
            >
              Tất cả danh mục
            </li>
            <li
              v-for="category in categories"
              :key="category.id"
              class="list-group-item border-0 d-flex align-items-center"
              @click="selectCategory(category.sysIdCategoryProd)"
              :class="{ active: selectedCategory === category.sysIdCategoryProd }"
            >
              {{ category.categoryName }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-9">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá bán</th>
                <th>Chi phí</th>
                <th>Hiện có</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.id"
                v-show="selectedCategory === '' || product.sysIdCategoryProd === selectedCategory"
              >
                <td>
                  <div class="d-flex align-items-center">
                    <img
                      :src="product.imageUrl"
                      alt="Product Image"
                      class="me-3 rounded-2"
                      width="60"
                      height="60"
                    />
                    <div>
                      <div class="fw-bold">{{ product.productName }}</div>
                      <div
                        class="badge text-dark d-none"
                        style="background-color: var(--secondary-color-border); border-radius: 3px"
                      >
                        {{ product.sysIdCategoryProd }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ product.price }} đ</td>
                <td>{{ product.expense }} đ</td>
                <td>{{ product.quantityAvailable ? product.quantityAvailable : 0 }} cái</td>
                <td>
                  <button class="btn btn-danger btn-sm">
                    <span class="material-symbols-outlined d-flex align-items-center">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination d-flex justify-content-center align-items-center mt-3">
            <button
              class="btn btn-primary btn-sm me-2"
              @click="prevPage"
              :disabled="currentPage === 0"
            >
              Trước
            </button>
            <span class="mx-2">Trang {{ currentPage + 1 }} / {{ totalPages + 1 }}</span>
            <button
              class="btn btn-primary btn-sm ms-2"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApiStore } from "../../../../store/apiStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";

const apiStore = useApiStore();
const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getProducts();
  getCategories();
});

const getCategories = async () => {
  try {
    const response = await apiStore.get("category-product");
    categories.value = response.list;
    console.log(response.list);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const getProducts = async () => {
  try {
    const response = await apiStore.get(
      `products?page=${currentPage.value}&size=${pageSize.value}`
    );
    products.value = response.list;
    console.log(response.list);
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

function handleRowClick(product) {
  console.log("Thông tin sản phẩm:", product);
}

function selectCategory(category) {
  selectedCategory.value = category;
}

function filterProducts() {
  console.log("Filtering products by category:", selectedCategory.value);
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
    getProducts();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getProducts();
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 15px;
}

.table {
  font-size: 14px;
  width: 100%;
}

.table td {
  vertical-align: middle;
}

.form-group,
.form-select {
  width: 100%;
  font-size: 14px;
}

input,
select {
  font-size: 14px;
  border: 1px solid var(--secondary-color);
}

input:focus,
input:active,
select:focus,
select:active {
  border: 1px solid var(--secondary-color);
  box-shadow: none;
}

.list-group-item {
  margin: 5px;
  font-size: 14px;
  padding: 10px;
}

.list-group-item:hover {
  background-color: var(--secondary-color);
  border-radius: 10px;
  cursor: pointer;
}

.list-group-item.active {
  background-color: var(--secondary-color-hover);
  border-radius: 10px;
  color: #000;
}

.category-selector {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  padding: 10px;
  border-radius: 8px;
}

.table-responsive {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  padding: 10px;
  border-radius: 8px;
}

.btn-danger {
  padding: 6px 6px;
}

@media (max-width: 768px) {
  .table {
    font-size: 12px;
  }

  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
