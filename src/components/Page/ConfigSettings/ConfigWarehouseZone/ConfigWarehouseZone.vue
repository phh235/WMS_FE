<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <button
      type="button"
      class="btn btn-primary d-flex align-items-center"
      ref="addWarehouseZoneBtn"
      data-bs-toggle="modal"
      data-bs-target="#warehouseZoneModal"
    >
      <span class="material-symbols-outlined me-2"> add </span>
      Thêm khu vực
    </button>
  </div>
  <table class="table table-hover" @click="handleRowClick">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Tên khu vực</th>
        <th scope="col">Mô Tả</th>
        <th scope="col">ID loại kho</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="zone in zones" :key="zone.sysIdWarehouseZone" :data-id="zone.sysIdWarehouseZone">
        <td scope="row">{{ zone.sysIdWarehouseZone }}</td>
        <td>{{ zone.warehouseZoneName }}</td>
        <td>{{ zone.warehouseZoneDesc }}</td>
        <td>{{ zone.sysIdWarehouseType }}</td>
        <td class="text-center">
          <button
            class="btn btn-danger"
            @click="deleteWarehouseZone(zone.sysIdWarehouseZone, $event)"
          >
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
    id="warehouseZoneModal"
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
            {{ selectedWarehouseZone.sysIdWarehouseZone ? "Chỉnh sửa khu vực" : "Thêm khu vực" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="warehouseZoneId" class="form-label fw-bold">Mã Khu vực</label>
              <input
                type="text"
                class="form-control"
                id="warehouseZoneId"
                aria-describedby="warehouseZoneIdHelp"
                v-model="selectedWarehouseZone.sysIdWarehouseZone"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseZoneName" class="form-label fw-bold">Tên khu vực</label>
              <input
                type="text"
                class="form-control"
                id="warehouseZoneName"
                aria-describedby="warehouseZoneNameHelp"
                v-model="selectedWarehouseZone.warehouseZoneName"
              />
            </div>
            <div class="mb-3">
              <label for="warehouseZoneDescription" class="form-label fw-bold">Mô Tả</label>
              <textarea
                class="form-control"
                id="warehouseZoneDescription"
                aria-describedby="warehouseZoneDescriptionHelp"
                v-model="selectedWarehouseZone.warehouseZoneDesc"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="sysIdWarehouseType" class="form-label fw-bold">ID loại kho</label>
              <input
                type="text"
                class="form-control"
                id="sysIdWarehouseType"
                aria-describedby="sysIdWarehouseTypeHelp"
                v-model="selectedWarehouseZone.sysIdWarehouseType"
              />
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
          <button type="button" class="btn btn-primary" @click="saveWarehouseZone">
            {{ selectedWarehouseZone.sysIdWarehouseZone ? "Cập nhật" : "Lưu" }}
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
const zones = ref([]);
const addWarehouseZoneBtn = ref(null);
const selectedWarehouseZone = reactive({
  sysIdWarehouseZone: "",
  warehouseZoneName: "",
  warehouseZoneDesc: "",
  sysIdWarehouseType: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getWarehouseZone();
});

// Phân trang
// const goToPage = (page) => {
//   currentPage.value = page;
//   getWarehouseZone();
// };

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getWarehouseZone();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    getWarehouseZone();
  }
};

// Lấy khu vực sản phẩm
const getWarehouseZone = async () => {
  try {
    const response = await apiStore.get(
      `warehouse-zones?page=${currentPage.value}&size=${pageSize.value}`
    );
    zones.value = response.list;
    console.log(response);
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch zones:", error);
  }
};

// Lưu hoặc cập nhật khu vực
const saveWarehouseZone = async () => {
  // Kiểm tra nếu tên khu vực trống
  if (!selectedWarehouseZone.warehouseZoneName.trim()) {
    showToastError("Tên khu vực không được để trống!");
    return;
  }

  // Kiểm tra nếu mô tả trống
  if (!selectedWarehouseZone.warehouseZoneDesc.trim()) {
    showToastError("Mô tả khu vực không được để trống!");
    return;
  }

  try {
    let response;
    if (selectedWarehouseZone.sysIdWarehouseZone) {
      // Nếu có ID, thực hiện cập nhật
      response = await apiStore.post("warehouse-zones", {
        sysIdWarehouseZone: selectedWarehouseZone.sysIdWarehouseZone,
        warehouseZoneName: selectedWarehouseZone.warehouseZoneName,
        warehouseZoneDesc: selectedWarehouseZone.warehouseZoneDesc,
        sysIdWarehouseType: selectedWarehouseZone.sysIdWarehouseType,
      });
    } else {
      // Nếu không có ID, thực hiện thêm mới
      response = await apiStore.post("warehouse-zones", {
        sysIdWarehouseZone: selectedWarehouseZone.sysIdWarehouseZone,
        warehouseZoneName: selectedWarehouseZone.warehouseZoneName,
        warehouseZoneDesc: selectedWarehouseZone.warehouseZoneDesc,
        sysIdWarehouseType: selectedWarehouseZone.sysIdWarehouseType,
      });
    }

    // Kiểm tra phản hồi từ API
    if (response) {
      await getWarehouseZone();
      // Làm mới form
      btnResetForm_Click();
      addWarehouseZoneBtn.value.click();
      showToastSuccess("Lưu thành công");
    } else {
      // console.error("Failed to save zone:", response);
      if (response && response.error) {
        console.error("Error details:", response.error); // Ghi nhận chi tiết lỗi nếu có
      }
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

// Điền dữ liệu vào form khi click vào dòng <tr></tr>
const handleRowClick = (event) => {
  // Lấy phần tử tr gần nhất từ sự kiện click hiện tại.
  const row = event.target.closest("tr");

  // Lấy giá trị của thuộc tính 'data-id' từ <tr> đã được click.
  const id = row.getAttribute("data-id");

  // Tìm khu vực có ID tương ứng trong danh sách 'zones'.
  const selectedWarehouseZoneValue = zones.value.find((zone) => zone.sysIdWarehouseZone);

  // Nếu tìm thấy khu vực có ID tương ứng.
  if (selectedWarehouseZoneValue) {
    // Sao chép dữ liệu của khu vực được chọn vào biến 'selectedWarehouseZone..
    Object.assign(selectedWarehouseZone, selectedWarehouseZoneValue);

    // Tự động click vào nút 'Thêm khu vực' để mở modal chỉnh sửa thông tin khu vực.
    addWarehouseZoneBtn.value.click();
  }
};

// Xóa khu vực
const deleteWarehouseZone = async (id, event) => {
  event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: "Xóa khu vực?",
    text: "Bạn có chắc chắn muốn xóa khu vực này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`warehouse-zones/${id}`);
      await getWarehouseZone(); // Cập nhật lại danh sách khu vực sau khi xóa
      showToastSuccess("Khu vực đã được xóa");
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm_Click = () => {
  Object.assign(selectedWarehouseZone, {
    sysIdWarehouseZone: "",
    warehouseZoneName: "",
    warehouseZoneDesc: "",
    sysIdWarehouseType: "",
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
</style>
