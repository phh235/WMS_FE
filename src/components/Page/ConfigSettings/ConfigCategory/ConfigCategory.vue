<template>
  <div class="container p-4 rounded-2">
    <div class="mb-3 d-flex justify-content-end align-items-center">
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center"
        ref="addCategoryBtn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span class="material-symbols-outlined me-2"> add </span>
        Thêm danh mục
      </button>
    </div>
    <table class="table table-hover" @click="handleRowClick">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên danh mục</th>
          <th scope="col">Mô Tả</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.sysIdCategoryProd"
          :data-id="category.sysIdCategoryProd"
        >
          <td scope="row">{{ category.sysIdCategoryProd }}</td>
          <td>{{ category.categoryName }}</td>
          <td>{{ category.categoryDesc }}</td>
          <td class="text-center">
            <button
              class="btn btn-danger"
              @click="deleteCategory(category.sysIdCategoryProd, $event)"
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
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              {{ selectedCategory.sysIdCategoryProd ? "Chỉnh sửa danh mục" : "Thêm danh mục" }}
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
              <div class="mb-3 d-none">
                <label for="categoryId" class="form-label">Mã Danh Mục</label>
                <input
                  type="text"
                  class="form-control"
                  id="categoryId"
                  aria-describedby="categoryIdHelp"
                  v-model="selectedCategory.sysIdCategoryProd"
                />
              </div>
              <div class="mb-3">
                <label for="categoryName" class="form-label fw-bold">Tên danh mục</label>
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  aria-describedby="categoryNameHelp"
                  v-model="selectedCategory.categoryName"
                />
              </div>
              <div class="mb-3">
                <label for="categoryDescription" class="form-label fw-bold">Mô Tả</label>
                <textarea
                  class="form-control"
                  id="categoryDescription"
                  aria-describedby="categoryDescriptionHelp"
                  v-model="selectedCategory.categoryDesc"
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
            <button type="button" class="btn btn-primary" @click="saveCategory">
              {{ selectedCategory.sysIdCategoryProd ? "Cập nhật" : "Lưu" }}
            </button>
          </div>
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
const categories = ref([]);
const addCategoryBtn = ref(null);
const selectedCategory = reactive({
  sysIdCategoryProd: "",
  categoryName: "",
  categoryDesc: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(5);

onMounted(() => {
  getCategories();
});

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
      `category-product?page=${currentPage.value}&size=${pageSize.value}`
    );
    categories.value = response.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

// Lưu hoặc cập nhật danh mục
const saveCategory = async () => {
  // Kiểm tra nếu tên danh mục trống
  if (!selectedCategory.categoryName.trim()) {
    showToastError("Tên danh mục không được để trống!");
    return;
  }

  // Kiểm tra nếu mô tả trống
  if (!selectedCategory.categoryDesc.trim()) {
    showToastError("Mô tả danh mục không được để trống!");
    return;
  }

  try {
    let response;
    if (selectedCategory.sysIdCategoryProd) {
      // Nếu có ID, thực hiện cập nhật
      response = await apiStore.post("category-product", {
        sysIdCategoryProd: selectedCategory.sysIdCategoryProd,
        categoryName: selectedCategory.categoryName,
        categoryDesc: selectedCategory.categoryDesc,
      });
    } else {
      // Nếu không có ID, thực hiện thêm mới
      response = await apiStore.post("category-product", {
        categoryName: selectedCategory.categoryName,
        categoryDesc: selectedCategory.categoryDesc,
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
    (category) => category.sysIdCategoryProd === parseInt(id)
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
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`category-product/${id}`);
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
    sysIdCategoryProd: "",
    categoryName: "",
    categoryDesc: "",
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
