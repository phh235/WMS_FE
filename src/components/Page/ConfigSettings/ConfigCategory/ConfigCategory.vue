<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="tab-container justify-content-start mb-3 mb-md-0">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]">
        {{ tab }}
      </button>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <div class="form-group fs has-search me-3">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input type="search" class="form-control" :placeholder="$t('Config_settings.categories.search_input')"
          v-model="searchQuery" />
      </div>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addCategoryBtn"
        data-bs-toggle="modal" data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('Config_settings.categories.title_save') }}
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('Config_settings.no') }}</th>
          <th scope="col">{{ $t('Config_settings.categories.category_name') }}</th>
          <th scope="col">{{ $t('Config_settings.categories.category_desc') }}</th>
          <th scope="col" class="text-center">{{ $t('Config_settings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredCategories.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy danh mục</td>
        </tr>
        <tr v-for="category in filteredCategories" :key="category.sysIdDanhMuc" :data-id="category.sysIdDanhMuc">
          <td scope="row">{{ category.sysIdDanhMuc }}</td>
          <td>{{ category.tenDanhMuc }}</td>
          <td>{{ category.moTa }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="handleRowClick">
              <span class="material-symbols-outlined d-flex align-items-center"> edit </span>
            </button>
            <button class="btn btn-danger" @click="deleteCategory(category.sysIdDanhMuc, $event)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="categoryModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedCategory.sysIdDanhMuc ? $t("Config_settings.categories.title_edit") :
              $t("Config_settings.categories.title_save") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm_Click"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-none">
              <label for="categoryId" class="form-label fs">Mã Danh Mục</label>
              <input type="text" class="form-control" id="categoryId" aria-describedby="categoryIdHelp"
                v-model="selectedCategory.sysIdDanhMuc" />
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="tenDanhMuc" class="form-label fs fw-bold">
                    {{ $t('Config_settings.categories.category_name') }}
                  </label>
                  <input type="text" class="form-control" id="tenDanhMuc" aria-describedby="categoryNameHelp"
                    v-model="selectedCategory.tenDanhMuc" />
                </div>
                <div class="col-6">
                  <label for="maKho" class="form-label fs fw-bold">
                    {{ $t('Config_settings.categories.warehouse_id') }}
                  </label>
                  <select class="form-select" id="maKho" v-model="selectedCategory.maKho">
                    <option value="" disabled>
                      {{ $t('Config_settings.categories.choose_warehouse') }}
                    </option>
                    <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho"
                      :value="warehouse.maKho">
                      {{ warehouse.maKho }} - {{ warehouse.tenKho }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label for="categoryDescription" class="form-label fs fw-bold">
                {{ $t('Config_settings.categories.category_desc') }}
              </label>
              <textarea class="form-control" id="categoryDescription" rows="4"
                aria-describedby="categoryDescriptionHelp" v-model="selectedCategory.moTa"></textarea>
            </div>
            <div class="mb-3"></div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
            {{ $t("Config_settings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveCategory">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedCategory.sysIdDanhMuc ? $t("Config_settings.btn_update") : $t("Config_settings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useWarehouseStore } from "@/store/warehouseStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const apiStore = useApiStore();
const categories = ref([]);
const warehouseStore = useWarehouseStore();
// Tab
const tabs = computed(() => [t('Config_settings.categories.tabs.all'), t('Config_settings.categories.tabs.normal'), t('Config_settings.categories.tabs.cold')]);
const activeTab = ref(t('Config_settings.categories.tabs.all'));
const addCategoryBtn = ref(null);
// Search
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
  warehouseStore.getWarehouses();
  updateTabs();
});

watch(tabs, (newTabs) => {
  activeTab.value = newTabs[0]; // Cập nhật activeTab khi tabs thay đổi
});

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

const getStatusValue = (status) => {
  switch (status) {
    case t('Config_settings.categories.tabs.normal'):
      return "KHO001";
    case t('Config_settings.categories.tabs.cold'):
      return "KHO002";
    default:
      return status;
  }
};

// Cập nhật danh sách tab dựa trên mã kho có trong danh mục
const updateTabs = () => {
  const uniqueWarehouses = [...new Set(categories.value.map(category => category.maKho))];
  console.log(uniqueWarehouses);
  tabs.value = [t('Config_settings.categories.tabs.all'), ...uniqueWarehouses];
};

const filteredCategories = computed(() => {
  let filtered = categories.value;

  // Lọc theo mã kho
  if (activeTab.value !== t('Config_settings.categories.tabs.all')) {
    filtered = filtered.filter(category => category.maKho === getStatusValue(activeTab.value));
  }

  // Lọc theo tìm kiếm
  return filtered.filter(
    (category) =>
      category.sysIdDanhMuc.toString().includes(searchQuery.value.toUpperCase()) ||
      category.tenDanhMuc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.maKho.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Lưu hoặc cập nhật danh mục
const saveCategory = async () => {
  // Kiểm tra nếu tên danh mục trống
  if (!selectedCategory.tenDanhMuc.trim()) {
    showToastError(i18n.global.t("Config_settings.categories.swal.validate.category_name"));
    return;
  }

  // // Kiểm tra nếu mô tả trống
  // if (!selectedCategory.moTa.trim()) {
  //   showToastError("Mô tả danh mục không được để trống!");
  //   return;
  // }

  // Kiểm tra nếu chưa chọn kho
  if (!selectedCategory.maKho) {
    showToastError(i18n.global.t("Config_settings.categories.swal.validate.warehouse_id"));
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
      showToastSuccess(i18n.global.t("Config_settings.categories.swal.success"));
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
const deleteCategory = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("Config_settings.categories.swal.delete.title"),
    text: i18n.global.t("Config_settings.categories.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("Config_settings.categories.swal.delete.cancel"),
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("Config_settings.categories.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`category-products/${id}`);
      await getCategories(); // Cập nhật lại danh sách danh mục sau khi xóa
      showToastSuccess(i18n.global.t("Config_settings.categories.swal.delete.success"));
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
  vertical-align: middle;
}

.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}

.tab-container {
  background-color: #f4f4f5;
  border-radius: 12px;
  padding: 4px;
  max-width: fit-content;
}

.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}

.tab-button.active {
  background-color: white;
  color: #000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);

  &:hover {
    background-color: white;
  }
}
</style>
