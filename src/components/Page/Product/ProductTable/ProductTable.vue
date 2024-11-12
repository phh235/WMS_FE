<template>
  <div class="box-shadow p-3">
    <div class="d-flex mb-3 justify-content-end">
      <SearchInput v-model="searchQuery" :placeholder="$t('Product.table.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByQuantity">
        <span class="material-symbols-outlined">swap_vert</span>
      </button>
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <router-link to="/inventory/product/new" class="btn btn-primary d-flex align-items-center">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('Product.table.btn_save') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="td-id">{{ $t('Product.table.no') }}</th>
            <th class="td-name">{{ $t('Product.table.product_name') }}</th>
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
            <td class="td-name">
              <div class="d-flex align-items-center">
                <img :src="product.hinhAnhUrl" alt="Product Image" class="me-3 rounded-2" width="40" loading="lazy"
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
                :to="{ name: 'product/edit/:id', params: { id: product.sysIdSanPham } }">
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
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useApiServices } from "@/services/apiService.js";
import { useI18n } from "vue-i18n";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['updateProducts']);
const { t } = useI18n();
const apiService = useApiServices();

const searchQuery = ref("");
const sortOption = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredProducts = computed(() => {
  const query = removeAccents(searchQuery.value.toLowerCase());

  let filtered = props.products.filter((product) => {
    const matchesCategory = props.selectedCategory === "" || product.sysIdDanhMuc === props.selectedCategory;
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

watch([() => props.selectedCategory, searchQuery], () => {
  currentPage.value = 1;
});

const handleItemsPerPageChange = (newItemsPerPage) => {
  pageSize.value = newItemsPerPage;
  currentPage.value = 1;
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

  if (props.selectedCategory) {
    params.set("category", props.selectedCategory);
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
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("Product.table.swal.confirmDelete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`products/${id}`);
      emit('updateProducts');
      showToastSuccess(i18n.global.t("Product.table.swal.success"));
    } catch (error) {
      console.error("Error while deleting category:", error);
      showToastError("Xóa sản phẩm thất bại. Vui lòng thử lại");
    }
  }
};
</script>

<style scoped>
.table {
  font-size: 0.875rem;
  width: 100%;
}

.table td {
  vertical-align: middle;
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
</style>