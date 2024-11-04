<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="tab-container justify-content-start mb-3 mb-md-0 col-12">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]">
        {{ tab }}
      </button>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.categories.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addCategoryBtn"
        data-bs-toggle="modal" data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.categories.title_save') }}
      </button>
    </div>
  </div>
  <CustomerTable :categories="filteredCategories" @edit="editCategory" @delete="deleteCategory" />
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
                <div class="col-6">
                  <label for="tenDanhMuc" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.categories.category_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenDanhMuc" aria-describedby="categoryNameHelp"
                    v-model="selectedCategory.tenDanhMuc" />
                </div>
                <div class="col-6">
                  <label for="maKho" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.categories.warehouse_id') }} <span class="text-danger">*</span>
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
            <div class="mb-3"></div>
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
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import CustomerTable from "./CustomerTable.vue";

const { t } = useI18n();

const apiService = useApiServices();
const warehouseStore = useWarehouseStore();
const categoryStore = useCategoriesStore();
// Tab
const tabs = computed(() => [t('ConfigSettings.categories.tabs.all'), t('ConfigSettings.categories.tabs.normal'), t('ConfigSettings.categories.tabs.cold')]);
const activeTab = ref(t('ConfigSettings.categories.tabs.all'));
const addCategoryBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedCategory = reactive({
  sysIdDanhMuc: "",
  tenDanhMuc: "",
  moTa: "",
  maKho: "",
});

onMounted(async () => {
  await categoryStore.getCategories();
  await warehouseStore.getWarehouses();
  updateTabs();
});

watch(tabs, (newTabs) => {
  activeTab.value = newTabs[0]; // Cập nhật activeTab khi tabs thay đổi
});

const getStatusValue = (status) =>
  ({ [t("ConfigSettings.categories.tabs.normal")]: "KHO001", [t("ConfigSettings.categories.tabs.cold")]: "KHO002" }[status] || status);

// Cập nhật danh sách tab dựa trên mã kho có trong danh mục
const updateTabs = () => {
  const uniqueWarehouses = [...new Set(categoryStore.categories.map(category => category.maKho))];
  tabs.value = [t('ConfigSettings.categories.tabs.all'), ...uniqueWarehouses];
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = categoryStore.categories
    .filter(category => category.maKho === getStatusValue(activeTab.value) || activeTab.value === t('ConfigSettings.categories.tabs.all'))
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
  if (!selectedCategory.tenDanhMuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.categories.swal.validate.category_name"));
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
      ? await apiService.post("category-products", {
        ...categoryData,
        sysIdDanhMuc: selectedCategory.sysIdDanhMuc,
      })
      : await apiService.post("category-products", categoryData);

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
      await apiService.delete(`category-products/${id}`);
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
