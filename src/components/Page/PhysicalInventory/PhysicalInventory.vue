<template>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <div class="table-responsive">
      <div class="d-flex justify-content-end mb-3">
        <SearchInput v-model="searchQuery" placeholder="Tìm kiếm..." />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="th-id">ID Tồn kho</th>
            <th class="th-id-product">Tên sản phẩm</th>
            <th class="th-warehouse-code">Tên kho</th>
            <th class="th-batch-code">Mã lô</th>
            <th class="th-quantity">Số lượng</th>
            <th class="th-update-date">Ngày cập nhật</th>
            <th class="th-update-date">Cảnh báo hết hạn</th>
            <th class="th-update-date">{{ $t('PurchaseRequest.table.action') }}</th>
            <!-- <th class="th-action text-center">Hành động</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="inventoriesStore.inventories.length === 0">
            <td colspan="7" class="text-center">Chưa có tồn kho</td>
          </tr>
          <tr v-for="(inventory, index) in paginatedInventories" :key="inventory.sysIdTonKho">
            <td class="td-id">{{ inventory.sysIdTonKho }}</td>
            <td class="td-id-product">{{ inventory.tenSanPham }}</td>
            <td class="td-warehouse-code">{{ inventory.tenKho }}</td>
            <td class="td-batch-code">{{ inventory.maLo }}</td>
            <td class="td-quantity">{{ inventory.soLuong }}</td>
            <td class="td-update-date">{{ new Date(inventory.ngayCapNhat).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
            }).replace(/\/$/,
              '').replace(/:\d{2}$/, '') }}</td>
            <td>
              <span v-if="inventory.isNearExpiry" class="badge d-flex align-items-center bg-danger" style="width: fit-content;">
                <span class="material-symbols-outlined me-2">alarm</span>
                Sắp hết hạn
              </span>
              <span v-else></span>
            </td>
            <td class="td-quantity"><button class="btn btn-danger d-flex align-items-center"
                @click="deleteWasteConsignment(inventory.sysIdTonKho)"><span
                  class="material-symbols-outlined me-2">close</span> Hủy</button></td>
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
import { useInventoriesStore } from "@/store/inventoriesStore.js";
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import { useApiServices } from '@/services/apiService';
import { showToastSuccess } from '@/utils/Toast/toastHandle';

const inventoriesStore = useInventoriesStore();
const searchQuery = ref("");
const apiService = useApiServices();

onMounted(() => {
  inventoriesStore.getInventories();
});

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(inventoriesStore.inventories.length / pageSize.value);
});

const paginatedInventories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return inventoriesStore.inventories.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (itemsPerPage) => {
  pageSize.value = itemsPerPage;
  currentPage.value = 1;
};

const deleteWasteConsignment = async (id) => {
  try {
    const response = await apiService.post(`waste-products/${id}`);
    if (response) {
      showToastSuccess('Hủy bỏ lô hàng hết hạn thành công');
    }
    inventoriesStore.getInventories();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
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
