<template>
  <div class="mb-4 d-flex justify-content-end align-items-center">
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.customers.search_input')" />
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addCustomerBtn"
        data-bs-toggle="modal" data-bs-target="#customerModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.customers.title_save') }}
      </button>
    </div>
  </div>
  <CustomerTable :customers="filteredCustomers" @edit="editCustomer" @delete="deleteCustomer" @id="toggleSortById"
    @name="toggleSortByName" @company="toggleSortByCompany" @phone="toggleSortByPhone" @address="toggleSortByAddress" />
  <div class="modal fade" id="customerModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedCustomer.sysIdKhachHang ? $t("ConfigSettings.customers.title_edit") :
              $t("ConfigSettings.customers.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 d-none">
              <label for="customerId" class="form-label fs">Mã khách hàng</label>
              <input type="text" class="form-control" id="customerId" aria-describedby="customerIdHelp"
                v-model="selectedCustomer.sysIdKhachHang" />
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="tenKhachHang" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.customers.customer_name') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenKhachHang" aria-describedby="customerNameHelp"
                    v-model="selectedCustomer.tenKhachHang" />
                </div>
                <div class="col-6">
                  <label for="soDienThoai" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.customers.phone') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="soDienThoai" aria-describedby="customerNameHelp"
                    v-model="selectedCustomer.soDienThoai" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-12">
                  <label for="tenCongTy" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.customers.customer_company') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="tenCongTy" aria-describedby="customerNameHelp"
                    v-model="selectedCustomer.tenCongTy" />
                </div>
                <!-- <div class="col-6">
                  <label for="sysIdNhaCungCap" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.customers.supplier_id') }} <span class="text-danger">*</span>
                  </label>
                  <select class="form-select" id="sysIdNhaCungCap" v-model="selectedCustomer.sysIdNhaCungCap">
                    <option value="" disabled>
                      {{ $t('ConfigSettings.customers.choose_supplier') }}
                    </option>
                    <option v-for="supplier in supplierStore.suppliers" :key="supplier.sysIdNhaCungCap"
                      :value="supplier.sysIdNhaCungCap"> {{ supplier.tenNhaCungCap }}
                    </option>
                  </select>
                </div> -->
              </div>
            </div>
            <div>
              <label for="address" class="form-label fs fw-bold">
                {{ $t('ConfigSettings.customers.address') }} <span class="text-danger">*</span>
              </label>
              <textarea class="form-control" id="address" rows="4" aria-describedby="customerAddressHelp"
                v-model="selectedCustomer.diaChi"></textarea>
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
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveCustomer">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedCustomer.sysIdKhachHang ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useCustomerStore } from "@/store/customerStore.js";
import { useSupplierStore } from "@/store/supplierStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import CustomerTable from "./CustomerTable.vue";

const { t } = useI18n();

const apiService = useApiServices();
const customerStore = useCustomerStore();
const supplierStore = useSupplierStore();
const addCustomerBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedCustomer = reactive({
  sysIdKhachHang: "",
  tenKhachHang: "",
  tenCongTy: "",
  soDienThoai: "",
  diaChi: "",
});

onMounted(async () => {
  await customerStore.getCustomers();
  await supplierStore.getSuppliers();
});

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = customerStore.customers
    .filter(customer => (
      customer.sysIdKhachHang.toString().includes(removeAccents(searchQuery.value.toUpperCase())) ||
      removeAccents(customer.tenKhachHang.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(customer.tenCongTy.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(customer.soDienThoai.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(customer.diaChi.toLowerCase()).includes(removeAccents(query))
    ));

  if (sortOption.value === "id-asc") {
    filtered.sort((a, b) => a.sysIdKhachHang - b.sysIdKhachHang); // tăng dần
  } else if (sortOption.value === "id-desc") {
    filtered.sort((a, b) => b.sysIdKhachHang - a.sysIdKhachHang); // giảm dần
  } else if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenKhachHang.localeCompare(b.tenKhachHang)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenKhachHang.localeCompare(a.tenKhachHang)); // Z-A
  } else if (sortOption.value === "company-asc") {
    filtered.sort((a, b) => a.tenCongTy.localeCompare(b.tenCongTy)); // A-Z
  } else if (sortOption.value === "company-desc") {
    filtered.sort((a, b) => b.tenCongTy.localeCompare(a.tenCongTy)); // Z-A
  } else if (sortOption.value === "phone-asc") {
    filtered.sort((a, b) => a.soDienThoai.localeCompare(b.soDienThoai)); // A-Z
  } else if (sortOption.value === "phone-desc") {
    filtered.sort((a, b) => b.soDienThoai.localeCompare(a.soDienThoai)); // Z-A
  } else if (sortOption.value === "address-asc") {
    filtered.sort((a, b) => a.diaChi.localeCompare(b.diaChi)); // A-Z
  } else if (sortOption.value === "address-desc") {
    filtered.sort((a, b) => b.diaChi.localeCompare(a.diaChi)); // Z-A
  }

  return filtered;
});

const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  updateUrl();
};

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

const toggleSortByCompany = () => {
  sortOption.value = sortOption.value === "company-asc" ? "company-desc" : "company-asc";
  updateUrl();
};

const toggleSortByPhone = () => {
  sortOption.value = sortOption.value === "phone-asc" ? "phone-desc" : "phone-asc";
  updateUrl();
};

const toggleSortByAddress = () => {
  sortOption.value = sortOption.value === "address-asc" ? "address-desc" : "address-asc";
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

const saveCustomer = async () => {
  if (!selectedCustomer.tenKhachHang) {
    showToastError(i18n.global.t("ConfigSettings.customers.swal.validate.customer_name"));
    return;
  }

  if (!selectedCustomer.tenCongTy) {
    showToastError(i18n.global.t("ConfigSettings.customers.swal.validate.customer_company"));
    return;
  }

  if (!selectedCustomer.soDienThoai) {
    showToastError(i18n.global.t("ConfigSettings.customers.swal.validate.phone"));
    return;
  }

  if (!selectedCustomer.diaChi) {
    showToastError(i18n.global.t("ConfigSettings.customers.swal.validate.address"));
    return;
  }

  try {
    const customerData = {
      tenKhachHang: selectedCustomer.tenKhachHang,
      tenCongTy: selectedCustomer.tenCongTy,
      soDienThoai: selectedCustomer.soDienThoai,
      diaChi: selectedCustomer.diaChi,
    };

    const response = selectedCustomer.sysIdKhachHang
      ? await apiService.post("customers", {
        ...customerData,
        sysIdKhachHang: selectedCustomer.sysIdKhachHang,
      })
      : await apiService.post("customers", customerData);

    if (response) {
      customerStore.getCustomers();
      btnResetForm();
      addCustomerBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.customers.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving customer:", error);
  }
};

const editCustomer = (customer) => {
  Object.assign(selectedCustomer, customer);
  addCustomerBtn.value.click();
};

// Xóa danh mục
const deleteCustomer = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.customers.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.customers.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.customers.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.customers.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`customers/${id}`);
      customerStore.getCustomers(); // Cập nhật lại danh sách khách hàng sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.customers.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting customer:", error);
      showToastError("Xóa danh mục thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm = () => {
  Object.assign(selectedCustomer, {
    sysIdKhachHang: "",
    tenKhachHang: "",
    tenCongTy: "",
    soDienThoai: "",
    sysIdKhachHang: "",
    diaChi: "",
  });
};
</script>
