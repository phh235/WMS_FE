<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input
        type="search"
        class="form-control"
        placeholder="Tìm kiếm kho hàng"
        v-model="searchQuery"
      />
    </div>
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
  <div class="table-responsive">
    <table class="table table-hover" @dblclick="handleRowClick">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col">Mã kho</th>
          <th scope="col">Tên kho hàng</th>
          <th scope="col">Diện tích</th>
          <th scope="col">Mô tả</th>
          <th scope="col">User</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredWarehouses.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy kho hàng</td>
        </tr>
        <tr
          v-for="warehouse in filteredWarehouses"
          :key="warehouse.sysIdKho"
          :data-id="warehouse.sysIdKho"
        >
          <td scope="row" class="d-none">{{ warehouse.sysIdKho }}</td>
          <td>{{ warehouse.maKho }}</td>
          <td>{{ warehouse.tenKho }}</td>
          <td>{{ warehouse.dienTich }}</td>
          <td>{{ warehouse.moTa }}</td>
          <td>{{ warehouse.sysIdUser }}</td>
          <td class="text-center">
            <button class="btn btn-danger" @click="deleteWarehouse(warehouse.maKho, $event)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
            {{ selectedWarehouse.sysIdKho ? "Chỉnh sửa kho hàng" : "Thêm kho hàng" }}
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
                  <label for="warehouseId" class="form-label fs fw-bold">Mã kho</label>
                  <input
                    type="text"
                    class="form-control"
                    id="warehouseId"
                    aria-describedby="warehouseIdHelp"
                    v-model="selectedWarehouse.maKho"
                  />
                </div>
                <div class="col-6">
                  <label for="tenKho" class="form-label fs fw-bold">Tên kho hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="tenKho"
                    aria-describedby="warehouseNameHelp"
                    v-model="selectedWarehouse.tenKho"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="dienTich" class="form-label fs fw-bold">Diện tích</label>
                  <input
                    type="text"
                    class="form-control"
                    id="dienTich"
                    aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.dienTich"
                  />
                </div>
                <div class="col-6">
                  <label for="sysIdUser" class="form-label fs fw-bold">ID User</label>
                  <input
                    type="text"
                    class="form-control"
                    id="sysIdUser"
                    aria-describedby="warehouseAdressHelp"
                    v-model="selectedWarehouse.sysIdUser"
                  />
                </div>
              </div>
            </div>
            <div>
              <label for="warehouseDescription" class="form-label fs fw-bold">Mô Tả</label>
              <textarea
                class="form-control"
                id="warehouseDescription"
                rows="4"
                aria-describedby="warehouseDescriptionHelp"
                v-model="selectedWarehouse.moTa"
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
          <button
            type="button"
            class="btn btn-primary d-flex align-items-center"
            @click="saveWarehouse"
          >
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouse.sysIdKho ? "Cập nhật" : "Lưu" }}
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
    showToastError("Mã kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu tên kho hàng trống
  if (!selectedWarehouse.tenKho.trim()) {
    showToastError("Tên kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu Diện tích trống
  if (!selectedWarehouse.dienTich) {
    showToastError("Diện tích kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu mô tả trống
  if (!selectedWarehouse.moTa.trim()) {
    showToastError("Mô tả kho hàng không được để trống!");
    return;
  }
  // Kiểm tra nếu userId trống
  if (!selectedWarehouse.sysIdUser) {
    showToastError("User ID không được để trống!");
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
const deleteWarehouse = async (maKho, event) => {
  event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: "Xóa kho hàng?",
    text: "Bạn có chắc chắn muốn xóa kho hàng này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`warehouses/${maKho}`);
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
