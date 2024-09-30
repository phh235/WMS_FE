<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <button
      type="button"
      class="btn btn-primary d-flex align-items-center"
      ref="addWarehouseBtn"
      data-bs-toggle="modal"
      data-bs-target="#warehouseModal"
    >
      <span class="material-symbols-outlined me-2"> add </span>
      Thêm kho hàng
    </button>
  </div>
  <table class="table table-hover" @click="handleRowClick">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Tên kho hàng</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Mô Tả</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="warehouse in warehouses"
        :key="warehouse.sysIdWarehouse"
        :data-id="warehouse.sysIdWarehouse"
      >
        <td scope="row">{{ warehouse.sysIdWarehouse }}</td>
        <td>{{ warehouse.warehouseName }}</td>
        <td>{{ warehouse.warehouseAddress }}</td>
        <td>{{ warehouse.warehouseDesc }}</td>
        <td class="text-center">
          <button class="btn btn-danger" @click="deleteWarehouse(warehouse.sysIdWarehouse, $event)">
            <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="pagination d-flex justify-content-center align-items-center mt-3">
    <button class="btn btn-primary me-2" @click="prevPage" :disabled="currentPage === 0">
      Trước
    </button>
    <span class="mx-2">Trang {{ currentPage + 1 }} / {{ totalPages + 1 }}</span>
    <button class="btn btn-primary ms-2" @click="nextPage" :disabled="currentPage === totalPages">
      Sau
    </button>
  </div>
  <div
    class="modal fade"
    id="warehouseModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedWarehouse.sysIdWarehouse ? "Chỉnh sửa kho hàng" : "Thêm kho hàng" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="btnResetForm_Click"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="warehouseId" class="form-label fw-bold">Mã Kho hàng</label>
              <input
                type="text"
                class="form-control"
                id="warehouseId"
                aria-describedby="warehouseIdHelp"
                v-model="selectedWarehouse.sysIdWarehouse"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseName" class="form-label fw-bold">Tên kho hàng</label>
              <input
                type="text"
                class="form-control"
                id="warehouseName"
                aria-describedby="warehouseNameHelp"
                v-model="selectedWarehouse.warehouseName"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseAddress" class="form-label fw-bold">Địa chỉ</label>
              <input
                type="text"
                class="form-control"
                id="warehouseAddress"
                aria-describedby="warehouseAdressHelp"
                v-model="selectedWarehouse.warehouseAddress"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseDescription" class="form-label fw-bold">Mô Tả</label>
              <textarea
                class="form-control"
                id="warehouseDescription"
                aria-describedby="warehouseDescriptionHelp"
                v-model="selectedWarehouse.warehouseDesc"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn btn-logout"
            data-bs-dismiss="modal"
            @click="btnResetForm_Click"
          >
            Hủy
          </button>
          <button type="button" class="btn btn-primary" @click="saveWarehouse">
            {{ selectedWarehouse.sysIdWarehouse ? "Cập nhật" : "Lưu" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApiStore } from "../../../../store/apiStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";

const apiStore = useApiStore();
const warehouses = ref([]);
const addWarehouseBtn = ref(null);
const selectedWarehouse = reactive({
  sysIdWarehouse: "",
  warehouseName: "",
  warehouseAddress: "",
  warehouseDesc: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getWarehouses();
});

// Phân trang
// const goToPage = (page) => {
//   currentPage.value = page;
//   getWarehouses();
// };

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getWarehouses();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    getWarehouses();
  }
};

// Lấy kho hàng sản phẩm
const getWarehouses = async () => {
  try {
    const response = await apiStore.get(
      `warehouses?page=${currentPage.value}&size=${pageSize.value}`
    );
    warehouses.value = response.list;
    console.log(response);
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch warehouses:", error);
  }
};

// Lưu hoặc cập nhật kho hàng
const saveWarehouse = async () => {
  // Kiểm tra nếu ID trống
  if (!selectedWarehouse.sysIdWarehouse.trim()) {
    showToastError("ID kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu tên kho hàng trống
  if (!selectedWarehouse.warehouseName.trim()) {
    showToastError("Tên kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu mô tả trống
  if (!selectedWarehouse.warehouseDesc.trim()) {
    showToastError("Mô tả kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu địa chỉ trống
  if (!selectedWarehouse.warehouseAddress.trim()) {
    showToastError("Địa chỉ kho hàng không được để trống!");
    return;
  }

  try {
    let response;
    if (selectedWarehouse.sysIdWarehouse) {
      // Nếu có ID, thực hiện cập nhật
      response = await apiStore.post("warehouses", {
        sysIdWarehouse: selectedWarehouse.sysIdWarehouse,
        warehouseName: selectedWarehouse.warehouseName,
        warehouseAddress: selectedWarehouse.warehouseAddress,
        warehouseDesc: selectedWarehouse.warehouseDesc,
      });
    } else {
      // Nếu không có ID, thực hiện thêm mới
      response = await apiStore.post("warehouses", {
        sysIdWarehouse: selectedWarehouse.sysIdWarehouse,
        warehouseName: selectedWarehouse.warehouseName,
        warehouseAddress: selectedWarehouse.warehouseAddress,
        warehouseDesc: selectedWarehouse.warehouseDesc,
      });
    }

    // Kiểm tra phản hồi từ API
    if (response) {
      await getWarehouses();
      // Làm mới form
      btnResetForm_Click();
      addWarehouseBtn.value.click();
      showToastSuccess("Lưu thành công");
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
  const selectedWarehouseValue = warehouses.value.find((warehouse) => warehouse.sysIdWarehouse);

  // Nếu tìm thấy kho hàng có ID tương ứng.
  if (selectedWarehouseValue) {
    // Sao chép dữ liệu của kho hàng được chọn vào biến 'selectedWarehouse'.
    Object.assign(selectedWarehouse, selectedWarehouseValue);

    // Tự động click vào nút 'Thêm kho hàng' để mở modal chỉnh sửa thông tin kho hàng.
    addWarehouseBtn.value.click();
  }
};

// Xóa kho hàng
const deleteWarehouse = async (id, event) => {
  event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: "Xóa kho hàng?",
    text: "Bạn có chắc chắn muốn xóa kho hàng này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`warehouses/${id}`);
      await getWarehouses(); // Cập nhật lại danh sách kho hàng sau khi xóa
      showToastSuccess("Kho hàng đã được xóa");
    } catch (error) {
      console.error("Error while deleting warehouse:", error);
      showToastError("Xóa kho hàng thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm_Click = () => {
  Object.assign(selectedWarehouse, {
    sysIdWarehouse: "",
    warehouseName: "",
    warehouseAddress: "",
    warehouseDesc: "",
  });
};
</script>

<style scoped>
.container {
  width: 50%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}
/* th {
  background-color: var(--primary-color);
} */
tr,
td {
  border-bottom: 1px solid #dfdfdf;
}
td {
  font-size: 14px;
  cursor: pointer;
  vertical-align: middle;
}
input,
textarea {
  padding: 0.5rem;
  font-size: 15px;
  border-radius: 8px;
  /* border: 2px solid var(--secondary-color); */
  border: 2px solid #dcdcdc !important;
  transition: all 0.2s;
  &:focus,
  &:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border: 2px solid var(--border-input-color) !important;
  }
}
.btn-danger {
  padding: 6px 6px;
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
