<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="justify-content-start mb-3 mb-md-0">
      <select class="form-select me-2" id="warehouse" v-model="selectedWarehouse" aria-label="Warehouse">
        <option value="" selected>{{ $t('ConfigSettings.categories.tabs.all') }}</option>
        <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho" :value="warehouse.maKho">
          {{ warehouse.tenKho }}
        </option>
      </select>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.categories.search_input')" />
      <button type="button" class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal"
        data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.categories.title_save') }}
      </button>
    </div>
  </div>
  <CategoryTable :categories="filteredCategories" @edit="editCategory" @delete="deleteCategory"
    @sort="toggleSortByName" />
  <div class="modal fade" id="categoryModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedCategory.sysIdDanhMuc ? $t("ConfigSettings.categories.title_edit") :
              $t("ConfigSettings.categories.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
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
                <div class="col-12 col-md-6 mb-md-0 mb-3">
                  <label for="tenDanhMuc" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.categories.category_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenDanhMuc" aria-describedby="categoryNameHelp"
                    v-model="selectedCategory.tenDanhMuc"
                    :class="{ 'is-invalid': !selectedCategory.tenDanhMuc && formSubmmited }" />
                  <div class="invalid-feedback" v-if="!selectedCategory.tenDanhMuc && formSubmmited">
                    {{ $t("ConfigSettings.categories.swal.validate.category_name") }}
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="maKho" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.categories.warehouse_name') }} <span class="text-danger">*</span>
                  </label>
                  <select class="form-select" id="maKho" v-model="selectedCategory.maKho">
                    <option value="" disabled>
                      {{ $t('ConfigSettings.categories.choose_warehouse') }}
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
                {{ $t('ConfigSettings.categories.category_desc') }}
              </label>
              <textarea class="form-control" id="categoryDescription" rows="4"
                aria-describedby="categoryDescriptionHelp" v-model="selectedCategory.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
            @click="btnResetForm">
            <span class="material-symbols-outlined me-2">close</span>
            {{ $t("ConfigSettings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveCategory">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedCategory.sysIdDanhMuc ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useWarehouseStore } from "@/store/warehouseStore.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import CategoryTable from "./CategoryTable.vue";

const { t } = useI18n();

const apiService = useApiServices();
const warehouseStore = useWarehouseStore();
const categoryStore = useCategoriesStore();
// Tab
const addCategoryBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");
// Validate
const formSubmmited = ref(false);
const selectedWarehouse = ref("");
const selectedCategory = reactive({
  sysIdDanhMuc: "",
  tenDanhMuc: "",
  moTa: "",
  maKho: "",
});

onMounted(async () => {
  await categoryStore.getCategories();
  await warehouseStore.getWarehouses();
});

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = categoryStore.categories
    .filter(category => category.maKho === selectedWarehouse.value || !selectedWarehouse.value)
    .filter(category => (
      category.sysIdDanhMuc.toString().includes(removeAccents(searchQuery.value.toUpperCase())) ||
      removeAccents(category.tenDanhMuc.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(category.maKho.toLowerCase()).includes(removeAccents(query))
    ));

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenDanhMuc.localeCompare(b.tenDanhMuc)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenDanhMuc.localeCompare(a.tenDanhMuc)); // Z-A
  }

  return filtered;
});

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
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

const saveCategory = async () => {
  formSubmmited.value = true;
  if (!selectedCategory.tenDanhMuc) {
    // showToastError(i18n.global.t("ConfigSettings.categories.swal.validate.category_name"));
    return;
  }

  if (!selectedCategory.maKho) {
    showToastError(i18n.global.t("ConfigSettings.categories.swal.validate.warehouse_id"));
    return;
  }

  try {
    const categoryData = {
      tenDanhMuc: selectedCategory.tenDanhMuc,
      moTa: selectedCategory.moTa,
      maKho: selectedCategory.maKho,
    };

    const response = selectedCategory.sysIdDanhMuc
      ? await apiService.post("categories", {
        ...categoryData,
        sysIdDanhMuc: selectedCategory.sysIdDanhMuc,
      })
      : await apiService.post("categories", categoryData);

    if (response) {
      categoryStore.getCategories();
      btnResetForm();
      addCategoryBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.categories.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving category:", error);
  }
};

const editCategory = (category) => {
  Object.assign(selectedCategory, category);
  addCategoryBtn.value.click();
};

// Xóa danh mục
const deleteCategory = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.categories.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.categories.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.categories.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.categories.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`categories/${id}`);
      categoryStore.getCategories(); // Cập nhật lại danh sách danh mục sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.categories.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting category:", error);
      showToastError("Xóa danh mục thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm = () => {
  Object.assign(selectedCategory, {
    sysIdDanhMuc: "",
    tenDanhMuc: "",
    moTa: "",
    maKho: "",
  });
};
</script>
