<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="search" class="form-control" placeholder="Tìm kiếm khu vực" v-model="searchQuery" />
    </div>
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseZoneBtn"
      data-bs-toggle="modal" data-bs-target="#warehouseZoneModal">
      <span class="material-symbols-outlined me-2"> add </span>
      Thêm khu vực
    </button>
  </div>
  <div class="table-responsive">
    <table class="table table-hover" @click="handleRowClick">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col">Mã khu vực</th>
          <th scope="col">Tên khu vực</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Mã kho</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredZones.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy khu vực</td>
        </tr>
        <tr v-for="zone in filteredZones" :key="zone.sysIdKhuVuc" :data-id="zone.sysIdKhuVuc">
          <td scope="row" class="d-none">{{ zone.sysIdKhuVuc }}</td>
          <td>{{ zone.maKhuVuc }}</td>
          <td>{{ zone.tenKhuVuc }}</td>
          <td>{{ zone.moTa }}</td>
          <td>{{ zone.maKho }}</td>
          <td class="text-center">
            <button class="btn btn-danger" @click="deleteWarehouseZone(zone.maKhuVuc, $event)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="warehouseZoneModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedWarehouseZone.sysIdKhuVuc ? "Chỉnh sửa khu vực" : "Thêm khu vực" }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm_Click"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="maKhuVuc" class="form-label fs fw-bold">Mã khu vực</label>
                  <input type="text" class="form-control" id="maKhuVuc" aria-describedby="maKhuVucHelp"
                    v-model="selectedWarehouseZone.maKhuVuc" />
                </div>
                <div class="col-6">
                  <label for="tenKhuVuc" class="form-label fs fw-bold">Tên khu vực</label>
                  <input type="text" class="form-control" id="tenKhuVuc" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedWarehouseZone.tenKhuVuc" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="maKho" class="form-label fs fw-bold">Mã kho</label>
              <select class="form-select" id="maKho" v-model="selectedWarehouseZone.maKho">
                <option value="" disabled>Chọn kho</option>
                <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho" :value="warehouse.maKho">
                  {{ warehouse.maKho }} - {{ warehouse.tenKho }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="warehouseZoneDescription" class="form-label fs fw-bold">Mô tả</label>
              <textarea class="form-control" id="warehouseZoneDescription" rows="4"
                aria-describedby="warehouseZoneDescriptionHelp" v-model="selectedWarehouseZone.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
            Hủy
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouseZone">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouseZone.sysIdKhuVuc ? "Cập nhật" : "Lưu" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useWarehouseStore } from "@/store/warehouseStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";

const apiStore = useApiStore();
const zones = ref([]);
const warehouseStore = useWarehouseStore();
const addWarehouseZoneBtn = ref(null);
const searchQuery = ref("");
const selectedWarehouseZone = reactive({
  sysIdKhuVuc: "",
  maKhuVuc: "",
  tenKhuVuc: "",
  moTa: "",
  maKho: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getWarehouseZone();
  fetchWarehouses();
});

const fetchWarehouses = async () => {
  await warehouseStore.getWarehouses();
};

const getWarehouseZone = async () => {
  try {
    const response = await apiStore.get(`zones?page=${currentPage.value}&size=${pageSize.value}`);
    zones.value = response.data.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch zones:", error);
  }
};

const filteredZones = computed(() => {
  return zones.value.filter(
    (zone) =>
      zone.maKhuVuc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.tenKhuVuc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.moTa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.maKho.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const saveWarehouseZone = async () => {
  if (!selectedWarehouseZone.maKhuVuc.trim()) {
    showToastError("Mã khu vực không được để trống!");
    return;
  }
  if (!selectedWarehouseZone.tenKhuVuc.trim()) {
    showToastError("Tên khu vực không được để trống!");
    return;
  }
  if (!selectedWarehouseZone.moTa.trim()) {
    showToastError("Mô tả khu vực không được để trống!");
    return;
  }
  if (!selectedWarehouseZone.maKho) {
    showToastError("Vui lòng chọn một kho!");
    return;
  }

  try {
    let response;
    if (selectedWarehouseZone.sysIdKhuVuc) {
      response = await apiStore.post("zones", {
        sysIdKhuVuc: selectedWarehouseZone.sysIdKhuVuc,
        maKhuVuc: selectedWarehouseZone.maKhuVuc,
        tenKhuVuc: selectedWarehouseZone.tenKhuVuc,
        moTa: selectedWarehouseZone.moTa,
        maKho: selectedWarehouseZone.maKho,
      });
    } else {
      response = await apiStore.post("zones", {
        maKhuVuc: selectedWarehouseZone.maKhuVuc,
        tenKhuVuc: selectedWarehouseZone.tenKhuVuc,
        moTa: selectedWarehouseZone.moTa,
        maKho: selectedWarehouseZone.maKho,
      });
    }

    if (response) {
      await getWarehouseZone();
      btnResetForm_Click();
      addWarehouseZoneBtn.value.click();
      showToastSuccess("Lưu thành công");
    } else {
      if (response && response.error) {
        console.error("Error details:", response.error);
      }
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

const handleRowClick = (event) => {
  const row = event.target.closest("tr");
  const id = row.getAttribute("data-id");
  const selectedWarehouseZoneValue = zones.value.find((zone) => zone.sysIdKhuVuc == id);
  if (selectedWarehouseZoneValue) {
    Object.assign(selectedWarehouseZone, selectedWarehouseZoneValue);
    addWarehouseZoneBtn.value.click();
  }
};

const deleteWarehouseZone = async (id, event) => {
  event.stopPropagation();
  const swalConfirm = await Swal.fire({
    title: "Xóa khu vực?",
    text: "Bạn có chắc chắn muốn xóa khu vực này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`zones/${id}`);
      await getWarehouseZone();
      showToastSuccess("Khu vực đã được xóa");
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

const btnResetForm_Click = () => {
  Object.assign(selectedWarehouseZone, {
    sysIdKhuVuc: "",
    maKhuVuc: "",
    tenKhuVuc: "",
    moTa: "",
    maKho: "",
  });
};
</script>

<style scoped>
tr,
td {
  border-bottom: 1px solid #dfdfdf;
}

td {
  font-size: 14px;
  cursor: pointer;
  vertical-align: middle;
}

.btn-danger {
  padding: 10px 10px;
}

.btn-close {
  box-shadow: none;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.1s;

  &:hover,
  &:active {
    background-color: var(--secondary-color);
    padding: 8px;
  }
}
</style>
