<template>
  <div class="container-fluid">
    <div class="d-flex mb-3 justify-content-end">
      <div class="form-group fs has-search d-flex align-items-center me-3">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input
          type="search"
          class="form-control"
          placeholder="Tìm kiếm sản phẩm"
          v-model="searchQuery"
        />
      </div>
      <select
        class="form-select fs"
        aria-label="Default select example"
        v-model="sortOption"
        @change="updateUrl"
      >
        <option value="" selected>Tất cả</option>
        <option value="name-asc">A-Z</option>
        <option value="name-desc">Z-A</option>
        <option value="quantity-asc">Số lượng tăng dần</option>
        <option value="quantity-desc">Số lượng giảm dần</option>
      </select>
    </div>

    <div class="row">
      <div class="col-12 col-md-3 mb-3">
        <div class="category-selector box-shadow">
          <select
            class="form-select w-100 d-md-none mb-3"
            v-model="selectedCategory"
            @change="filterProducts"
          >
            <option value="" selected>Tất cả danh mục</option>
            <option
              v-for="category in categoryStore.categories"
              :key="category.id"
              :value="category.sysIdDanhMuc"
            >
              {{ category.tenDanhMuc }}
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
              v-for="category in categoryStore.categories"
              :key="category.sysIdDanhMuc"
              class="list-group-item border-0 d-flex align-items-center"
              @click="selectCategory(category.sysIdDanhMuc)"
              :class="{ active: selectedCategory === category.sysIdDanhMuc }"
            >
              {{ category.tenDanhMuc }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-9">
        <div class="table-responsive box-shadow">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Mô tả</th>
                <th>Hiện có</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="filteredProducts.length === 0"
                style="text-align: center; font-style: italic"
              >
                <td colspan="10">Không tìm thấy sản phẩm</td>
              </tr>
              <tr
                v-for="(product, index) in filteredProducts"
                :key="product.sysIdSanPham"
                v-show="selectedCategory === '' || product.sysIdDanhMuc === selectedCategory"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <img
                      :src="product.hinhAnhUrl"
                      alt="Product Image"
                      class="me-3 rounded-2"
                      width="70"
                      height="70"
                      style="object-fit: cover; object-position: center"
                    />
                    <div>
                      <div class="fw-bold">{{ product.tenSanPham }}</div>
                      <div
                        class="badge text-dark d-none"
                        style="background-color: var(--secondary-color-border); border-radius: 3px"
                      >
                        {{ product.sysIdDanhMuc }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ product.moTa }}</td>
                <td>{{ product.soLuongHienCo ? product.soLuongHienCo : 0 }} Kg</td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteProduct(product.sysIdSanPham)"
                  >
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
import { ref, onMounted, computed } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";

const apiStore = useApiStore();
const products = ref([]);
const categoryStore = useCategoriesStore();
const selectedCategory = ref("");
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);
const searchQuery = ref("");
const sortOption = ref("");

onMounted(() => {
  getProducts();
  fetchCategories();
});

const fetchCategories = async () => {
  await categoryStore.getCategories();
};

// getAll sản phẩm
const getProducts = async () => {
  try {
    const response = await apiStore.get(
      `products?page=${currentPage.value}&size=${pageSize.value}`
    );
    products.value = response.data.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

const filteredProducts = computed(() => {
  // Lọc sản phẩm trước
  let filtered = products.value.filter((product) => {
    const nameMatches = product.tenSanPham.toLowerCase().includes(searchQuery.value.toLowerCase());
    const descriptionMatches = product.moTa.toLowerCase().includes(searchQuery.value.toLowerCase());
    const quantityMatches = product.soLuongHienCo.toString().includes(searchQuery.value);

    return nameMatches || descriptionMatches || quantityMatches;
  });

  // Sắp xếp sản phẩm theo lựa chọn của người dùng
  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenSanPham.localeCompare(a.tenSanPham)); // Z-A
  } else if (sortOption.value === "quantity-asc") {
    filtered.sort((a, b) => a.soLuongHienCo - b.soLuongHienCo); // Số lượng tăng dần
  } else if (sortOption.value === "quantity-desc") {
    filtered.sort((a, b) => b.soLuongHienCo - a.soLuongHienCo); // Số lượng giảm dần
  }

  return filtered;
});

const updateUrl = () => {
  const baseUrl = window.location.pathname;
  const query = [];

  // Thêm tham số sắp xếp vào URL nếu có
  if (sortOption.value) {
    query.push(`sort=${sortOption.value}`);
  }

  // Thêm tham số danh mục vào URL nếu có
  if (selectedCategory.value) {
    query.push(`category=${selectedCategory.value}`);
  }

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  window.history.replaceState({}, "", `${baseUrl}${queryString}`);
};

// Xóa sản phẩm
const deleteProduct = async (id, event) => {
  // event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: "Xóa sản phẩm?",
    text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`products/${id}`);
      await getProducts(); // Cập nhật lại danh sách sản phẩm sau khi xóa
      showToastSuccess("Sản phẩm đã được xóa");
    } catch (error) {
      console.error("Error while deleting category:", error);
      showToastError("Xóa sản phẩm thất bại. Vui lòng thử lại");
    }
  }
};

function selectCategory(category) {
  selectedCategory.value = category;
  updateUrl();
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
  width: 200px;
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
  padding: 10px;
  border-radius: 8px;
}

.table-responsive {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  padding: 10px;
  border-radius: 8px;
}

.btn-danger {
  padding: 10px 10px;
}

@media (max-width: 768px) {
  th {
    font-size: 14px;
  }
  td {
    font-size: 13px;
  }
}

.box-shadow {
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}
</style>
