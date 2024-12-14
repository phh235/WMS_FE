<template>
  <div class="mb-4 d-flex justify-content-end align-items-center">
    <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.warehouses.search_input')" />
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseBtn" data-bs-toggle="modal"
      data-bs-target="#warehouseModal" style="height: 39.67px;">
      <span class="material-symbols-outlined me-2"> add </span>
      {{ $t('ConfigSettings.warehouses.btn_create') }}
    </button>
  </div>
  <WarehouseTable :warehouses="filteredWarehouses" @edit="editWarehouse" @delete="deleteWarehouse" @id="toggleSortById"
    @name="toggleSortByName" @area="toggleSortByArea" @manager="toggleSortByManager" />
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
            <div class="mb-3">
              <div class="row">
                <div class="col-12 col-md-6 mb-md-0 mb-3">
                  <label for="warehouseId" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.warehouses.warehouse_id') }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="warehouseId" :class="{ 'is-invalid': errors.maKho }"
                    v-model="selectedWarehouse.maKho" />
                  <div class="invalid-feedback" v-if="errors.maKho">{{ $t(errors.maKho) }}</div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="tenKho" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.warehouses.warehouse_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenKho" aria-describedby="warehouseNameHelp"
                    :class="{ 'is-invalid': errors.tenKho }" v-model="selectedWarehouse.tenKho" />
                  <div class="invalid-feedback" v-if="errors.tenKho">{{ $t(errors.tenKho) }}</div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-12 col-md-6 mb-md-0 mb-3">
                  <label for="dienTich" class="form-label fs fw-bold">{{ $t('ConfigSettings.warehouses.warehouse_area')
                    }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="dienTich" aria-describedby="warehouseAdressHelp"
                    :class="{ 'is-invalid': errors.dienTich }" v-model="selectedWarehouse.dienTich" />
                  <div class="invalid-feedback" v-if="errors.dienTich">{{ $t(errors.dienTich) }}</div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="sysIdUser" class="form-label fs fw-bold">{{ $t('ConfigSettings.warehouses.manager')
                    }}</label> <span class="text-danger">*</span>
                  <select class="form-select" id="sysIdUser" v-model="selectedWarehouse.sysIdUser"
                    :class="{ 'is-invalid': errors.sysIdUser }">
                    <option value="" disabled>
                      {{ $t('ConfigSettings.warehouses.choose_manager') }}
                    </option>
                    <option v-for="user in userStore.users" :key="user.sysIdUser" :value="user.sysIdUser">
                      {{ user.fullName }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.sysIdUser">{{ $t(errors.sysIdUser) }}</div>
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
          <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
            @click="btnResetForm">
            <span class="material-symbols-outlined me-2">close</span>
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
import { useUserStore } from "@/store/userStore";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import WarehouseTable from "./WarehouseTable.vue";
import { isNotEmpty, validate } from "@/utils/validation";

const apiService = useApiServices();
const warehouseStore = useWarehouseStore();
const userStore = useUserStore();
const addWarehouseBtn = ref(null);
const searchQuery = ref("");
const sortOption = ref("");
const selectedWarehouse = reactive({
  sysIdKho: "",
  maKho: "",
  tenKho: "",
  dienTich: "",
  moTa: "",
  sysIdUser: "",
});
const errors = reactive({});

onMounted(async () => {
  await warehouseStore.getWarehouses();
  await userStore.getUsers();
});

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredWarehouses = computed(() => {
  const queryUpper = removeAccents(searchQuery.value.toUpperCase());
  const queryLower = removeAccents(searchQuery.value.toLowerCase());
  let filtered = warehouseStore.warehouses.filter(
    (warehouse) =>
      removeAccents(warehouse.maKho.toString()).includes(queryUpper) ||
      removeAccents(warehouse.tenKho.toString()).includes(queryUpper) ||
      removeAccents(warehouse.moTa.toLowerCase()).includes(queryLower) ||
      warehouse.dienTich.toString().includes(queryLower)
  );

  if (sortOption.value === "id-asc") {
    filtered.sort((a, b) => a.sysIdKho - b.sysIdKho); // tăng dần
  } else if (sortOption.value === "id-desc") {
    filtered.sort((a, b) => b.sysIdKho - a.sysIdKho); // giảm dần
  } else if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenKho.localeCompare(b.tenKho)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenKho.localeCompare(a.tenKho)); // Z-A
  } else if (sortOption.value === "area-asc") {
    filtered.sort((a, b) => a.dienTich - b.dienTich); // A-Z
  } else if (sortOption.value === "area-desc") {
    filtered.sort((a, b) => b.dienTich - a.dienTich); // Z-A
  } else if (sortOption.value === "manager-asc") {
    filtered.sort((a, b) => a.nguoiPhuTrach.localeCompare(b.nguoiPhuTrach)); // A-Z
  } else if (sortOption.value === "manager-desc") {
    filtered.sort((a, b) => b.nguoiPhuTrach.localeCompare(a.nguoiPhuTrach)); // Z-A
  }

  return filtered;
});

const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  updateUrl();
};

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

const toggleSortByArea = () => {
  sortOption.value = sortOption.value === "area-asc" ? "area-desc" : "area-asc";
  updateUrl();
};

const toggleSortByManager = () => {
  sortOption.value = sortOption.value === "manager-asc" ? "manager-desc" : "manager-asc";
  updateUrl();
};

const updateUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (sortOption.value) {
    params.set("sort", sortOption.value);
  } else {
    params.delete("sort");
  }

  url.search = params.toString();
  window.history.replaceState({}, "", url.toString());
};

// Lưu hoặc cập nhật kho hàng
const saveWarehouse = async () => {
  errors.maKho = validate(selectedWarehouse.maKho, [
    { check: isNotEmpty, message: ("ConfigSettings.warehouses.swal.validate.warehouse_id") },
  ]);

  errors.tenKho = validate(selectedWarehouse.tenKho, [
    { check: isNotEmpty, message: ("ConfigSettings.warehouses.swal.validate.warehouse_name") },
  ]);

  errors.dienTich = validate(selectedWarehouse.dienTich, [
    { check: isNotEmpty, message: ("ConfigSettings.warehouses.swal.validate.warehouse_area") },
  ]);

  errors.sysIdUser = validate(selectedWarehouse.sysIdUser, [
    { check: isNotEmpty, message: ("ConfigSettings.warehouses.swal.validate.manager") },
  ]);

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
    cancelButtonColor: "#dc3545",
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
  Object.assign(errors, {
    maKho: "",
    tenKho: "",
    dienTich: "",
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
