<template>
  <div class="container-fluid">
    <button class="btn btn-sm btn-primary mb-3" @click="addNewRow">Thêm mới</button>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vị trí</th>
            <th>Tần suất kiểm kho</th>
            <th>Sản phẩm</th>
            <th>Danh mục sản phẩm</th>
            <th>Ngày đếm gần nhất</th>
            <th>Số lượng hiện có</th>
            <th>Số lượng đã đếm</th>
            <th>Chênh lệch</th>
            <th>Ngày theo kế hoạch</th>
            <th>Người kiểm</th>
            <th>Lịch sử</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inbound, index) in inbounds" :key="inbound.id" style="cursor: pointer">
            <td v-for="(value, key) in inbound" :key="key" @click="startEditing(index, key)">
              <input v-if="editingCell.rowIndex === index && editingCell.key === key" v-model="inbound[key]"
                @keyup.enter="finishEditing" @blur="finishEditing" ref="editInput" />
              <span v-else>{{ value }}</span>
            </td>
            <td><button class="btn btn-secondary">Lịch sử</button></td>
            <td>
              <button class="btn btn-sm btn-primary me-2">Áp dụng</button>
              <button class="btn btn-sm btn-logout" @click="deleteRow(index)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import data from "../PhysicalInventory/data.json";

const inbounds = ref(data);
const editingCell = ref({ rowIndex: -1, key: null });

const addNewRow = () => {
  const newRow = {
    id: 2,
    viTri: "",
    tanSuatKiemKho: "",
    sanPham: "",
    danhMucSanPham: "",
    ngayDemGanNhat: "",
    soLuongHienCo: "",
    soLuongDaDem: "",
    chenhLech: "",
    ngayTheoKeHoach: "",
    nguoiKiem: "",
  };
  inbounds.value.push(newRow);
  const newIndex = inbounds.value.length - 1;
  startEditing(newIndex, "viTri");
};

const startEditing = (rowIndex, key) => {
  editingCell.value = { rowIndex, key };
  nextTick(() => {
    if (document.activeElement.tagName !== "INPUT") {
      const input = document.querySelector("input:focus");
      if (input) input.select();
    }
  });
};

const finishEditing = () => {
  editingCell.value = { rowIndex: -1, key: null };
};

const deleteRow = (index) => {
  inbounds.value.splice(index, 1);
};
</script>

<style scoped>
.table {
  font-size: 0.875rem;
  vertical-align: middle;
}

input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
}
</style>
