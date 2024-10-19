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
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByQuantity">
            <span class="material-symbols-outlined">swap_vert</span>
          </button>
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
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
                <th class="sticky">
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
                <td class="sticky">
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
          <span class="mx-2" style="color: var(--nav-link-color);"> {{ $t('Product.table.pagination.page') }}
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
import { useApiServices } from "@/services/apiService.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { useProductStore } from "@/store/productStore.js";
import { showToastSuccess, showToastError, showToastInfo } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import i18n from "@/lang/i18n";

const { t } = useI18n();
const apiStore = useApiServices();
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

// Lọc sản phẩm theo từ khóa (searchQuery)
const filteredProducts = computed(() => {
  let filtered = products.value.filter((product) => {
    const query = searchQuery.value.toLowerCase();
    const nameMatches = product.tenSanPham.toLowerCase().includes(query);
    const descriptionMatches = product.moTa.toLowerCase().includes(query);
    const quantityMatches = product.soLuongHienCo.toString().includes(searchQuery.value);

    return nameMatches || descriptionMatches || quantityMatches;
  });

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenSanPham.localeCompare(a.tenSanPham)); // Z-A
  } else if (sortOption.value === "quantity-asc") {
    filtered.sort((a, b) => a.soLuongHienCo - b.soLuongHienCo); // Quantity ascending
  } else if (sortOption.value === "quantity-desc") {
    filtered.sort((a, b) => b.soLuongHienCo - a.soLuongHienCo); // Quantity descending
  }

  return filtered;
});


// Sắp xếp tăng dần, dùng toán tử 3 ngồi để kiểm tra điều kiện clickAgain
const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

// Sắp xếp tăng dần, dùng toán tử 3 ngồi để kiểm tra điều kiện clickAgain
const toggleSortByQuantity = () =>
  (sortOption.value = sortOption.value === "quantity-asc" ? "quantity-desc" : "quantity-asc");

/**
 * Cập nhật URL hiện tại
 * - Thêm tham số sort vào URL
 * - Xóa tham số sort khỏi URL
 * - Thêm tham số category vào URL
 * - Xóa tham số category khỏi URL
 */
const updateUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (sortOption.value) {
    params.set("sort", sortOption.value);
  } else {
    params.delete("sort");
  }

  if (selectedCategory.value) {
    params.set("category", selectedCategory.value);
  } else {
    params.delete("category");
  }

  url.search = params.toString();
  window.history.replaceState({}, "", url.toString());
};


// Xóa sản phẩm
const deleteProduct = async (id, event) => {
  // event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("Product.table.swal.confirmDelete.title"),
    text: i18n.global.t("Product.table.swal.confirmDelete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("Product.table.swal.confirmDelete.cancel"),
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("Product.table.swal.confirmDelete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`products/${id}`);
      await getProducts(); // Cập nhật lại danh sách sản phẩm sau khi xóa
      showToastSuccess(i18n.global.t("Product.table.swal.success"));
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
  margin: 3px 5px;
  font-size: 14px;
  padding: 14px 10px;
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
  margin: 3px 5px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}

.category-selector {
  background-color: var(--background-color);
  border: 1px solid var(--border-main-color) !important;
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

.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}
</style>
