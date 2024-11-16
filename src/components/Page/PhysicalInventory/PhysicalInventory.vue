<template>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <div class="table-responsive p-md-3">
      <button type="button" class="btn btn-primary d-flex align-items-center" @click="addInventory">
        <span class="material-symbols-outlined me-2">add</span>Thêm tồn kho
      </button>
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="th-id">ID Tồn kho</th>
            <th class="th-id-product">ID Sản phẩm</th>
            <th class="th-warehouse-code">Mã kho</th>
            <th class="th-batch-code">Mã lô</th>
            <th class="th-quantity">Số lượng</th>
            <th class="th-update-date">Ngày cập nhật</th>
            <th class="th-action text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="inventoryData.length === 0">
            <td colspan="7" class="text-center">Chưa có tồn kho</td>
          </tr>
          <tr v-for="(inventory, index) in inventoryData" :key="index">
            <td class="td-id">
              <input v-model="inventory.idTonKho" type="text" class="form-control" />
            </td>
            <td class="td-id-product">
              <input v-model="inventory.idSanPham" type="text" class="form-control" />
            </td>
            <td class="td-warehouse-code">
              <input v-model="inventory.tenKho" type="text" class="form-control" />
            </td>
            <td class="td-batch-code">
              <input v-model="inventory.maLo" type="text" class="form-control" />
            </td>
            <td class="td-quantity">
              <input v-model.number="inventory.soLuong" type="number" class="form-control" min="0" />
            </td>
            <td class="td-update-date">
              <VueDatePicker v-model="inventory.ngayCapNhat" :enable-time-picker="false" :teleport="true"
                :format="format" auto-apply :auto-position="true" placeholder="Chọn ngày cập nhật"></VueDatePicker>
            </td>
            <td class="td-action">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import VueDatePicker from "@vuepic/vue-datepicker";

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const inventoryData = reactive([
  { idTonKho: 1, idSanPham: 101, tenKho: 'K001', maLo: 'L001', soLuong: 50, ngayCapNhat: new Date() },
  { idTonKho: 2, idSanPham: 102, tenKho: 'K002', maLo: 'L002', soLuong: 30, ngayCapNhat: new Date() },
]);

const addInventory = () => {
  inventoryData.push({
    idTonKho: inventoryData.length + 1,
    idSanPham: '',
    tenKho: '',
    maLo: '',
    soLuong: 0,
    ngayCapNhat: new Date()
  });
};

const removeInventory = (index) => {
  inventoryData.splice(index, 1);
};
</script>

<style scoped>
.container-fluid {
  max-width: 1400px;
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
}

.btn-danger {
  padding: 10px;
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
