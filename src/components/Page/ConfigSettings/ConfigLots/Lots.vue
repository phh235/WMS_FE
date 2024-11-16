<template>
  <div class="mb-4 d-flex justify-content-end align-items-center">
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.consignments.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addConsignmentBtn"
        data-bs-toggle="modal" data-bs-target="#consignmentModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.consignments.title_save') }}
      </button>
    </div>
  </div>
  <ConsignmentTable :consignments="filteredConsignments" @edit="editConsignment" @delete="deleteConsignment" />
  <div class="modal fade" id="consignmentModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedConsignment.maLo ? $t("ConfigSettings.consignments.title_edit") :
              $t("ConfigSettings.consignments.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="maLo" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_id') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="maLo" aria-describedby="consignmentNameHelp"
                    v-model="selectedConsignment.maLo" />
                </div>
                <div class="col-6">
                  <label for="dungTich" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_area') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="dungTich" aria-describedby="consignmentNameHelp"
                    v-model="selectedConsignment.dungTich" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="sysIdSanPham" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_product') }} <span class="text-danger">*</span>
                  </label>
                  <select class="form-select" id="sysIdSanPham" v-model="selectedConsignment.sysIdSanPham">
                    <option value="" disabled>
                      {{ $t('ConfigSettings.consignments.choose_product') }}
                    </option>
                    <option v-for="product in productStore.products" :key="product.sysIdSanPham"
                      :value="product.sysIdSanPham">
                      {{ product.tenSanPham }}
                    </option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="soLuong" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_quantity') }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="soLuong" aria-describedby="consignmentNameHelp"
                    v-model="selectedConsignment.soLuong" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-md-6 col-12 mb-md-0 mb-3">
                  <label for="ngaySanXuat" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_date') }} <span class="text-danger">*</span>
                  </label>
                  <VueDatePicker v-model="selectedConsignment.ngaySanXuat" :enable-time-picker="false" :teleport="true"
                    :format="format" auto-apply :auto-position="true" placeholder="Chọn ngày sản xuất">
                  </VueDatePicker>
                </div>
                <div class="col-md-6 col-12">
                  <label for="ngayHetHan" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_date_exp') }} <span class="text-danger">*</span>
                  </label>
                  <VueDatePicker v-model="selectedConsignment.hanSuDung" :enable-time-picker="false" :teleport="true"
                    :format="format" auto-apply :auto-position="true" placeholder="Chọn hạn sử dụng">
                  </VueDatePicker>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-12">
                  <label for="maChiTietKhuVuc" class="form-label fs fw-bold">
                    {{ $t('ConfigSettings.consignments.consignment_zone_detail') }} <span class="text-danger">*</span>
                  </label>
                  <select class="form-select" id="maChiTietKhuVuc" v-model="selectedConsignment.maChiTietKhuVuc">
                    <option value="" disabled>
                      {{ $t('ConfigSettings.consignments.choose_zone_detail') }}
                    </option>
                    <option v-for="zoneD in zoneDetailStore.zoneDetail" :key="zoneD.maChiTietKhuVuc"
                      :value="zoneD.maChiTietKhuVuc">
                      {{ zoneD.maChiTietKhuVuc }} - {{ zoneD.tenChiTietKhuVuc }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
            @click="btnResetForm">
            <span class="material-symbols-outlined me-2">close</span>
            {{ $t("ConfigSettings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveConsignment">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedConsignment.sysIdLoHang ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useZoneDetailStore } from "@/store/zoneDetailStore";
import { useConsignmentsStore } from "@/store/consignmentStore";
import { useProductStore } from "@/store/productStore";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import ConsignmentTable from "./LotsTable.vue";
import VueDatePicker from "@vuepic/vue-datepicker"

const { t } = useI18n();
const apiService = useApiServices();
const zoneDetailStore = useZoneDetailStore();
const consignmentStore = useConsignmentsStore();
const productStore = useProductStore();
const addConsignmentBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedConsignment = reactive({
  maLo: '',
  sysIdSanPham: '',
  soLuong: '',
  ngaySanXuat: '',
  hanSuDung: '',
  dungTich: '',
  maChiTietKhuVuc: ''
});

onMounted(async () => {
  await consignmentStore.getConsignments();
  await zoneDetailStore.getZoneDetail();
  await productStore.getProducts();
});

const format = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredConsignments = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = consignmentStore.consignments
    .filter(consignment => (
      consignment.sysIdLoHang.toString().includes(removeAccents(searchQuery.value.toUpperCase())) ||
      removeAccents(consignment.maLo.toLowerCase()).includes(removeAccents(query)) ||
      removeAccents(consignment.maChiTietKhuVuc.toLowerCase()).includes(removeAccents(query))
    ));

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.maLo.localeCompare(b.maLo)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.maLo.localeCompare(a.maLo)); // Z-A
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

const saveConsignment = async () => {
  if (!selectedConsignment.maLo.trim()) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_id"));
    return;
  }

  if (!selectedConsignment.dungTich) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_area"));
    return;
  }

  if (!selectedConsignment.sysIdSanPham) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_product"));
    return;
  }

  if (!selectedConsignment.soLuong) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_quantity"));
    return;
  }

  if (!selectedConsignment.ngaySanXuat) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_date"));
    return;
  }

  if (!selectedConsignment.hanSuDung) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_date_exp"));
    return;
  }

  if (!selectedConsignment.maChiTietKhuVuc) {
    showToastError(i18n.global.t("ConfigSettings.consignments.swal.validate.consignment_zone_detail"));
    return;
  }

  try {
    const consignmentData = {
      sysIdSanPham: selectedConsignment.sysIdSanPham,
      soLuong: selectedConsignment.soLuong,
      ngaySanXuat: selectedConsignment.ngaySanXuat,
      hanSuDung: selectedConsignment.hanSuDung,
      dungTich: selectedConsignment.dungTich,
      maChiTietKhuVuc: selectedConsignment.maChiTietKhuVuc,
    };

    const response = selectedConsignment.sysIdLoHang
      ? await apiService.post("consignment", {
        ...consignmentData,
        maLo: selectedConsignment.maLo,
      })
      : await apiService.post("consignment", consignmentData);

    if (response) {
      consignmentStore.getConsignments();
      btnResetForm();
      addConsignmentBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.consignments.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving consignment:", error);
  }
};

const editConsignment = (consignment) => {
  Object.assign(selectedConsignment, consignment);
  addConsignmentBtn.value.click();
};

// Xóa lô hàng
const deleteConsignment = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.consignments.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.consignments.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.consignments.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.consignments.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`consignment/${id}`);
      consignmentStore.getConsignments(); // Cập nhật lại danh sách lô hàng sau khi xóa
      showToastSuccess(i18n.global.t("ConfigSettings.consignments.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting consignment:", error);
      showToastError("Xóa lô hàng thất bại. Vui lòng thử lại");
    }
  }
};

// Làm mới form nhập
const btnResetForm = () => {
  Object.assign(selectedConsignment, {
    maLo: '',
    sysIdSanPham: '',
    soLuong: '',
    ngaySanXuat: '',
    hanSuDung: '',
    dungTich: '',
    maChiTietKhuVuc: ''
  });
};
</script>
