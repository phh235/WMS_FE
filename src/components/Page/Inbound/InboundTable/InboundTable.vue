<template>
  <div class="container-fluid box-shadow p-3">
    <div class="d-flex justify-content-end align-items-center flex-column flex-md-row mb-3">
      <!-- <div class="tab-container justify-content-start mb-2 mb-md-0">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['tab-button', { active: activeTab === tab }]">
          {{ tab }}
        </button>
      </div> -->
      <div class="d-flex flex-column flex-md-row align-items-center">
        <div class="d-flex mb-2 mb-md-0">
          <SearchInput v-model="searchQuery" :placeholder="$t('Inbound.search_input.search_id')" />
          <!-- <SearchInput v-model="searchQueryByPeople" :placeholder="$t('Inbound.search_input.search_name')" /> -->
        </div>
        <div class="d-flex">
          <VueDatePicker v-model="date" range auto-apply :dark="isDarkMode" :preset-dates="presetDates" :teleport="true"
            :auto-position="true" :enable-time-picker="false" style="max-width: 234px;" format="dd/MM/yyyy"
            :placeholder="$t('Inbound.search_input.search_date')">
            <template #preset-date-range-button="{ label, value, presetDate }">
              <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
                @keyup.space.prevent="presetDate(value)">
                {{ label }}
              </span>
            </template>
          </VueDatePicker>
          <button class="btn btn-secondary d-flex align-items-center ms-2 me-2" @click="toggleSortById">
            <span class="material-symbols-outlined">swap_vert</span>
          </button>
          <button class="btn btn-primary d-flex align-items-center me-2" @click="exportToExcel"><span
              class="material-symbols-outlined me-2">upgrade</span> {{ $t('Inbound.btn_export') }}</button>
          <!-- <router-link to="/inventory/inbound/new" class="btn btn-primary d-flex align-items-center"
            v-if="authStore.checkPermissions(['ROLE_USER', 'ROLE_ADMIN'])">
            <span class="material-symbols-outlined me-2"> add </span>
            {{ $t('Inbound.btn_create_inbound') }}
          </router-link> -->
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table mb-3">
        <thead>
          <tr>
            <th class="sticky">{{ $t('Inbound.table.reference_code') }}</th>
            <th style="width: 300px;">{{ $t('Inbound.table.po_code') }}</th>
            <th style="width: 300px;">{{ $t('Inbound.table.from') }}</th>
            <!-- <th style="width: 300px;">{{ $t('Inbound.table.to') }}</th> -->
            <th style="width: 300px;">{{ $t('Inbound.table.person_in_charge') }}</th>
            <th style="width: 300px;">{{ $t('Inbound.table.plan_date') }}</th>
            <!-- <th>{{ $t('Inbound.table.condition') }}</th> -->
            <th>{{ $t('Inbound.table.effective_date') }}</th>
            <th style="width: 300px;">{{ $t('Inbound.table.status') }}</th>
            <th style="width: 300px;" class="text-end px-4">{{ $t('Inbound.table.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredInbounds.length === 0" style="text-align: center; font-style: italic">
            <td colspan="10">{{ $t('Inbound.not_found') }}</td>
          </tr>
          <tr v-for="inbound in paginatedInbounds" :key="inbound.sysIdInBound">
            <td style="width: 300px;" class="d-none">{{ inbound.sysIdInBound }}</td>
            <td style="width: 300px;" class="sticky">{{ inbound.maInBound }}</td>
            <td style="width: 300px;">{{ inbound.maPO }}</td>
            <td style="width: 300px;">{{ inbound.chiTietNhapHang[0]?.tenKhachHang }}</td>
            <!-- <td style="width: 300px;">{{ inbound.tenKho }}</td> -->
            <td style="width: 300px;">{{ inbound.fullName }}</td>
            <td style="width: 300px;">{{ formatDate(inbound.ngayNhap) }}</td>
            <td style="width: 300px;">{{ inbound.chiTietNhapHang[0]?.ngayNhapDuKien ? new
              Date(inbound.chiTietNhapHang[0]?.ngayNhapDuKien).toLocaleDateString('en-GB', {
                day: '2-digit', month:
                  '2-digit', year: 'numeric'
              }) : '' }}</td>
            <td style="width: 300px;">
              <span class="d-flex align-items-center" style="width: fit-content;"
                :class="['badge', getBadgeClass(inbound.trangThai)]">
                <span class="material-symbols-outlined me-2">{{ statusIcon[inbound.trangThai] }}</span>
                {{ getStatusLabel(inbound.trangThai) }}
              </span>
            </td>
            <td>
              <div class="d-flex align-items-center justify-content-end">
                <button class="btn btn-secondary d-flex align-items-center me-2" @click="showDetail(inbound)">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <!-- <div class="dropdown" style="display: inline-block;">
                  <button class="btn btn-secondary d-flex align-items-center me-2" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false"
                    :disabled="(authStore.checkPermissions(['ROLE_USER', 'ROLE_ADMIN']) && inbound.trangThai !== 'confirm')">
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                  <ul class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton">
                    <li v-if="authStore.checkPermissions(['ROLE_ADMIN', 'ROLE_MANAGER']) && inbound.trangThai === 'confirm'">
                      <a class="dropdown-item d-flex align-items-center justify-content-between btn-logout"
                        @click="cancelPR(inbound.sysIdInBound)">
                        {{ $t('Inbound.table.li_cancel') }}
                        <span class="material-symbols-outlined">cancel</span>
                      </a>
                    </li>
                  </ul>
                </div> -->
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
              {{ $t('Inbound.table.detail.order_detail') }}
              <span style="color: var(--primary-color);">{{ selectedInbound.maInBound }}</span>
            </h5>
            <span class="d-flex align-items-center ms-5" style="width: fit-content;"
              :class="['badge', getBadgeClass(selectedInbound.trangThai)]">
              <span class="material-symbols-outlined me-2">{{ statusIcon[selectedInbound.trangThai] }}</span>
              {{ getStatusLabel(selectedInbound.trangThai) }}
            </span>
            <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closeModal">close</span>
          </div>
          <div class="modal-body">
            <!-- Hiển thị thông tin chi tiết đơn hàng -->
            <div class="row">
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Inbound.table.detail.customer') }}
                </label>
                <p class="fs">{{ selectedInbound.chiTietNhapHang[0]?.tenKhachHang }}</p>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Inbound.table.person_in_charge') }}
                </label>
                <p class="fs">{{ selectedInbound.fullName }}</p>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Inbound.table.detail.product_detail.date_plan') }}
                </label>
                <p class="fs">{{ new Date(selectedInbound.ngayNhap).toLocaleString('en-GB', {
                  year: 'numeric', month:
                    '2-digit', day: '2-digit'
                }) }}</p>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Inbound.table.detail.product_detail.date_plan_ib') }}
                </label>
                <p class="fs">{{ new Date(selectedInbound.chiTietNhapHang[0]?.ngayNhapDuKien).toLocaleString('en-GB', {
                  year: 'numeric', month:
                    '2-digit', day: '2-digit'
                }) }}</p>
              </div>
              <div class="col-12 col-md-12" v-if="selectedInbound.trangThai === 'reject'">
                <div class="alert alert-danger p-3 box-shadow d-flex align-items-center" role="alert">
                  <span class="material-symbols-outlined fs-2 me-3">
                    warning
                  </span>
                  <div>
                    <label class="form-label mb-0">
                      {{ $t('Inbound.table.reason') }}
                    </label>
                    <p class="mb-0">{{ selectedInbound.ngayNhap }}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h5 class="fw-bold"> {{ $t('Inbound.table.detail.product_detail.title') }}
            </h5>
            <div class="table-responsive">
              <table class="table ">
                <thead>
                  <tr>
                    <th style="width: 150px;"> {{ $t('Inbound.table.detail.product_detail.product_name') }}</th>
                    <th style="width: 150px;"> {{ $t('Inbound.table.detail.product_detail.quantity') }}</th>
                    <th style="width: 150px;"> {{ $t('Inbound.table.detail.product_detail.price') }}</th>
                    <th style="width: 150px;"> {{ $t('Inbound.table.detail.product_detail.total') }}</th>
                    <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedInbound.chiTietNhapHang" :key="item.sysIdSanPham">
                    <td>{{ item.tenSanPham }}</td>
                    <td>{{ item.soLuong }} Kg</td>
                    <td>{{ parseFloat(item.gia).toLocaleString('vi-VN') }}
                      <span class="currency-symbol">&#8363;</span>
                    </td>
                    <td>{{ parseFloat(item.tongChiPhi).toLocaleString('vi-VN') }}
                      <span class="currency-symbol">&#8363;</span>
                    </td>
                    <td class="d-flex justify-content-center"><button class="btn btn-primary d-flex align-items-center"
                        @click="showPhanLo(item.sysIdSanPham, item.sysIdChiTietNhapHang)">
                        <span class="material-symbols-outlined me-2">package_2</span> Phân lô
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5 class=" fw-bold float-end mt-2"> {{ $t('Inbound.table.detail.product_detail.total_price') }}:
              <span style="color: var(--primary-color);">{{
                totalOrderValue.toLocaleString('vi-VN') }} <span class="currency-symbol">&#8363;</span></span>
            </h5>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal để hiển thị phân lô -->
    <div v-if="isPhanLoModalVisible" class="modal fade show" tabindex="-1" style="display: block;"
      aria-labelledby="purchaseDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="purchaseDetailModalLabel">
              Phân lô phiếu nhập
              <span style="color: var(--primary-color);">{{ selectedInbound.maInBound }}</span>
            </h5>
            <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closePhanLoModal">close</span>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6 col-md-6">
                <label class="form-label fs fw-bold">
                  {{ $t('Inbound.table.detail.product_detail.product_name') }}
                </label>
                <p class="fs">{{ selectedZoneDetail.tenSanPham }}</p>
              </div>
              <div class="col-12 col-md-6 mb-md-0 mb-3">
                <label for="dungTich" class="form-label fs fw-bold">
                  Dung tích (m3) <span class="text-danger">*</span>
                </label>
                <div class="d-flex">
                  <div class="form-check form-check-inline me-5">
                    <input class="form-check-input" type="radio" name="dungTich" id="dungTich1" value="0.01"
                      v-model="selectedConsignment.dungTich" />
                    <label class="form-check-label fs" for="dungTich1">0.01</label>
                  </div>
                  <div class="form-check me-5">
                    <input class="form-check-input" type="radio" name="dungTich" id="dungTich2" value="0.02"
                      v-model="selectedConsignment.dungTich" />
                    <label class="form-check-label fs" for="dungTich2">0.02</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="dungTich" id="dungTich3" value="0.05"
                      v-model="selectedConsignment.dungTich" />
                    <label class="form-check-label fs" for="dungTich3">0.05</label>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div class="mb-3">
                <div class="row">
                  <div class="col-12 col-md-6 mb-md-0 mb-3">
                    <label for="ctkv" class="form-label fs fw-bold">
                      Chi tiết khu vực <span class="text-danger">*</span>
                    </label>
                    <input type="text" class="form-control" id="ctkv" aria-describedby="consignmentNameHelp" disabled
                      v-model="selectedZoneDetail.tenChiTietKhuVuc" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="soLuong" class="form-label fs fw-bold">
                      Số lượng mỗi thùng (Kg) <span class="text-danger">*</span>
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
                    <VueDatePicker :dark="isDarkMode" :enable-time-picker="false" :teleport="true" format="dd/MM/yyyy"
                      auto-apply :auto-position="true" placeholder="Chọn ngày sản xuất"
                      v-model="selectedConsignment.ngaySanXuat">
                    </VueDatePicker>
                  </div>
                  <div class="col-md-6 col-12">
                    <label for="ngayHetHan" class="form-label fs fw-bold">
                      {{ $t('ConfigSettings.consignments.consignment_date_exp') }} <span class="text-danger">*</span>
                    </label>
                    <VueDatePicker :dark="isDarkMode" :enable-time-picker="false" :teleport="true" format="dd/MM/yyyy"
                      auto-apply :auto-position="true" placeholder="Chọn hạn sử dụng"
                      v-model="selectedConsignment.hanSuDung">
                    </VueDatePicker>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
              @click="closePhanLoModal">
              <span class="material-symbols-outlined me-2">close</span>
              {{ $t("ConfigSettings.btn_cancel") }}
            </button>
            <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveConsignment">
              <span class="material-symbols-outlined me-2">check</span>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay khi modal mở -->
    <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
    <div v-if="isPhanLoModalVisible" class="modal-backdrop fade show"></div>
  </div>
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

// const date = ref([])

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
const isDarkMode = ref(false);
const isPhanLoModalVisible = ref(false);
const inbounds = ref([]);
const apiService = useApiServices();
// Tab
const activeTab = ref(t('Inbound.tabs.all'));

const tabs = computed(() => {
  const tabsToShow = [
    t('Inbound.tabs.all'),
    t('Inbound.tabs.confirm'),
    t('Inbound.tabs.reject')
  ];
  return tabsToShow;
});
// Sort
const sortOption = ref("");

onMounted(async () => {
  await getInbounds();
  isDarkMode.value = localStorage.getItem("isDarkMode") === "true";

  // Lắng nghe sự kiện `storage` để cập nhật khi localStorage thay đổi
  window.addEventListener("storage", (event) => {
    if (event.key === "isDarkMode") {
      isDarkMode.value = event.newValue === "true";
    }
  });
})

// dùng Watch để theo dõi và luôn chọn tab đầu tiên mỗi khi đổi ngôn ngữ hoặc load lại trang
watch(() => tabs.value, (newTabs) => {
  activeTab.value = newTabs[0];
});

const selectedInbound = reactive({
  sysIdInBound: "",
  maInBound: "",
  maPO: "",
  sysIdUser: "",
  fullName: "",
  trangThai: "",
  ngayNhap: "",
  chiTietNhapHang: []
})

const selectedZoneDetail = reactive({
  maChiTietKhuVuc: '',
  tenChiTietKhuVuc: '',
  sysIdSanPham: '',
  tenSanPham: ''
})

const selectedConsignment = reactive({
  sysIdSanPham: '',
  soLuong: '',
  ngaySanXuat: '',
  hanSuDung: '',
  dungTich: '',
  maChiTietKhuVuc: '',
  sysIdChiTietNhapHang: ''
})

// Tính tổng giá trị (số lượng * giá)
const totalOrderValue = computed(() => {
  return selectedInbound.chiTietNhapHang.reduce((total, item) => {
    return total + (parseFloat(item.tongChiPhi) || 0);
  }, 0);
});

const getInbounds = async () => {
  try {
    const response = await apiService.get("inbounds");
    inbounds.value = response.data;
  } catch (error) {
    console.error("Failed to fetch inbound requests:", error);
  }
};

const showDetail = (inbound) => {
  selectedInbound.sysIdInBound = inbound.sysIdInBound;
  selectedInbound.maInBound = inbound.maInBound;
  selectedInbound.maPO = inbound.maPO;
  selectedInbound.fullName = inbound.fullName;
  selectedInbound.trangThai = inbound.trangThai;
  selectedInbound.ngayNhap = inbound.ngayNhap;
  selectedInbound.chiTietNhapHang = inbound.chiTietNhapHang;
  isModalVisible.value = true;
};

const showPhanLo = async (sysIdSanPham, sysIdChiTietNhapHang) => {
  isModalVisible.value = false;
  isPhanLoModalVisible.value = true;
  localStorage.setItem("sysIdChiTietNhapHangDrafts", sysIdChiTietNhapHang);
  try {
    const response = await apiService.get(`zone-details/warehouse-detail-by-product/${sysIdSanPham}`);
    Object.assign(selectedZoneDetail, response.data);
  } catch (error) {
    console.log(error);
  }
}

const closeModal = () => {
  isModalVisible.value = false;
  isPhanLoModalVisible.value = false;
};

const closePhanLoModal = () => {
  isModalVisible.value = true;
  isPhanLoModalVisible.value = false;
  localStorage.removeItem("sysIdChiTietNhapHangDrafts");
  Object.assign(selectedConsignment, {
    sysIdSanPham: '',
    soLuong: '',
    ngaySanXuat: '',
    hanSuDung: '',
    dungTich: '',
    maChiTietKhuVuc: '',
    sysIdChiTietNhapHang: ''
  });
};

const saveConsignment = async () => {
  const consignmentData = {
    soLuong: selectedConsignment.soLuong,
    ngaySanXuat: format(selectedConsignment.ngaySanXuat),
    hanSuDung: format(selectedConsignment.hanSuDung),
    dungTich: selectedConsignment.dungTich,
    maChiTietKhuVuc: selectedZoneDetail.maChiTietKhuVuc,
    sysIdChiTietNhapHang: localStorage.getItem("sysIdChiTietNhapHangDrafts"),
  };

  try {
    const response = await apiService.post("consignment/create-from-inbound", consignmentData);
    console.log(response.data);
    if (response) {
      showToastSuccess("Tạo lô thành công")
      localStorage.removeItem("sysIdChiTietNhapHangDrafts");
    }
    isModalVisible.value = false;
    isPhanLoModalVisible.value = false;
    Object.assign(selectedConsignment, {
      sysIdSanPham: '',
      soLuong: '',
      ngaySanXuat: '',
      hanSuDung: '',
      dungTich: '',
      maChiTietKhuVuc: '',
      sysIdChiTietNhapHang: ''
    });
  } catch (error) {
    console.log(error);
  }
}

// Hàm chuyển đổi trạng thái từ tiếng Việt sang giá trị tương ứng
const getStatusValue = (status) => {
  const statusMap = {
    [t('Inbound.tabs.confirm')]: "confirm",
    [t('Inbound.tabs.reject')]: "reject",
  };

  return statusMap[status] || status;
};

const statusIcon = {
  confirm: 'check_circle',
  reject: 'error'
}

// Hàm chuyển đổi ký tự có dấu thành không dấu
const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const format = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

const parseDate = (dateString) => {
  const [day, month, year, hour, minute, second] = dateString.split(/\/|\s|:/);
  return new Date(year, month - 1, day, hour, minute, second);
};

const filteredInbounds = computed(() => {
  return inbounds.value
    .filter(inbound =>
      activeTab.value === t('Inbound.tabs.all') || inbound.trangThai === getStatusValue(activeTab.value)
    )
    .filter(inbound =>
      !searchQuery.value || inbound.sysIdInBound.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(inbound =>
      !searchQueryByPeople.value || removeAccents(inbound.fullName.toLowerCase()).includes(removeAccents(searchQueryByPeople.value.toLowerCase()))
    )
    .filter(purchase => {
      if (date.value && date.value.length === 2) {
        const [startDate, endDate] = date.value.map(dateString => {
          const dateObj = parseDate(formatDate(dateString));
          dateObj.setHours(0, 0, 0, 0);
          return dateObj;
        });
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        const purchaseDate = parseDate(formatDate(purchase.ngayNhap));
        purchaseDate.setHours(0, 0, 0, 0);
        return purchaseDate.getTime() >= startDate.getTime() && purchaseDate.getTime() <= endDate.getTime();
      }
      return true;
    })
});

const paginatedInbounds = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredInbounds.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredInbounds.value.length / pageSize.value);
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
  inbounds.value.sort((a, b) => sortOption.value === "id-asc" ? a.sysIdInBound.localeCompare(b.sysIdInBound) : b.sysIdInBound.localeCompare(a.sysIdInBound));
  updateUrl();
};

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
    approving: "bg-warning",
    confirm: "bg-success",
    reject: "bg-danger",
  };

  return statusMap[status] || "bg-secondary";
};

const getStatusLabel = (status) => {
  const statusMap = {
    approving: t("Inbound.tabs.approving"),
    confirm: t("Inbound.tabs.confirm"),
    reject: t("Inbound.tabs.reject"),
  };

  return statusMap[status] || status;
};

// Export file excel
const exportToExcel = () => {
  const tableData = inbounds.value.map((inbound) => {
    return {
      'Mã PR': inbound.sysIdInBound,
      'Người yêu cầu': inbound.fullName,
      'Trạng thái': getStatusValue(inbound.trangThai),
      'Ngày yêu cầu': inbound.maInBound,
      'Chi tiết nhập hàng': inbound.chiTietNhapHang.map((item) => {
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
  link.download = 'danh-sach-yeu-cau-inbound.xlsx';
  link.click();
};
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

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
