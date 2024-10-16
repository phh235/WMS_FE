<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-2">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="search" class="form-control" :placeholder="$t('Config_settings.warehouses.search_input')"
        v-model="searchQuery" />
    </div>
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseBtn" data-bs-toggle="modal"
      data-bs-target="#warehouseModal">
      <span class="material-symbols-outlined me-2"> add </span>
      {{ $t('Config_settings.warehouses.btn_create') }}
    </button>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col">{{ $t('Config_settings.warehouses.warehouse_id') }}</th>
          <th scope="col">{{ $t('Config_settings.warehouses.warehouse_name') }}</th>
          <th scope="col">{{ $t('Config_settings.warehouses.warehouse_area') }}</th>
          <th scope="col">{{ $t('Config_settings.warehouses.warehouse_desc') }}</th>
          <th scope="col">{{ $t('Config_settings.warehouses.manager') }}</th>
          <th scope="col" class="text-center">{{ $t('Config_settings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredWarehouses.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy kho hàng</td>
        </tr>
        <tr v-for="warehouse in filteredWarehouses" :key="warehouse.sysIdKho" :data-id="warehouse.sysIdKho">
          <td scope="row" class="d-none">{{ warehouse.sysIdKho }}</td>
          <td>{{ warehouse.maKho }}</td>
          <td>{{ warehouse.tenKho }}</td>
          <td>{{ warehouse.dienTich }}</td>
          <td>{{ warehouse.moTa }}</td>
          <td>{{ warehouse.sysIdUser }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="handleRowClick">
              <span class="material-symbols-outlined d-flex align-items-center"> edit </span>
            </button>
            <button class="btn btn-danger" @click="deleteWarehouse(warehouse.maKho, $event)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="warehouseModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedWarehouse.sysIdKho ? $t('Config_settings.warehouses.title_edit')
              : $t('Config_settings.warehouses.title_save') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm_Click"></button>
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
                    $t('Config_settings.warehouses.warehouse_id') }}</label>
                  <input type="text" class="form-control" id="warehouseId" aria-describedby="warehouseIdHelp"
                    v-model="selectedWarehouse.maKho" />
                </div>
                <div class="col-6">
                  <label for="tenKho" class="form-label fs fw-bold">
                    {{ $t('Config_settings.warehouses.warehouse_name') }}
                  </label>
                  <input type="text" class="form-control" id="tenKho" aria-describedby="warehouseNameHelp"
                    v-model="selectedWarehouse.tenKho" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="dienTich" class="form-label fs fw-bold">{{ $t('Config_settings.warehouses.warehouse_area')
                    }}</label>
                  <input type="text" class="form-control" id="dienTich" aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.dienTich" />
                </div>
                <div class="col-6">
                  <label for="sysIdUser" class="form-label fs fw-bold">{{ $t('Config_settings.warehouses.manager')
                    }}</label>
                  <input type="text" class="form-control" id="sysIdUser" aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.sysIdUser" />
                </div>
              </div>
            </div>
            <div>
              <label for="warehouseDescription" class="form-label fs fw-bold">{{
                $t('Config_settings.warehouses.warehouse_desc') }}</label>
              <textarea class="form-control" id="warehouseDescription" rows="4"
                aria-describedby="warehouseDescriptionHelp" v-model="selectedWarehouse.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
            {{ $t('Config_settings.btn_cancel') }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouse">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouse.sysIdKho ? $t('Config_settings.btn_update') : $t('Config_settings.btn_save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";

const apiStore = useApiStore();
const warehouses = ref([]);
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

onMounted(() => {
  getWarehouses();
});

// Lấy kho hàng sản phẩm
const getWarehouses = async () => {
  try {
    const response = await apiStore.get(
      `warehouses?page=${currentPage.value}&size=${pageSize.value}`
    );
    warehouses.value = response.data.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch warehouses:", error);
  }
};

const filteredWarehouses = computed(() => {
  return warehouses.value.filter(
    (warehouse) =>
      warehouse.maKho.toString().includes(searchQuery.value.toUpperCase()) ||
      warehouse.tenKho.toString().includes(searchQuery.value.toUpperCase()) ||
      warehouse.moTa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      warehouse.dienTich.toString().includes(searchQuery.value.toLowerCase())
  );
});

// Lưu hoặc cập nhật kho hàng
const saveWarehouse = async () => {
  // Kiểm tra nếu ID trống
  if (!selectedWarehouse.maKho.trim()) {
    showToastError(i18n.global.t("Config_settings.warehouses.swal.validate.warehouse_id"));
    return;
  }
  // Kiểm tra nếu tên kho hàng trống
  if (!selectedWarehouse.tenKho.trim()) {
    showToastError(i18n.global.t("Config_settings.warehouses.swal.validate.warehouse_name"));
    return;
  }
  // Kiểm tra nếu Diện tích trống
  if (!selectedWarehouse.dienTich) {
    showToastError(i18n.global.t("Config_settings.warehouses.swal.validate.warehouse_area"));
    return;
  }

  // // Kiểm tra nếu mô tả trống
  // if (!selectedWarehouse.moTa.trim()) {
  //   showToastError("Mô tả kho hàng không được để trống!");
  //   return;
  // }

  // Kiểm tra nếu userId trống
  if (!selectedWarehouse.sysIdUser) {
    showToastError(i18n.global.t("Config_settings.warehouses.swal.validate.manager"));
    return;
  }

  try {
    let response;
    if (selectedWarehouse.sysIdKho) {
      // Nếu có ID, thực hiện cập nhật
      response = await apiStore.post("warehouses", {
        sysIdKho: selectedWarehouse.sysIdKho,
        maKho: selectedWarehouse.maKho,
        tenKho: selectedWarehouse.tenKho,
        dienTich: selectedWarehouse.dienTich,
        moTa: selectedWarehouse.moTa,
        sysIdUser: selectedWarehouse.sysIdUser,
      });
    } else {
      // Nếu không có ID, thực hiện thêm mới
      response = await apiStore.post("warehouses", {
        maKho: selectedWarehouse.maKho,
        tenKho: selectedWarehouse.tenKho,
        dienTich: selectedWarehouse.dienTich,
        moTa: selectedWarehouse.moTa,
        sysIdUser: selectedWarehouse.sysIdUser,
      });
    }

    // Kiểm tra phản hồi từ API
    if (response) {
      await getWarehouses();
      // Làm mới form
      btnResetForm_Click();
      addWarehouseBtn.value.click();
      showToastSuccess(i18n.global.t("Config_settings.warehouses.swal.success"));
    } else {
      // console.error("Failed to save warehouse:", response);
      if (response && response.error) {
        console.error("Error details:", response.error); // Ghi nhận chi tiết lỗi nếu có
      }
    }
  } catch (error) {
    console.error("Error while saving warehouse:", error);
  }
};

// Điền dữ liệu vào form khi click vào dòng <tr></tr>
const handleRowClick = (event) => {
  // Lấy phần tử tr gần nhất từ sự kiện click hiện tại.
  const row = event.target.closest("tr");

  // Lấy giá trị của thuộc tính 'data-id' từ <tr> đã được click.
  const id = row.getAttribute("data-id");

  // Tìm kho hàng có ID tương ứng trong danh sách 'warehouses'.
  const selectedWarehouseValue = warehouses.value.find((warehouse) => warehouse.sysIdKho == id);

  // Nếu tìm thấy kho hàng có ID tương ứng.
  if (selectedWarehouseValue) {
    // Sao chép dữ liệu của kho hàng được chọn vào biến 'selectedWarehouse'.
    Object.assign(selectedWarehouse, selectedWarehouseValue);

    // Tự động click vào nút 'Thêm kho hàng' để mở modal chỉnh sửa thông tin kho hàng.
    addWarehouseBtn.value.click();
  }
};

// Xóa kho hàng
const deleteWarehouse = async (maKho) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("Config_settings.warehouses.swal.delete.title"),
    text: i18n.global.t("Config_settings.warehouses.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("Config_settings.warehouses.swal.delete.cancel"),
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("Config_settings.warehouses.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`warehouses/${maKho}`);
      await getWarehouses(); // Cập nhật lại danh sách kho hàng sau khi xóa
      showToastSuccess(i18n.global.t("Config_settings.warehouses.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting warehouse:", error);
      showToastError(i18n.global.t("Config_settings.warehouses.swal.delete.failed"));
    }
  }
};

// Làm mới form nhập
const btnResetForm_Click = () => {
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
tr,
td {
  border-bottom: 1px solid #dfdfdf;
}

td {
  font-size: 14px;
  vertical-align: middle;
}

.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>
