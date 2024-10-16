<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 mb-3 px-md-3 p-0">
        <div class="category-selector box-shadow p-2">
          <div class="scrollable-wrapper">
            <ul class="list-group d-flex flex-md-column flex-row flex-nowrap overflow-auto">
              <li class="list-group-item flex-shrink-0 d-flex align-items-center px-3" @click="selectCategory('')"
                :class="{ active: selectedCategory === '' }">
                <span class="material-symbols-outlined me-2">open_in_new</span>
                {{ $t('Product.table.categories.title') }}
              </li>
              <li v-for="category in categoryStore.categories" :key="category.sysIdDanhMuc"
                class="list-group-item flex-shrink-0 d-flex align-items-center px-3"
                @click="selectCategory(category.sysIdDanhMuc)"
                :class="{ active: selectedCategory === category.sysIdDanhMuc }">
                <span class="material-symbols-outlined me-2">open_in_new</span>
                {{ category.tenDanhMuc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 box-shadow p-3">
        <div class="d-flex mb-3 justify-content-end">
          <div class="form-group fs has-search d-flex align-items-center me-2">
            <span class="material-symbols-outlined form-control-feedback">search</span>
            <input type="search" class="form-control" :placeholder="$t('Product.table.search_input')"
              v-model="searchQuery" />
          </div>
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="sortByQuantityAsc">
            <span class="material-symbols-outlined">swap_vert</span>
          </button>
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="sortByNameAsc">
            <span class="material-symbols-outlined">sort_by_alpha</span>
          </button>
          <router-link to="/inventory/san-pham/them-moi" class="btn btn-primary d-flex align-items-center">
            <span class="material-symbols-outlined me-2"> add </span>
            {{ $t('Product.table.btn_save') }}
          </router-link>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>
                  {{ $t('Product.table.no') }}
                </th>
                <th>
                  {{ $t('Product.table.product_name') }}
                </th>
                <th>
                  {{ $t('Product.table.desc') }}
                </th>
                <th>
                  {{ $t('Product.table.available_quantity') }}
                </th>
                <th class="text-center">{{ $t('Product.table.btn_action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredProducts.length === 0" style="text-align: center; font-style: italic">
                <td colspan="10">
                  {{ $t('Product.table.not_available') }}
                </td>
              </tr>
              <tr v-for="(product, index) in filteredProducts" :key="product.sysIdSanPham"
                v-show="selectedCategory === '' || product.sysIdDanhMuc === selectedCategory"
                @dblclick="selectProduct(product.sysIdSanPham)">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="product.hinhAnhUrl" alt="Product Image" class="me-3 rounded-2" width="50" loading="lazy"
                      style="object-fit: cover; object-position: center" />
                    <div>
                      <div class="fw-bold">{{ product.tenSanPham }}</div>
                      <div class="badge text-dark d-none"
                        style="background-color: var(--secondary-color-border); border-radius: 3px">
                        {{ product.sysIdDanhMuc }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ product.moTa }}</td>
                <td>{{ product.soLuongHienCo ? product.soLuongHienCo : 0 }} Kg</td>
                <td class="text-center">
                  <button class="btn btn-secondary btn-sm me-2">
                    <span class="material-symbols-outlined d-flex align-items-center">edit</span>
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product.sysIdSanPham)">
                    <span class="material-symbols-outlined d-flex align-items-center">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination d-flex justify-content-center align-items-center mt-3">
          <button class="btn btn-primary btn-sm me-2" @click="prevPage" :disabled="currentPage === 0">
            {{ $t('Product.table.pagination.prev') }}
          </button>
          <span class="mx-2"> {{ $t('Product.table.pagination.page') }}
            {{ currentPage + 1 }} / {{ totalPages + 1 }}</span>
          <button class="btn btn-primary btn-sm ms-2" @click="nextPage" :disabled="currentPage === totalPages">
            {{ $t('Product.table.pagination.next') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { useProductStore } from "@/store/productStore.js";
import { showToastSuccess, showToastError, showToastInfo } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";

const apiStore = useApiStore();
const categoryStore = useCategoriesStore();
const productStore = useProductStore();

const products = ref([]);
const selectedCategory = ref("");
const currentPage = ref(0);
const totalPages = ref(2);
const pageSize = ref(20);
const searchQuery = ref("");
const sortOption = ref("");

onMounted(() => {
  getProducts();
  categoryStore.getCategories();
});

// const selectProduct = async (productId) => {
//   try {
//     await productStore.getProductById(productId);
//   } catch (error) {
//     showToastInfo("Không thể lấy thông tin sản phẩm.");
//   }
// };

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

  // Call api
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


// Sắp xếp tăng dần, nếu ấn lần nữa thì đổi thành sắp xếp giảm dần, dùng if else kiểm tra 2 điều kiện
const sortByNameAsc = () => {
  if (sortOption.value === "name-asc") {
    sortOption.value = "name-desc";
  } else {
    sortOption.value = "name-asc";
  }
  updateUrl();
};

// Sắp xếp tăng dần, nếu ấn lần nữa thì đổi thành sắp xếp giảm dần, dùng if else kiểm tra 2 điều kiện
const sortByQuantityAsc = () => {
  if (sortOption.value === "quantity-asc") {
    sortOption.value = "quantity-desc";
  } else {
    sortOption.value = "quantity-asc";
  }
  updateUrl();
};



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
  max-width: 1600px;
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
  border: none;
  margin: 5px;
  font-size: 14px;
  padding: 12px;
  transition: all .1s;
  border-radius: calc(.75rem - 2px);
}

.list-group-item:hover {
  background-color: var(--secondary-color);
  border-radius: calc(.75rem - 2px);
  cursor: pointer;
}

.list-group-item.active {
  background-color: var(--primary-color);
  border-radius: calc(.75rem - 2px);
  color: #fff;
  margin: 5px;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}

.category-selector {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
}

.btn-danger,
.btn-secondary {
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
