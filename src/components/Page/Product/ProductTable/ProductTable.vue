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
        <select
          class="form-select"
          aria-label="Default select example"
          style="font-size: 14px"
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
      </div>
      <ul class="list-group d-none d-md-block">
        <li
          class="list-group-item p-3 border-0 d-flex align-items-center"
          @click="selectCategory('')"
          :class="{ active: selectedCategory === '' }"
        >
          Tất cả danh mục
        </li>
        <li
          v-for="category in categories"
          :key="category.id"
          class="list-group-item p-3 border-0 d-flex align-items-center"
          @click="selectCategory(category.sysIdCategoryProd)"
          :class="{ active: selectedCategory === category.sysIdCategoryProd }"
        >
          {{ category.categoryName }}
        </li>
      </ul>
    </div>
    <div class="col-12 col-md-10 right-side">
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
                    <div class="fw-bold" style="font-size: 15px">{{ product.productName }}</div>
                    <div
                      class="badge text-dark d-none"
                      style="
                        background-color: var(--secondary-color-border);
                        border-radius: 3px;
                        font-size: 13px;
                      "
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
                <button class="btn btn-danger">
                  <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination d-flex justify-content-center align-items-center mt-3">
          <button class="btn btn-primary me-2" @click="prevPage" :disabled="currentPage === 0">
            Trước
          </button>
          <span class="mx-2">Trang {{ currentPage + 1 }} / {{ totalPages + 1 }}</span>
          <button
            class="btn btn-primary ms-2"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Sau
          </button>
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
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getProducts();
  getCategories();
});

// get DanhMuc
const getCategories = async () => {
  try {
    const response = await apiStore.get("category-product");
    categories.value = response.list;
    console.log(response.list);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

// get SanPham
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
  // This function is not strictly necessary for v-show filtering,
  // but it's useful if you want to add more complex filtering logic in the future
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
  &.active {
    background-color: var(--secondary-color-hover);
    border-radius: 10px;
    color: #000;
  }
}
.left-side {
  max-width: 250px;
  margin-right: 20px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  padding: 5px;
  border-radius: 8px;
}
.right-side {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  padding: 10px;
  border-radius: 8px;
}
.btn-danger {
  padding: 6px 6px;
}
</style>
