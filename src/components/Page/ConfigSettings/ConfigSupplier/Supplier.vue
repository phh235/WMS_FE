<template>
  <div class="mb-4 d-flex justify-content-end align-items-center">
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.suppliers.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addSupplierBtn"
        data-bs-toggle="modal" data-bs-target="#supplierModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.suppliers.title_save') }}
      </button>
    </div>
  </div>
  <SupplierTable :suppliers="filteredSuppliers" @edit="editSupplier" @delete="deleteSupplier" />
  <div class="modal fade" id="supplierModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedSupplier.sysIdNhaCungCap ? $t("ConfigSettings.suppliers.title_edit") :
              $t("ConfigSettings.suppliers.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="supplierId" class="form-label fs fw-bold">{{ $t('ConfigSettings.suppliers.supplier_id')
                      }} <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="supplierId" aria-describedby="supplierIdHelp"
                      v-model="selectedSupplier.sysIdNhaCungCap" />
                  </div>
                </div>
                <div class="col-6">
                  <label for="tenLoaiKhachHang" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.suppliers.supplier_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenLoaiKhachHang" aria-describedby="supplierNameHelp"
                    v-model="selectedSupplier.tenLoaiKhachHang" />
                </div>
              </div>
            </div>
            <div>
              <label for="supplierDescription" class="form-label fs fw-bold">
                {{ $t('ConfigSettings.suppliers.supplier_desc') }}
              </label>
              <textarea class="form-control" id="supplierDescription" rows="4"
                aria-describedby="supplierDescriptionHelp" v-model="selectedSupplier.moTa"></textarea>
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
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveSupplier">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedSupplier.sysIdNhaCungCap ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useSupplierStore } from "@/store/supplierStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import SupplierTable from "./SupplierTable.vue";
import ConfigSettings from "../ConfigSettings.vue";

const { t } = useI18n();

const apiService = useApiServices();
const supplierStore = useSupplierStore();
const addSupplierBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedSupplier = reactive({
  sysIdNhaCungCap: "",
  tenLoaiKhachHang: "",
  moTa: "",
});

onMounted(async () => {
  await supplierStore.getSuppliers();
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredSuppliers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = supplierStore.suppliers
    .filter(supplier => (
      supplier.sysIdNhaCungCap.toString().includes(removeAccents(searchQuery.value.toUpperCase())) ||
      removeAccents(supplier.tenLoaiKhachHang.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(supplier.moTa.toLowerCase()).includes(removeAccents(query))
    ));

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenLoaiKhachHang.localeCompare(b.tenLoaiKhachHang)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenLoaiKhachHang.localeCompare(a.tenLoaiKhachHang)); // Z-A
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

const saveSupplier = async () => {
  if (!selectedSupplier.tenLoaiKhachHang) {
    showToastError(i18n.global.t("ConfigSettings.suppliers.swal.validate.supplier_name"));
    return;
  }

  try {
    const supplierData = {
      tenLoaiKhachHang: selectedSupplier.tenLoaiKhachHang,
      moTa: selectedSupplier.moTa,
    };

    const response = selectedSupplier.sysIdNhaCungCap
      ? await apiService.post("supplier", {
        ...supplierData,
        sysIdNhaCungCap: selectedSupplier.sysIdNhaCungCap,
      })
      : await apiService.post("supplier", supplierData);

    if (response) {
      supplierStore.getSuppliers();
      btnResetForm();
      addSupplierBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.suppliers.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving supplier:", error);
  }
};

const editSupplier = (supplier) => {
  Object.assign(selectedSupplier, supplier);
  addSupplierBtn.value.click();
};

// Xóa danh mục
const deleteSupplier = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.suppliers.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.suppliers.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.suppliers.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.suppliers.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`supplier/${id}`);
      supplierStore.getSuppliers(); // Cập nhật lại danh sách danh mục sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.suppliers.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting supplier:", error);
      showToastError("Xóa danh mục thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm = () => {
  Object.assign(selectedSupplier, {
    sysIdNhaCungCap: "",
    tenLoaiKhachHang: "",
    moTa: "",
  });
};
</script>
