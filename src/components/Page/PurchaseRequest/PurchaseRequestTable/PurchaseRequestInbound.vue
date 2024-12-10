<template>
  <div class="d-flex justify-content-between align-items-center flex-column flex-md-row mb-3">
    <div class="tab-container justify-content-start mb-2 mb-md-0">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]">
        {{ tab }}
      </button>
    </div>
    <div class="d-flex flex-column flex-md-row align-items-center">
      <div class="d-flex mb-2 mb-md-0">
        <SearchInput v-model="searchQuery" :placeholder="$t('PurchaseRequest.search_input.search_id')" />
        <SearchInput v-model="searchQueryByPeople" :placeholder="$t('PurchaseRequest.search_input.search_name')" />
      </div>
      <div class="d-flex">
        <button class="btn btn-secondary-2 d-flex align-items-center me-2" @click="exportToExcel"><span
            class="material-symbols-outlined me-2">upgrade</span> {{ $t('PurchaseRequest.btn_export') }}</button>
        <router-link to="/inventory/purchase-request/inbound/new" class="btn btn-primary d-flex align-items-center"
          v-if="authStore.checkPermissions(['User', 'Admin'])">
          <span class="material-symbols-outlined me-2"> add </span>
          {{ $t('PurchaseRequest.btn_create') }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="mb-3 d-flex justify-content-end">
    <VueDatePicker v-model="date" range auto-apply :dark="isDarkMode" :preset-dates="presetDates" :teleport="true"
      :auto-position="true" :enable-time-picker="false" style="max-width: 234px;" format="dd/MM/yyyy"
      placeholder="Tìm theo ngày">
      <template #preset-date-range-button="{ label, value, presetDate }">
        <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
          @keyup.space.prevent="presetDate(value)">
          {{ label }}
        </span>
      </template>
    </VueDatePicker>
  </div>
  <div class="table-responsive">
    <table class="table mb-3">
      <thead>
        <tr>
          <th class="sticky" @click="toggleSortById">{{ $t('PurchaseRequest.table.id') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th @click="toggleSortByName">{{ $t('PurchaseRequest.table.name') }} <span
              class="material-symbols-outlined ms-2 align-middle">swap_vert</span></th>
          <th>{{ $t('PurchaseRequest.table.status') }}</th>
          <th>{{ $t('PurchaseRequest.table.date_request') }}</th>
          <th style="width: 300px;" class="text-end px-4">{{ $t('PurchaseRequest.table.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredRequests.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('PurchaseRequest.not_found') }}</td>
        </tr>
        <tr v-for="purchase in paginatedPurchases" :key="purchase.maPR">
          <td class="sticky">{{ purchase.maPR }}</td>
          <td>{{ purchase.nguoiYeuCau }}</td>
          <td>
            <span class="d-flex align-items-center" style="width: fit-content;"
              :class="['badge', getBadgeClass(purchase.trangThai)]">
              <span class="material-symbols-outlined me-2">{{ statusIcon[purchase.trangThai] }}</span>
              {{ getStatusLabel(purchase.trangThai) }}
            </span>
          </td>
          <td>{{ purchase.ngayYeuCau }}</td>
          <td class="d-none">{{ purchase.lyDo }}</td>
          <td>
            <div class="d-flex align-items-center justify-content-end">
              <button class="btn btn-primary d-flex align-items-center me-2" @click="createPO(purchase.maPR)"
                v-if="authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'confirm' && purchase.isExistPO === false">
                <span class="material-symbols-outlined me-2">add_circle</span> Tạo PO
              </button>
              <button class="btn btn-primary d-flex align-items-center me-2" @click="confirmPR(purchase.maPR)"
                v-if="authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'approving'">
                <span class="material-symbols-outlined me-2">check_circle</span> Xác nhận
              </button>
              <button class="btn btn-export d-flex align-items-center me-2" @click="sendToPO(purchase.maPR)"
                v-if="authStore.checkPermissions(['User', 'Admin']) && purchase.trangThai === 'open'">
                <span class="material-symbols-outlined me-2">send</span> {{ $t('PurchaseRequest.tabs.send') }}
              </button>
              <button class="btn btn-secondary d-flex align-items-center me-2" @click="reOpen(purchase.maPR)"
                v-if="authStore.checkPermissions(['User', 'Admin']) && purchase.trangThai === 'reject'">
                <span class="material-symbols-outlined me-2">sync</span> {{ $t('PurchaseRequest.tabs.re-open') }}
              </button>
              <button class="btn btn-secondary d-flex align-items-center me-2" @click="showDetail(purchase)">
                <span class="material-symbols-outlined">visibility</span>
              </button>
              <div class="dropdown" style="display: inline-block;">
                <button class="btn btn-secondary d-flex align-items-center me-2" type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  :disabled="(authStore.checkPermissions(['User']) && purchase.trangThai !== 'open') || (authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'confirm') || (authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'reject')">
                  <span class="material-symbols-outlined">more_vert</span>
                </button>
                <ul class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton">
                  <!-- <li v-if="authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'open'">
                    <a class="dropdown-item d-flex align-items-center justify-content-between custom-confirm"
                      style="cursor: pointer;" @click="confirmPR(purchase.maPR)">
                      {{ $t('PurchaseRequest.table.li_confirm') }}
                      <span class="material-symbols-outlined">check_circle</span>
                    </a>
                  </li> -->
                  <li v-if="authStore.checkPermissions(['Admin', 'Manager']) && purchase.trangThai === 'approving'">
                    <a class="dropdown-item d-flex align-items-center justify-content-between btn-logout"
                      @click="cancelPR(purchase.maPR)">
                      {{ $t('PurchaseRequest.table.li_cancel') }}
                      <span class="material-symbols-outlined">cancel</span>
                    </a>
                  </li>
                  <li v-if="authStore.checkPermissions(['User', 'Admin']) && purchase.trangThai === 'open'">
                    <router-link :to="{ name: 'purchase-request/inbound/edit/:id', params: { id: purchase.maPR } }"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      {{ $t('PurchaseRequest.table.li_edit') }}
                      <span class="material-symbols-outlined">edit_square</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center">
    <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
      @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
  </div>

  <!-- Modal để hiển thị chi tiết đơn hàng -->
  <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;"
    aria-labelledby="purchaseDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="purchaseDetailModalLabel">
            {{ $t('PurchaseRequest.table.detail.order_detail') }}
            <span style="color: var(--primary-color);">{{ selectedPurchase.maPR }}</span>
          </h5>
          <span class="d-flex align-items-center ms-5" style="width: fit-content;"
            :class="['badge', getBadgeClass(selectedPurchase.trangThai)]">
            <span class="material-symbols-outlined me-2">{{ statusIcon[selectedPurchase.trangThai] }}</span>
            {{ getStatusLabel(selectedPurchase.trangThai) }}
          </span>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="closeModal">close</span>
        </div>
        <div class="modal-body">
          <!-- Hiển thị thông tin chi tiết đơn hàng -->
          <div class="row">
            <!-- <div class="col-6 col-md-4">
              <label class="form-label">{{ $t('PurchaseRequest.table.id') }}</label>
              <p class="fs">{{ selectedPurchase.maPR }}</p>
            </div> -->
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.detail.customer') }}
              </label>
              <p class="fs">{{ selectedPurchase.chiTietNhapHang[0]?.tenKhachHang }}</p>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.detail.supplier') }}
              </label>
              <p class="fs">{{ selectedPurchase.chiTietNhapHang[0]?.tenNhaCungCap }}</p>
            </div>
            <!-- <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.status') }}
              </label>
              <p>
                <span class="d-flex align-items-center" style="width: fit-content;"
                  :class="['badge', getBadgeClass(selectedPurchase.trangThai)]">
                  <span class="material-symbols-outlined me-2">{{ statusIcon[selectedPurchase.trangThai] }}</span>
                  {{ getStatusLabel(selectedPurchase.trangThai) }}
                </span>
              </p>
            </div> -->
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.name') }}
              </label>
              <p class="fs">{{ selectedPurchase.nguoiYeuCau }}</p>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.date_request') }}
              </label>
              <p class="fs">{{ selectedPurchase.ngayYeuCau }}</p>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.detail.product_detail.date_plan_ib') }}
              </label>
              <p class="fs">{{ selectedPurchase.chiTietNhapHang[0]?.ngayNhapDuKien }}</p>
            </div>
            <!-- <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseRequest.table.detail.product_detail.date_deposit') }}
              </label>
              <p class="fs">{{ kyGuiDate }} {{ $t('PurchaseRequest.table.detail.product_detail.day') }}</p>
            </div> -->
            <div class="col-12 col-md-12" v-if="selectedPurchase.trangThai === 'reject'">
              <div class="alert alert-danger p-3 box-shadow d-flex align-items-center" role="alert">
                <span class="material-symbols-outlined fs-2 me-3">
                  warning
                </span>
                <div>
                  <label class="form-label mb-0">
                    {{ $t('PurchaseRequest.table.reason') }}
                  </label>
                  <p class="mb-0">{{ selectedPurchase.lyDo }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h5 class="fw-bold"> {{ $t('PurchaseRequest.table.detail.product_detail.title') }}
          </h5>
          <div class="table-responsive">
            <table class="table ">
              <thead>
                <tr>
                  <th> {{ $t('PurchaseRequest.table.detail.product_detail.product_name') }}</th>
                  <th> {{ $t('PurchaseRequest.table.detail.product_detail.quantity') }}</th>
                  <th> {{ $t('PurchaseRequest.table.detail.product_detail.price') }}</th>
                  <th> {{ $t('PurchaseRequest.table.detail.product_detail.total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedPurchase.chiTietNhapHang" :key="item.maSanPham">
                  <td>{{ item.tenSanPham }}</td>
                  <td>{{ item.soLuong }} Kg</td>
                  <td>{{ parseFloat(item.gia).toLocaleString('vi-VN') }}
                    <span class="currency-symbol">&#8363;</span>
                  </td>
                  <td>{{ parseFloat(item.tongChiPhi).toLocaleString('vi-VN') }}
                    <span class="currency-symbol">&#8363;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h5 class="fw-bold float-end mt-2"> {{ $t('PurchaseRequest.table.detail.product_detail.total_price') }}:
            <span style="color: var(--primary-color);">{{
              totalOrderValue.toLocaleString('vi-VN') }} <span class="currency-symbol">&#8363;</span></span>
          </h5>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay khi modal mở -->
  <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useAuthStore } from "@/store/authStore.js";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import { useI18n } from "vue-i18n";
import i18n from "@/lang/i18n";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import VueDatePicker from "@vuepic/vue-datepicker"
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import { showToastLoading } from "@/utils/Toast/toastHandle";
import router from "@/router";

const date = ref([
  new Date(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()),
  new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
]);

const presetDates = ref([
  {
    label: '7 ngày gần đây', value: [
      new Date(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()),
      new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
    ]
  },
  {
    label: '3 ngày gần đây', value: [
      new Date(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toDateString()),
      new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
    ]
  },
  {
    label: 'Ngày hiện tại', value: [
      new Date(new Date().toDateString()),
      new Date(new Date().toDateString() + ' 23:59:59')
    ]
  },
]);
// Check permissions
const authStore = useAuthStore();
// Pagination
const currentPage = ref(1);
const pageSize = ref(10);
const { t } = useI18n();
const searchQuery = ref("");
const searchQueryByPeople = ref("");
const isModalVisible = ref(false);
const purchases = ref([]);
const apiService = useApiServices();
const isDarkMode = ref(false);
// Tab
const activeTab = ref(t('PurchaseRequest.tabs.all'));
const showTabOpen = computed(() => {
  return authStore.checkPermissions(['User', 'Admin']);
});

const tabs = computed(() => {
  const tabsToShow = [
    t('PurchaseRequest.tabs.all'),
    ...(showTabOpen.value ? [t('PurchaseRequest.tabs.open')] : []),
    t('PurchaseRequest.tabs.approving'),
    t('PurchaseRequest.tabs.confirm'),
    t('PurchaseRequest.tabs.reject')
  ];
  return tabsToShow;
});
// Sort
const sortOption = ref("");

onMounted(async () => {
  await getPurchaseRequests();
  isDarkMode.value = localStorage.getItem("isDarkMode") === "true";

  // Lắng nghe sự kiện `storage` để cập nhật khi localStorage thay đổi
  window.addEventListener("storage", (event) => {
    if (event.key === "isDarkMode") {
      isDarkMode.value = event.newValue === "true";
    }
  });
  // await checkIdIsExist();
})

// dùng Watch để theo dõi và luôn chọn tab đầu tiên mỗi khi đổi ngôn ngữ hoặc load lại trang
watch(() => tabs.value, (newTabs) => {
  activeTab.value = newTabs[0];
});

const selectedPurchase = reactive({
  sysIdYeuCauNhapHang: "",
  maPR: "",
  ngayYeuCau: "",
  nguoiYeuCau: "",
  sysIdNguoiYeuCau: "",
  fullName: "",
  trangThai: "",
  chiTietNhapHang: []
})

// Tính tổng giá trị (số lượng * giá)
const totalOrderValue = computed(() => {
  return selectedPurchase.chiTietNhapHang.reduce((total, item) => {
    return total + (parseFloat(item.tongChiPhi) || 0);
  }, 0);
});

const getPurchaseRequests = async () => {
  try {
    const response = await apiService.get("purchase-requests");
    purchases.value = response.data;
  } catch (error) {
    console.error("Failed to fetch purchase requests:", error);
  }
};

// const checkIdIsExist = async (id) => {
//   const response = await apiService.get(`purchase-orders/check-exist-by-ma-pr?maPR=${id}`);
//   isExist.value = response.data;
// };

const cancelPR = async (id) => {
  const result = await Swal.fire({
    title: i18n.global.t('PurchaseRequest.table.swal.delete.title'),
    text: i18n.global.t('PurchaseRequest.table.swal.delete.text'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t('PurchaseRequest.table.swal.delete.confirm'),
    cancelButtonText: i18n.global.t('PurchaseRequest.table.swal.delete.cancel'),
    input: 'textarea',
    inputPlaceholder: i18n.global.t('PurchaseRequest.table.swal.delete.reason'),
    allowEnterKey: false,
    allowOutsideClick: false,
    preConfirm: (lyDo) => {
      if (lyDo.trim() === '') {
        Swal.showValidationMessage(i18n.global.t('PurchaseRequest.table.swal.reason'));
        return false;
      }
    }
  });
  if (result.isConfirmed) {
    const lyDo = result.value;
    updatePRStatus(id, 'reject', lyDo);
  }
};

const confirmPR = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: i18n.global.t('PurchaseRequest.table.swal.confirm.title'),
    text: i18n.global.t('PurchaseRequest.table.swal.confirm.text'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.confirm'),
    cancelButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.cancel')
  });

  if (isConfirmed) {
    await updatePRStatus(id, 'confirm');
  }
};

const sendToPO = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: i18n.global.t('PurchaseRequest.table.swal.confirm.text_po'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.confirm'),
    cancelButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.cancel')
  });

  if (isConfirmed) {
    await updatePRStatus(id, 'approving');
  }
};

const reOpen = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: i18n.global.t('PurchaseRequest.table.swal.confirm.text_re_open'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.confirm'),
    cancelButtonText: i18n.global.t('PurchaseRequest.table.swal.confirm.cancel')
  });

  if (isConfirmed) {
    await updatePRStatus(id, 'open');
  }
};

const updatePRStatus = async (id, status, lyDo) => {
  try {
    const response = await apiService.get(`purchase-requests/${id}`);
    if (response.status) {
      const { sysIdYeuCauNhapHang, maPR, ngayYeuCau, nguoiYeuCau, sysIdNguoiYeuCau, trangThai, chiTietNhapHang } = response.data[0];
      selectedPurchase.sysIdYeuCauNhapHang = sysIdYeuCauNhapHang;
      selectedPurchase.maPR = maPR;
      selectedPurchase.ngayYeuCau = ngayYeuCau;
      selectedPurchase.nguoiYeuCau = nguoiYeuCau;
      selectedPurchase.sysIdNguoiYeuCau = sysIdNguoiYeuCau;
      selectedPurchase.trangThai = trangThai;
      selectedPurchase.chiTietNhapHang = chiTietNhapHang;
    }

    const submitDataUpdate = {
      sysIdYeuCauNhapHang: selectedPurchase.sysIdYeuCauNhapHang,
      maPR: selectedPurchase.maPR,
      nguoiYeuCau: selectedPurchase.sysIdNguoiYeuCau,
      trangThai: status,
      loaiYeuCau: 'NHAP',
      chiTietNhapHang: selectedPurchase.chiTietNhapHang.map(product => ({
        sysIdChiTietNhapHang: product.sysIdChiTietNhapHang,
        maPR: product.maPR,
        sysIdSanPham: product.sysIdSanPham,
        sysIdKhachHang: product.sysIdKhachHang,
        sysIdNhaCungCap: product.sysIdNhaCungCap,
        soLuong: product.soLuong,
        gia: product.gia,
        tongChiPhi: product.soLuong * product.gia,
        ngayNhapDuKien: product.ngayNhapDuKien
      })),
      ...(lyDo && { lyDo: lyDo }),
    };
    showToastLoading(i18n.global.t('PurchaseRequest.table.swal.loading'), 10000);
    await apiService.post("purchase-requests/save", submitDataUpdate);
    switch (status) {
      case 'approving':
        showToastSuccess(i18n.global.t('PurchaseRequest.table.swal.confirm.approving'));
        break;
      case 'confirm':
        showToastSuccess(i18n.global.t('PurchaseRequest.table.swal.confirm.success'));
        break;
      case 'open':
        showToastSuccess(i18n.global.t('PurchaseRequest.table.swal.confirm.re-open'));
        break;
      case 'reject':
        showToastSuccess(i18n.global.t('PurchaseRequest.table.swal.delete.success'));
        break;
    }
    getPurchaseRequests();
  } catch (error) {
    console.log(error);
  }
};

const createPO = async (id) => {
  try {
    const response = await apiService.post("purchase-orders/create", {
      maPR: id,
      sysIdUser: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
    });
    if (response.status == 201) {
      showToastSuccess("Tạo PO thành công");
      getPurchaseRequests();
      // router.push({ path: "/inventory/purchase-order/inbound" })
    }
  } catch (error) {
    console.log(error);
  }
}

const showDetail = (purchase) => {
  selectedPurchase.maPR = purchase.maPR;
  selectedPurchase.ngayYeuCau = purchase.ngayYeuCau;
  selectedPurchase.nguoiYeuCau = purchase.nguoiYeuCau;
  selectedPurchase.trangThai = purchase.trangThai;
  selectedPurchase.lyDo = purchase.lyDo;
  selectedPurchase.chiTietNhapHang = purchase.chiTietNhapHang;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Hàm chuyển đổi trạng thái từ tiếng Việt sang giá trị tương ứng
const getStatusValue = (status) => {
  const statusMap = {
    [t('PurchaseRequest.tabs.open')]: "open",
    [t('PurchaseRequest.tabs.approving')]: "approving",
    [t('PurchaseRequest.tabs.confirm')]: "confirm",
    [t('PurchaseRequest.tabs.reject')]: "reject",
  };

  return statusMap[status] || status;
};

const statusIcon = {
  open: 'call_made',
  approving: 'timer',
  confirm: 'check_circle',
  reject: 'error'
}

// Hàm chuyển đổi ký tự có dấu thành không dấu
const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const parseDate = (dateString) => {
  const [day, month, year, hour, minute, second] = dateString.split(/\/|\s|:/);
  return new Date(year, month - 1, day, hour, minute, second);
};

const filteredRequests = computed(() => {
  return purchases.value
    .filter(purchase =>
      activeTab.value === t('PurchaseRequest.tabs.all') || purchase.trangThai === getStatusValue(activeTab.value)
    )
    .filter(purchase =>
      !searchQuery.value || purchase.maPR.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(purchase =>
      !searchQueryByPeople.value || removeAccents(purchase.nguoiYeuCau.toLowerCase()).includes(removeAccents(searchQueryByPeople.value.toLowerCase()))
    )
    .filter(purchase => {
      if (date.value && date.value.length === 2) {
        const [startDate, endDate] = date.value.map(dateString => {
          const dateObj = dateString;
          dateObj.setHours(0, 0, 0, 0);
          return dateObj;
        });
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        const purchaseDate = parseDate(purchase.ngayYeuCau);
        purchaseDate.setHours(0, 0, 0, 0);
        return purchaseDate.getTime() >= startDate.getTime() && purchaseDate.getTime() <= endDate.getTime();
      }
      return true;
    })
    .filter(purchase =>
      authStore.checkPermissions(['User', 'Admin']) || purchase.trangThai !== 'open'
    );
});

const paginatedPurchases = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRequests.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRequests.value.length / pageSize.value);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (newItemsPerPage) => {
  pageSize.value = newItemsPerPage;
  currentPage.value = 1;
};

// Sort
const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  purchases.value.sort((a, b) => sortOption.value === "id-asc" ? a.maPR.localeCompare(b.maPR) : b.maPR.localeCompare(a.maPR));
  updateUrl();
};

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc"

  purchases.value.sort((a, b) => {
    const nameA = a.nguoiYeuCau.toUpperCase();
    const nameB = b.nguoiYeuCau.toUpperCase();

    if (sortOption.value === "name-asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  updateUrl();
}

// Dùng watch để cập nhật URL khi activeTab thay đổi
watch(activeTab, () => {
  updateUrl();
});

/**
 * Cập nhật URL hiện tại
 * - Thêm tham số tab vào URL
 * - Xóa tham số tab khỏi URL
 */
const updateUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (sortOption.value) {
    params.set("sort", sortOption.value);
  } else {
    params.delete("sort");
  }

  if (activeTab.value && activeTab.value !== "T t c") {
    params.set("tab", activeTab.value);
  } else {
    params.delete("tab");
  }

  url.search = params.toString();
  window.history.replaceState({}, "", url.toString());
};

const getBadgeClass = (status) => {
  const statusMap = {
    open: "bg-primary",
    approving: "bg-warning",
    confirm: "bg-success",
    reject: "bg-danger",
  };

  return statusMap[status] || "bg-secondary";
};

const getStatusLabel = (status) => {
  const statusMap = {
    open: t("PurchaseRequest.tabs.open"),
    approving: t("PurchaseRequest.tabs.approving"),
    confirm: t("PurchaseRequest.tabs.confirm"),
    reject: t("PurchaseRequest.tabs.reject"),
  };

  return statusMap[status] || status;
};

// Export file excel
const exportToExcel = () => {
  const tableData = purchases.value.map((purchase) => {
    return {
      'Mã PR': purchase.maPR,
      'Người yêu cầu': purchase.nguoiYeuCau,
      'Trạng thái': getStatusValue(purchase.trangThai),
      'Ngày yêu cầu': purchase.ngayYeuCau,
      'Chi tiết nhập hàng': purchase.chiTietNhapHang.map((item) => {
        return `Mã sản phẩm: ${item.sysIdSanPham}, Tên sản phẩm: ${item.tenSanPham}, Số lượng: ${item.soLuong}, Giá: ${item.gia}, Tổng chi phí: ${item.tongChiPhi}`;
      }).join('\n'),
    };
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(tableData);

  // Thiết lập chiều rộng cột
  const columnWidths = [
    { wch: 20 }, // Mã PR
    { wch: 20 }, // Người yêu cầu
    { wch: 10 }, // Trạng thái
    { wch: 20 }, // Ngày yêu cầu
    { wch: 100 }, // Chi tiết nhập hàng
  ];

  worksheet['!cols'] = columnWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách yêu cầu nhập hàng');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  const excelFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(excelFile);
  link.download = 'danh-sach-yeu-cau-nhap-hang.xlsx';
  link.click();
};

const kyGuiDate = computed(() => {
  const ngayYeuCauNgay = parseInt(selectedPurchase.ngayYeuCau.split('T')[0].split('/')[0]);
  const ngayNhapDuKienNgay = parseInt(selectedPurchase.chiTietNhapHang[0]?.ngayNhapDuKien.split('/')[0]);
  const kyGui = ngayNhapDuKienNgay - ngayYeuCauNgay;
  return kyGui;
});
</script>

<style scoped>
td {
  vertical-align: middle;
  font-size: 0.875rem;
}

.bg-primary {
  font-size: 0.875rem;
  background-color: var(--bg-primary) !important;
  color: #4ca7f1;
  border: 1.5px solid #4ca7f1;
}

.bg-success {
  font-size: 0.875rem;
  background-color: var(--bg-success) !important;
  color: var(--primary-color);
  border: 1.5px solid var(--primary-color);
}

.bg-danger {
  font-size: 0.875rem;
  background-color: var(--bg-danger) !important;
  color: #dc3545;
  border: 1.5px solid #dc3545;
}

.bg-warning {
  font-size: 0.875rem;
  background-color: var(--bg-warning) !important;
  color: #fe961f;
  border: 1.5px solid #fe961f;
}

.badge {
  padding: 6px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.form-control {
  width: 220px;
}

.form-label {
  font-weight: bold;
}

.fs {
  font-size: 0.875rem;
}

.currency-symbol {
  font-size: 0.8em;
  vertical-align: super;
  line-height: 0;
}

@media screen and (max-width: 768px) {
  .block {
    padding: 15px 10px !important;
  }
}

.btn-secondary,
.btn-danger {
  padding: 10px !important;
  height: 40px !important;
}

.btn-secondary {
  background-color: var(--background-color) !important;
  border: 1.5px solid var(--border-main-color) !important;

  &:focus,
  &:active {
    background-color: var(--background-color) !important;
    border: 1.5px solid var(--border-main-color) !important;
  }
}

.dropdown-menu {
  min-width: 140px;
  padding: 8px;
  border-radius: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--border-main-color);
}

.dropdown-item {
  font-size: 0.875rem;
  padding: 8px;
  border-radius: 0.625rem;
  transition: all 0.1s;
  color: var(--nav-link-color);

  &:hover {
    background-color: var(--secondary-color);
    color: var(--nav-link-color);
  }

  &:focus,
  &:active {
    background-color: var(--secondary-color);
    color: var(--nav-link-color);
  }
}

.btn-logout {
  color: var(--btn-logout-color);

  &:hover,
  &:active,
  &:focus {
    color: var(--btn-logout-color);
    background-color: var(--btn-logout-bg);
    cursor: pointer;
  }
}

.alert-danger {
  background-color: var(--alert-danger) !important;
  border-color: var(--alert-danger-border) !important;
  color: var(--alert-danger-color) !important;
}
</style>
