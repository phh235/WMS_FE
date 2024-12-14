<template>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <div class="table-responsive">
      <h5 class="fw-bold">Thống kê phế phẩm trong <span style="color: var(--primary-color);">7</span> ngày gần nhất
      </h5>
      <div class="d-flex justify-content-end mb-3">
        <SearchInput v-model="searchQuery" placeholder="Tìm kiếm..." />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="th-batch-code" @click="toggleSortById">Mã lô <span
                class="material-symbols-outlined ms-2 align-middle">swap_vert</span>
            </th>
            <th class="th-id-product" @click="toggleSortByName">Tên sản phẩm <span
                class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
            <th class="th-quantity" @click="toggleSortByQuantity">Số lượng (Kg) <span
                class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredWasteProduct.length === 0">
            <td colspan="7" class="text-center">Chưa có tồn kho</td>
          </tr>
          <tr v-for="(inventory, index) in paginatedWasteProduct" :key="inventory.sysIdPhePham">
            <td class="td-batch-code">{{ inventory.maLo }}</td>
            <td class="td-id-product">{{ inventory.tenSanPham }}</td>
            <td class="td-quantity">{{ inventory.soLuong }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
          @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import { useWasteProductStore } from "@/store/wasteStore.js";
import Pagination from '@/components/Common/Pagination/Pagination.vue';

const wasteProductStore = useWasteProductStore();
const searchQuery = ref("");
const sortOption = ref("");

onMounted(() => {
  wasteProductStore.getTotalWasteProduct();
});

const currentPage = ref(1);
const pageSize = ref(10);

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredWasteProduct = computed(() => {
  const query = removeAccents(searchQuery.value.toLowerCase());
  let filtered = wasteProductStore.wasteTotalProduct.filter((product) => {
    return (
      removeAccents(product.tenSanPham.toLowerCase()).includes(query) ||
      removeAccents(product.maLo.toLowerCase()).includes(query) ||
      product.soLuong.toString().includes(query) ||
      removeAccents(product.ngayPhePham.toLowerCase()).includes(query) ||
      removeAccents(product.lyDo.toLowerCase()).includes(query)
    );
  });

  if (sortOption.value === "id-asc") {
    filtered.sort((a, b) => a.maLo.localeCompare(b.maLo));
  } else if (sortOption.value === "id-desc") {
    filtered.sort((a, b) => b.maLo.localeCompare(a.maLo));
  } else if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham));
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenSanPham.localeCompare(a.tenSanPham));
  } else if (sortOption.value === "quantity-asc") {
    filtered.sort((a, b) => a.soLuong - b.soLuong);
  } else if (sortOption.value === "quantity-desc") {
    filtered.sort((a, b) => b.soLuong - a.soLuong);
  }

  return filtered;
});

const toggleSortById = () => {
  if (sortOption.value === "id-asc") {
    sortOption.value = "id-desc";
  } else {
    sortOption.value = "id-asc";
  }
};
const toggleSortByName = () => {
  if (sortOption.value === "name-asc") {
    sortOption.value = "name-desc";
  } else {
    sortOption.value = "name-asc";
  }
};
const toggleSortByQuantity = () => {
  if (sortOption.value === "quantity-asc") {
    sortOption.value = "quantity-desc";
  } else {
    sortOption.value = "quantity-asc";
  }
};

const totalPages = computed(() => {
  return Math.ceil(filteredWasteProduct.value.length / pageSize.value);
});

const paginatedWasteProduct = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredWasteProduct.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (itemsPerPage) => {
  pageSize.value = itemsPerPage;
  currentPage.value = 1;
};
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
}

td {
  height: 50px;
}

.th-id,
.td-id {
  width: 100px;
}

.th-id-product,
.td-id-product {
  width: 100px;
}

.th-warehouse-code,
.td-warehouse-code {
  width: 100px;
}

.th-batch-code,
.td-batch-code {
  width: 100px;
}

.th-quantity,
.td-quantity {
  width: 100px;
}

.th-update-date,
.td-update-date {
  width: 120px;
}

.th-action,
.td-action {
  width: 80px;
}

.bg-danger {
  font-size: 0.875rem;
  background-color: var(--bg-danger) !important;
  color: #dc3545;
  border: 1.5px solid #dc3545;
}

.badge {
  padding: 6px 8px;
  border-radius: 12px;
  font-weight: 500;
}
</style>
