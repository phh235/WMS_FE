<template>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <div class="table-responsive p-md-3">
      <!-- <button type="button" class="btn btn-primary d-flex align-items-center" @click="addInventory">
        <span class="material-symbols-outlined me-2">add</span>Thêm tồn kho
      </button> -->
      <div class="d-flex justify-content-end mb-3">
        <SearchInput v-model="searchQuery" placeholder="Tìm kiếm..." />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="th-id">ID Tồn kho</th>
            <th class="th-id-product">ID Sản phẩm</th>
            <th class="th-warehouse-code">Mã kho</th>
            <th class="th-batch-code">Mã lô</th>
            <th class="th-quantity">Số lượng</th>
            <th class="th-update-date">Ngày cập nhật</th>
            <!-- <th class="th-action text-center">Hành động</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="inventoriesStore.inventories.length === 0">
            <td colspan="7" class="text-center">Chưa có tồn kho</td>
          </tr>
          <tr v-for="(inventory, index) in inventoriesStore.inventories" :key="inventory.sysIdTonKho">
            <td class="td-id">{{ inventory.sysIdTonKho }}</td>
            <td class="td-id-product">{{ inventory.tenSanPham }}</td>
            <td class="td-warehouse-code">{{ inventory.maKho }}</td>
            <td class="td-batch-code">{{ inventory.maLo }}</td>
            <td class="td-quantity">{{ inventory.soLuong }}</td>
            <td class="td-update-date">{{ new Date(inventory.ngayCapNhat).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
            }).replace(/\/$/,
              '').replace(/:\d{2}$/, '') }}</td>
            <!-- <td class="td-action">
              <div class="d-flex align-items-center justify-content-center">
                <button type="button" class="btn btn-primary d-flex justify-content-center align-items-center me-2"
                  @click="removeInventory(index)" style="padding: 10px">
                  <span class="material-symbols-outlined">check</span>
                </button>
                <button type="button" class="btn btn-danger d-flex justify-content-center align-items-center"
                  @click="removeInventory(index)">
                  <span class="material-symbols-outlined">delete_sweep</span>
                </button>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import { useInventoriesStore } from "@/store/inventoriesStore.js";

const inventoriesStore = useInventoriesStore();

onMounted(() => {
  inventoriesStore.getInventories();
});
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
</style>
