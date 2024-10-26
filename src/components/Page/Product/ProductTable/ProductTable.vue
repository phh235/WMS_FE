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
          <SearchInput v-model="searchQuery" :placeholder="$t('Product.table.search_input')" />
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
                <th class="td-id">{{ $t('Product.table.no') }}</th>
                <th class="sticky td-name">{{ $t('Product.table.product_name') }}</th>
                <th class="td-desc">{{ $t('Product.table.desc') }}</th>
                <th class="td-quantity">{{ $t('Product.table.available_quantity') }}</th>
                <th class="text-center td-action">{{ $t('Product.table.btn_action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedProducts.length === 0" style="text-align: center; font-style: italic">
                <td colspan="5">
                  {{ $t('Product.table.not_available') }}
                </td>
              </tr>
              <tr v-for="product in paginatedProducts" :key="product.sysIdSanPham">
                <td class="td-id">{{ product.sysIdSanPham }}</td>
                <td class="sticky td-name">
                  <div class="d-flex align-items-center">
                    <img :src="product.hinhAnhUrl" alt="Product Image" class="me-3 rounded-2" width="50" loading="lazy"
                      style="object-fit: cover; object-position: center" />
                    <div>
                      <div class="fw-bold" style="color: var(--nav-link-color);">{{ product.tenSanPham }}</div>
                      <div class="badge text-dark d-none"
                        style="background-color: var(--secondary-color-border); border-radius: 3px">
                        {{ product.sysIdDanhMuc }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="td-desc">{{ product.moTa }}</td>
                <td class="td-quantity">{{ product.soLuongHienCo ? product.soLuongHienCo : 0 }} Kg</td>
                <td class="text-center td-action">
                  <router-link class="btn btn-secondary btn-sm me-2"
                    :to="{ name: 'san-pham/chinh-sua/:id', params: { id: product.sysIdSanPham } }">
                    <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
                  </router-link>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product.sysIdSanPham)">
                    <span class="material-symbols-outlined d-flex align-items-center">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
            @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { useProductStore } from "@/store/productStore.js";
import { useI18n } from "vue-i18n";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";

const { t } = useI18n();
const apiStore = useApiServices();
const categoryStore = useCategoriesStore();
const productStore = useProductStore();

const products = ref([]);
const selectedCategory = ref("");
const searchQuery = ref("");
const sortOption = ref("");
const currentPage = ref(1);
const pageSize = ref(5);

onMounted(() => {
  getProducts();
  categoryStore.getCategories();
});

const getProducts = async () => {
  try {
    const response = await apiStore.get("products");
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredProducts = computed(() => {
  const query = removeAccents(searchQuery.value.toLowerCase());

  let filtered = products.value.filter((product) => {
    const matchesCategory = selectedCategory.value === "" || product.sysIdDanhMuc === selectedCategory.value;
    const matchesSearch =
      removeAccents(product.tenSanPham.toLowerCase()).includes(query) ||
      removeAccents(product.moTa.toLowerCase()).includes(query) ||
      product.soLuongHienCo.toString().includes(searchQuery.value);

    return matchesCategory && matchesSearch;
  });

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham));
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenSanPham.localeCompare(a.tenSanPham));
  } else if (sortOption.value === "quantity-asc") {
    filtered.sort((a, b) => a.soLuongHienCo - b.soLuongHienCo);
  } else if (sortOption.value === "quantity-desc") {
    filtered.sort((a, b) => b.soLuongHienCo - a.soLuongHienCo);
  }

  return filtered;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize.value);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1;
});

const handleItemsPerPageChange = (newItemsPerPage) => {
  pageSize.value = newItemsPerPage;
  currentPage.value = 1; // Reset to first page when changing items per page
};

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

const toggleSortByQuantity = () => {
  sortOption.value = sortOption.value === "quantity-asc" ? "quantity-desc" : "quantity-asc";
};

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

const deleteProduct = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("Product.table.swal.confirmDelete.title"),
    text: i18n.global.t("Product.table.swal.confirmDelete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("Product.table.swal.confirmDelete.cancel"),
    cancelButtonColor: "#ef4444",
    confirmButtonText: i18n.global.t("Product.table.swal.confirmDelete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`products/${id}`);
      await getProducts();
      showToastSuccess(i18n.global.t("Product.table.swal.success"));
    } catch (error) {
      console.error("Error while deleting category:", error);
      showToastError("Xóa sản phẩm thất bại. Vui lòng thử lại");
    }
  }
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  updateUrl();
};
</script>

<style scoped>
.container-fluid {
  max-width: 1600px;
  padding: 15px;
}

.table {
  font-size: 0.875rem;
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
  font-size: 0.875rem;
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
  font-size: 0.875rem;
  padding: 0.875rem 10px;
  transition: all .2s ease;
  border-radius: 0.625rem;
  background-color: var(--secondary-color);
  color: var(--nav-link-color);
}

.list-group-item:hover {
  background-color: var(--secondary-color-hover);
  border-radius: 0.625rem;
  cursor: pointer;
}

.list-group-item.active {
  background-color: var(--primary-color);
  border-radius: 0.625rem;
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
    font-size: 0.875rem;
  }

  td {
    font-size: 13px;
  }
}

.box-shadow {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}

.td-id {
  width: 40px;
}

.td-name {
  width: 400px;
}

.td-desc {
  width: 300px;
}

.td-quantity {
  width: 200px;
}

.td-action {
  width: 150px;
}
</style>