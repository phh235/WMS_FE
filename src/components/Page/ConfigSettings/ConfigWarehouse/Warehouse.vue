<template>
  <div class="mb-4 d-flex justify-content-end align-items-center">
    <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.warehouses.search_input')" />
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseBtn" data-bs-toggle="modal"
      data-bs-target="#warehouseModal" style="height: 39.67px;">
      <span class="material-symbols-outlined me-2"> add </span>
      {{ $t('ConfigSettings.warehouses.btn_create') }}
    </button>
  </div>
  <WarehouseTable :warehouses="filteredWarehouses" @edit="editWarehouse" @delete="deleteWarehouse" />
  <div class="modal fade" id="warehouseModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedWarehouse.sysIdKho ? $t('ConfigSettings.warehouses.title_edit')
              : $t('ConfigSettings.warehouses.title_save') }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <!-- <div class="mb-3 d-none">
              <label for="warehouseId" class="form-label fs fw-bold">SysIdKho</label>
              <input
                type="text"
                class="form-control"
                id="warehouseId"
                aria-describedby="warehouseIdHelp"
                v-model="selectedWarehouse.sysIdKho"
              />
            </div> -->
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="warehouseId" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.warehouses.warehouse_id') }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="warehouseId" aria-describedby="warehouseIdHelp"
                    v-model="selectedWarehouse.maKho" />
                </div>
                <div class="col-6">
                  <label for="tenKho" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.warehouses.warehouse_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenKho" aria-describedby="warehouseNameHelp"
                    v-model="selectedWarehouse.tenKho" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="dienTich" class="form-label fs fw-bold">{{ $t('ConfigSettings.warehouses.warehouse_area')
                    }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="dienTich" aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.dienTich" />
                </div>
                <div class="col-6">
                  <label for="sysIdUser" class="form-label fs fw-bold">{{ $t('ConfigSettings.warehouses.manager')
                    }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="sysIdUser" aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.sysIdUser" />
                </div>
              </div>
            </div>
            <div>
              <label for="warehouseDescription" class="form-label fs fw-bold">{{
                $t('ConfigSettings.warehouses.warehouse_desc') }}</label>
              <textarea class="form-control" id="warehouseDescription" rows="4"
                aria-describedby="warehouseDescriptionHelp" v-model="selectedWarehouse.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm">
            {{ $t('ConfigSettings.btn_cancel') }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouse">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouse.sysIdKho ? $t('ConfigSettings.btn_update') : $t('ConfigSettings.btn_save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useWarehouseStore } from "@/store/warehouseStore";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import Category from "../ConfigCategory/Category.vue";
import WarehouseTable from "./WarehouseTable.vue";

const apiService = useApiServices();
const warehouseStore = useWarehouseStore();
const addWarehouseBtn = ref(null);
const searchQuery = ref("");
const selectedWarehouse = reactive({
  sysIdKho: "",
  maKho: "",
  tenKho: "",
  dienTich: "",
  moTa: "",
  sysIdUser: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(10);
const pageSize = ref(100);

onMounted(async () => {
  await warehouseStore.getWarehouses();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredWarehouses = computed(() => {
  const queryUpper = removeAccents(searchQuery.value.toUpperCase());
  const queryLower = removeAccents(searchQuery.value.toLowerCase());
  return warehouseStore.warehouses.filter(
    (warehouse) =>
      removeAccents(warehouse.maKho.toString()).includes(queryUpper) ||
      removeAccents(warehouse.tenKho.toString()).includes(queryUpper) ||
      removeAccents(warehouse.moTa.toLowerCase()).includes(queryLower) ||
      warehouse.dienTich.toString().includes(queryLower)
  );
});

// Lưu hoặc cập nhật kho hàng
const saveWarehouse = async () => {
  if (!selectedWarehouse.maKho.trim()) {
    showToastError(i18n.global.t("ConfigSettings.warehouses.swal.validate.warehouse_id"));
    return;
  }

  if (!selectedWarehouse.tenKho.trim()) {
    showToastError(i18n.global.t("ConfigSettings.warehouses.swal.validate.warehouse_name"));
    return;
  }

  if (!selectedWarehouse.dienTich) {
    showToastError(i18n.global.t("ConfigSettings.warehouses.swal.validate.warehouse_area"));
    return;
  }

  if (!selectedWarehouse.sysIdUser) {
    showToastError(i18n.global.t("ConfigSettings.warehouses.swal.validate.manager"));
    return;
  }

  try {
    const warehouseData = {
      maKho: selectedWarehouse.maKho,
      tenKho: selectedWarehouse.tenKho,
      dienTich: selectedWarehouse.dienTich,
      moTa: selectedWarehouse.moTa,
      sysIdUser: selectedWarehouse.sysIdUser,
    };

    const response = selectedWarehouse.sysIdKho
      ? await apiService.post("warehouses", {
        ...warehouseData,
        sysIdKho: selectedWarehouse.sysIdKho,
      })
      : await apiService.post("warehouses", warehouseData);

    if (response) {
      warehouseStore.getWarehouses();
      btnResetForm();
      addWarehouseBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.warehouses.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving warehouse:", error);
  }
};

// Điền dữ liệu vào form khi click vào dòng <tr></tr>
const editWarehouse = (category) => {
  Object.assign(selectedWarehouse, category);
  addWarehouseBtn.value.click();
};

// Xóa kho hàng
const deleteWarehouse = async (maKho) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.warehouses.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.warehouses.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.warehouses.swal.delete.cancel"),
    cancelButtonColor: "#ef4444",
    confirmButtonText: i18n.global.t("ConfigSettings.warehouses.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`warehouses/${maKho}`);
      warehouseStore.getWarehouses(); // Cập nhật lại danh sách kho hàng sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.warehouses.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting warehouse:", error);
      showToastError(i18n.global.t("ConfigSettings.warehouses.swal.delete.failed"));
    }
  }
};

// Làm mới form nhập
const btnResetForm = () => {
  Object.assign(selectedWarehouse, {
    sysIdKho: "",
    maKho: "",
    tenKho: "",
    dienTich: "",
    moTa: "",
    sysIdUser: "",
  });
};
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>
