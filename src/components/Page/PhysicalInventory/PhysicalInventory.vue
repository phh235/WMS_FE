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
          <tr v-if="filteredInventories.length === 0">
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
              <span v-if="inventory.isNearExpiry" class="badge d-flex align-items-center bg-danger"
                style="width: fit-content;">
                <span class="material-symbols-outlined me-2">alarm</span>
                Sắp hết hạn
              </span>
              <span v-else></span>
            </td>
            <td class="td-quantity"><button class="btn btn-danger d-flex align-items-center"
                @click="deleteWasteConsignment(inventory.sysIdTonKho)"><span
                  class="material-symbols-outlined me-2">close</span> Hủy lô</button></td>
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
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2"
import { showToastSuccess } from '@/utils/Toast/toastHandle';

const inventoriesStore = useInventoriesStore();
const searchQuery = ref("");
const apiService = useApiServices();
const { t } = useI18n();
const lyDo = ref('');
const sortOption = ref("");

onMounted(() => {
  inventoriesStore.getInventories();
});

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(filteredInventories.value.length / pageSize.value);
});

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredInventories = computed(() => {
  const query = removeAccents(searchQuery.value.toLowerCase());
  let filtered = inventoriesStore.inventories.filter((product) => {
    return (
      removeAccents(product.tenSanPham.toLowerCase()).includes(query) ||
      removeAccents(product.maLo.toLowerCase()).includes(query) ||
      product.soLuong.toString().includes(query) ||
      removeAccents(product.ngayPhePham.toLowerCase()).includes(query) ||
      removeAccents(product.lyDo.toLowerCase()).includes(query)
    );
  });

  if (sortOption.value === "id-asc") {
    filtered.sort((a, b) => a.sysIdTonKho - b.sysIdTonKho);
  } else if (sortOption.value === "id-desc") {
    filtered.sort((a, b) => b.sysIdTonKho - a.sysIdTonKho);
  } else if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham));
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenSanPham.localeCompare(a.tenSanPham));
  } else if (sortOption.value === "warehouse-asc") {
    filtered.sort((a, b) => a.tenKho.localeCompare(b.tenKho));
  } else if (sortOption.value === "warehouse-desc") {
    filtered.sort((a, b) => b.tenKho.localeCompare(a.tenKho));
  } else if (sortOption.value === "batch-asc") {
    filtered.sort((a, b) => a.maLo.localeCompare(b.maLo));
  } else if (sortOption.value === "batch-desc") {
    filtered.sort((a, b) => b.maLo.localeCompare(a.maLo));
  } else if (sortOption.value === "quantity-asc") {
    filtered.sort((a, b) => a.soLuong - b.soLuong);
  } else if (sortOption.value === "quantity-desc") {
    filtered.sort((a, b) => b.soLuong - a.soLuong);
  } else if (sortOption.value === "update-date-asc") {
    filtered.sort((a, b) => new Date(a.ngayCapNhat) - new Date(b.ngayCapNhat));
  } else if (sortOption.value === "update-date-desc") {
    filtered.sort((a, b) => new Date(b.ngayCapNhat) - new Date(a.ngayCapNhat));
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
const toggleSortByWarehouse = () => {
  if (sortOption.value === "warehouse-asc") {
    sortOption.value = "warehouse-desc";
  } else {
    sortOption.value = "warehouse-asc";
  }
};
const toggleSortByBatch = () => {
  if (sortOption.value === "batch-asc") {
    sortOption.value = "batch-desc";
  } else {
    sortOption.value = "batch-asc";
  }
};
const toggleSortByQuantity = () => {
  if (sortOption.value === "quantity-asc") {
    sortOption.value = "quantity-desc";
  } else {
    sortOption.value = "quantity-asc";
  }
};
const toggleSortByUpdateDate = () => {
  if (sortOption.value === "update-date-asc") {
    sortOption.value = "update-date-desc";
  } else {
    sortOption.value = "update-date-asc";
  }
};

const paginatedInventories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredInventories.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (itemsPerPage) => {
  pageSize.value = itemsPerPage;
  currentPage.value = 1;
};

const deleteWasteConsignment = async (id) => {
  Swal.fire({
    title: 'Hủy lô hàng hết hạn',
    text: 'Xác nhận hủy lô hàng hết hạn',
    input: 'text',
    preConfirm: (lyDo) => {
      return lyDo;
    },
    confirmButtonText: 'Xác nhận',
    showCancelButton: true,
    cancelButtonText: 'Hủy',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await apiService.post(`waste-products/${id}/${result.value}`);
        if (response) {
          showToastSuccess('Hủy bỏ lô hàng hết hạn thành công');
        }
        inventoriesStore.getInventories();
      } catch (error) {
        console.error(error);
      }
    }
  });
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
