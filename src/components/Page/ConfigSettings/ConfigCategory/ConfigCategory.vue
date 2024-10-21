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
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addCategoryBtn"
        data-bs-toggle="modal" data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.categories.title_save') }}
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.categories.category_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.categories.category_desc') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredCategories.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.categories.not_found') }}</td>
        </tr>
        <tr v-for="category in filteredCategories" :key="category.sysIdDanhMuc" :data-id="category.sysIdDanhMuc">
          <td scope="row">{{ category.sysIdDanhMuc }}</td>
          <td class="sticky">{{ category.tenDanhMuc }}</td>
          <td>{{ category.moTa }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="handleRowClick">
              <span class="material-symbols-outlined d-flex align-items-center"> edit_square </span>
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
            {{ selectedCategory.sysIdDanhMuc ? $t("ConfigSettings.categories.title_edit") :
              $t("ConfigSettings.categories.title_save") }}
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
                    {{ $t('ConfigSettings.categories.category_name') }}
                  </label>
                  <input type="text" class="form-control" id="tenDanhMuc" aria-describedby="categoryNameHelp"
                    v-model="selectedCategory.tenDanhMuc" />
                </div>
                <div class="col-6">
                  <label for="maKho" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.categories.warehouse_id') }}
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
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
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
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";

const { t } = useI18n();

const apiStore = useApiServices();
const categories = ref([]);
const warehouseStore = useWarehouseStore();
// Tab
const tabs = computed(() => [t('ConfigSettings.categories.tabs.all'), t('ConfigSettings.categories.tabs.normal'), t('ConfigSettings.categories.tabs.cold')]);
const activeTab = ref(t('ConfigSettings.categories.tabs.all'));
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

const getStatusValue = (status) =>
  ({ [t("ConfigSettings.categories.tabs.normal")]: "KHO001", [t("ConfigSettings.categories.tabs.cold")]: "KHO002" }[status] || status);

// Cập nhật danh sách tab dựa trên mã kho có trong danh mục
const updateTabs = () => {
  const uniqueWarehouses = [...new Set(categories.value.map(category => category.maKho))];
  tabs.value = [t('ConfigSettings.categories.tabs.all'), ...uniqueWarehouses];
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return categories.value
    .filter(category => category.maKho === getStatusValue(activeTab.value) || activeTab.value === t('ConfigSettings.categories.tabs.all'))
    .filter(category => (
      category.sysIdDanhMuc.toString().includes(removeAccents(searchQuery.value.toUpperCase())) ||
      removeAccents(category.tenDanhMuc.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(category.maKho.toLowerCase()).includes(removeAccents(query))
    ));
});


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
      ? await apiStore.post("category-products", {
        ...categoryData,
        sysIdDanhMuc: selectedCategory.sysIdDanhMuc,
      })
      : await apiStore.post("category-products", categoryData);

    if (response) {
      await getCategories();
      btnResetForm_Click();
      addCategoryBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.categories.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving category:", error);
  }
};

// Điền dữ liệu vào form khi click vào dòng <tr></tr>
const handleRowClick = ({ target }) => {
  const row = target.closest("tr");
  const id = row?.getAttribute("data-id");

  const selectedCategoryValue = categories.value.find(
    (category) => category.sysIdDanhMuc === Number(id)
  );

  if (selectedCategoryValue) {
    Object.assign(selectedCategory, selectedCategoryValue);
    addCategoryBtn.value.click();
  }
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
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("ConfigSettings.categories.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`category-products/${id}`);
      await getCategories(); // Cập nhật lại danh sách danh mục sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.categories.swal.delete.success"));
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
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 4px;
  max-width: fit-content;
}

.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: var(--tab-button-text);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}

.tab-button.active {
  background-color: var(--background-color);
  color: var(--nav-link-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
</style>
