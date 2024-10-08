<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input
        type="search"
        class="form-control"
        placeholder="Tìm kiếm danh mục"
        v-model="searchQuery"
      />
    </div>
    <button
      type="button"
      class="btn btn-primary d-flex align-items-center"
      ref="addCategoryBtn"
      data-bs-toggle="modal"
      data-bs-target="#categoryModal"
    >
      <span class="material-symbols-outlined me-2"> add </span>
      Thêm danh mục
    </button>
  </div>
  <div class="table-responsive">
    <table class="table table-hover" @click="handleRowClick">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên danh mục</th>
          <th scope="col">Mô tả</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredCategories.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy danh mục</td>
        </tr>
        <tr
          v-for="category in filteredCategories"
          :key="category.sysIdDanhMuc"
          :data-id="category.sysIdDanhMuc"
        >
          <td scope="row">{{ category.sysIdDanhMuc }}</td>
          <td>{{ category.tenDanhMuc }}</td>
          <td>{{ category.moTa }}</td>
          <td class="text-center">
            <button class="btn btn-danger" @click="deleteCategory(category.sysIdDanhMuc, $event)">
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
    id="categoryModal"
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
            {{ selectedCategory.sysIdDanhMuc ? "Chỉnh sửa danh mục" : "Thêm danh mục" }}
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
            <div class="mb-3 d-none">
              <label for="categoryId" class="form-label fs">Mã Danh Mục</label>
              <input
                type="text"
                class="form-control"
                id="categoryId"
                aria-describedby="categoryIdHelp"
                v-model="selectedCategory.sysIdDanhMuc"
              />
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="tenDanhMuc" class="form-label fs fw-bold">Tên danh mục</label>
                  <input
                    type="text"
                    class="form-control"
                    id="tenDanhMuc"
                    aria-describedby="categoryNameHelp"
                    v-model="selectedCategory.tenDanhMuc"
                  />
                </div>
                <div class="col-6">
                  <label for="maKho" class="form-label fs fw-bold">Mã kho</label>
                  <select class="form-select" id="maKho" v-model="selectedCategory.maKho">
                    <option value="" disabled>Chọn kho</option>
                    <option
                      v-for="warehouse in warehouseStore.warehouses"
                      :key="warehouse.maKho"
                      :value="warehouse.maKho"
                    >
                      {{ warehouse.maKho }} - {{ warehouse.tenKho }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label for="categoryDescription" class="form-label fs fw-bold">Mô tả</label>
              <textarea
                class="form-control"
                id="categoryDescription"
                rows="4"
                aria-describedby="categoryDescriptionHelp"
                v-model="selectedCategory.moTa"
              ></textarea>
            </div>
            <div class="mb-3"></div>
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
            @click="saveCategory"
          >
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedCategory.sysIdDanhMuc ? "Cập nhật" : "Lưu" }}
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
const categories = ref([]);
const warehouseStore = useWarehouseStore();
const addCategoryBtn = ref(null);
const searchQuery = ref("");
const selectedCategory = reactive({
  sysIdDanhMuc: "",
  tenDanhMuc: "",
  moTa: "",
  maKho: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getCategories();
  fetchWarehouses();
});

const fetchWarehouses = async () => {
  await warehouseStore.getWarehouses();
};

// Phân trang
// const goToPage = (page) => {
//   currentPage.value = page;
//   getCategories();
// };

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getCategories();
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    getCategories();
  }
};

// Lấy danh mục sản phẩm
const getCategories = async () => {
  try {
    const response = await apiStore.get(
      `category-products?page=${currentPage.value}&size=${pageSize.value}`
    );
    categories.value = response.data.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const filteredCategories = computed(() => {
  return categories.value.filter(
    (category) =>
      category.sysIdDanhMuc.toString().includes(searchQuery.value.toUpperCase()) ||
      category.tenDanhMuc.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Lưu hoặc cập nhật danh mục
const saveCategory = async () => {
  // Kiểm tra nếu tên danh mục trống
  if (!selectedCategory.tenDanhMuc.trim()) {
    showToastError("Tên danh mục không được để trống!");
    return;
  }

  // Kiểm tra nếu mô tả trống
  if (!selectedCategory.moTa.trim()) {
    showToastError("Mô tả danh mục không được để trống!");
    return;
  }
  // Kiểm tra nếu chưa chọn kho
  if (!selectedCategory.maKho) {
    showToastError("Vui lòng chọn một kho!");
    return;
  }

  try {
    let response;
    if (selectedCategory.sysIdDanhMuc) {
      // Nếu có ID, thực hiện cập nhật
      response = await apiStore.post("category-products", {
        sysIdDanhMuc: selectedCategory.sysIdDanhMuc,
        tenDanhMuc: selectedCategory.tenDanhMuc,
        moTa: selectedCategory.moTa,
        maKho: selectedCategory.maKho,
      });
    } else {
      // Nếu không có ID, thực hiện thêm mới
      response = await apiStore.post("category-products", {
        tenDanhMuc: selectedCategory.tenDanhMuc,
        moTa: selectedCategory.moTa,
        maKho: selectedCategory.maKho,
      });
    }

    // Kiểm tra phản hồi từ API
    if (response) {
      await getCategories();
      // Làm mới form
      btnResetForm_Click();
      addCategoryBtn.value.click();
      showToastSuccess("Lưu thành công");
    } else {
      // console.error("Failed to save category:", response);
      if (response && response.error) {
        console.error("Error details:", response.error); // Ghi nhận chi tiết lỗi nếu có
      }
    }
  } catch (error) {
    console.error("Error while saving category:", error);
  }
};

// Điền dữ liệu vào form khi click vào dòng <tr></tr>
const handleRowClick = (event) => {
  // Lấy phần tử tr gần nhất từ sự kiện click hiện tại.
  const row = event.target.closest("tr");

  // Lấy giá trị của thuộc tính 'data-id' từ <tr> đã được click.
  const id = row.getAttribute("data-id");

  // Tìm danh mục có ID tương ứng trong danh sách 'categories'.
  const selectedCategoryValue = categories.value.find(
    (category) => category.sysIdDanhMuc === parseInt(id)
  );

  // Nếu tìm thấy danh mục có ID tương ứng.
  if (selectedCategoryValue) {
    // Sao chép dữ liệu của danh mục được chọn vào biến 'selectedCategory'.
    Object.assign(selectedCategory, selectedCategoryValue);

    // Tự động click vào nút 'Thêm danh mục' để mở modal chỉnh sửa thông tin danh mục.
    addCategoryBtn.value.click();
  }
};

// Xóa danh mục
const deleteCategory = async (id, event) => {
  event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên dòng <tr>
  const swalConfirm = await Swal.fire({
    title: "Xóa danh mục?",
    text: "Bạn có chắc chắn muốn xóa danh mục này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`category-products/${id}`);
      await getCategories(); // Cập nhật lại danh sách danh mục sau khi xóa
      showToastSuccess("Danh mục đã được xóa");
    } catch (error) {
      console.error("Error while deleting category:", error);
      showToastError("Xóa danh mục thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm_Click = () => {
  Object.assign(selectedCategory, {
    sysIdDanhMuc: "",
    tenDanhMuc: "",
    moTa: "",
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
</style>
