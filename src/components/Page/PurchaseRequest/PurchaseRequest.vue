<template>
  <div class="container">
    <div class="block p-4 box-shadow">
      <div class="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4">
        <div class="tab-container justify-content-start mb-2 mb-md-0">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
            :class="['tab-button', { active: activeTab === tab }]">
            {{ tab }}
          </button>
        </div>
        <div class="d-flex flex-column flex-md-row align-items-center">
          <div class="form-group fs has-search d-flex align-items-center me-2 mb-2 mb-md-0">
            <span class="material-symbols-outlined form-control-feedback">search</span>
            <input type="search" class="form-control" :placeholder="$t('Purchase_request.search_input.search_id')"
              v-model="searchQuery" />
          </div>
          <div class="form-group fs has-search d-flex align-items-center me-2 mb-2 mb-md-0">
            <span class="material-symbols-outlined form-control-feedback">search</span>
            <input type="search" class="form-control" :placeholder="$t('Purchase_request.search_input.search_name')"
              v-model="searchQueryByPeople" />
          </div>
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="sortByIdAsc"
            style="width: 39.67px; height: 39.67px;">
            <span class="material-symbols-outlined">swap_vert</span>
          </button>
          <router-link to="yeu-cau-mua-hang/them-moi" class="btn btn-primary d-flex align-items-center">
            <span class="material-symbols-outlined me-2"> add </span>
            {{ $t('Purchase_request.btn_create') }}
          </router-link>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>{{ $t('Purchase_request.table.id') }}</th>
              <th>{{ $t('Purchase_request.table.name') }}</th>
              <th>{{ $t('Purchase_request.table.status') }}</th>
              <th>{{ $t('Purchase_request.table.date') }}</th>
              <th style="width: 200px;">{{ $t('Purchase_request.table.detail.title') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredRequests.length === 0" style="text-align: center; font-style: italic">
              <td colspan="10">Không tìm thấy yêu cầu</td>
            </tr>
            <tr v-for="purchase in filteredRequests" :key="purchase.sysIdYeuCauMuaHang">
              <td>{{ purchase.maPR }}</td>
              <td>{{ purchase.nguoiYeuCau }}</td>
              <td>
                <span :class="['badge', getBadgeClass(purchase.trangThai)]">
                  {{ getStatusLabel(purchase.trangThai) }}
                </span>
              </td>
              <td>{{ purchase.ngayYeuCau }}</td>
              <td style="width: 200px;"><button class="btn btn-secondary d-flex align-items-center"
                  @click="showDetail(purchase)">
                  <span class="material-symbols-outlined me-2">info</span> {{ $t('Purchase_request.table.detail.title')
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal để hiển thị chi tiết đơn hàng -->
    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;"
      aria-labelledby="purchaseDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="purchaseDetailModalLabel">
              {{ $t('Purchase_request.table.detail.order_detail') }}
              <span style="color: var(--main-text-color);">{{ selectedPurchase.maPR }}</span>
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <!-- Hiển thị thông tin chi tiết đơn hàng -->
            <div class="row">
              <div class="col-6 col-md-2">
                <label class="form-label">{{ $t('Purchase_request.table.id') }}</label>
                <p class="fs">{{ selectedPurchase.maPR }}</p>
              </div>
              <div class="col-6 col-md-2">
                <label class="form-label">
                  {{ $t('Purchase_request.table.detail.customer') }}
                </label>
                <p class="fs">{{ selectedPurchase.chiTietDonHang[0]?.tenKhachHang }}</p>
              </div>
              <div class="col-6 col-md-2">
                <label class="form-label">
                  {{ $t('Purchase_request.table.status') }}
                </label>
                <p>
                  <span :class="['badge', getBadgeClass(selectedPurchase.trangThai)]">
                    {{ getStatusLabel(selectedPurchase.trangThai) }}
                  </span>
                </p>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Purchase_request.table.name') }}
                </label>
                <p class="fs">{{ selectedPurchase.nguoiYeuCau }}</p>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">
                  {{ $t('Purchase_request.table.date') }}
                </label>
                <p class="fs">{{ selectedPurchase.ngayYeuCau }}</p>
              </div>
            </div>
            <hr />
            <h5 class="fw-bold"> {{ $t('Purchase_request.table.detail.product_detail.title') }}
            </h5>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th> {{ $t('Purchase_request.table.detail.product_detail.product_name') }}</th>
                    <th> {{ $t('Purchase_request.table.detail.product_detail.quantity') }}</th>
                    <th> {{ $t('Purchase_request.table.detail.product_detail.price') }}</th>
                    <th> {{ $t('Purchase_request.table.detail.product_detail.total') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedPurchase.chiTietDonHang" :key="item.maSanPham">
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
              <p class="fw-bold float-end mt-2"> {{ $t('Purchase_request.table.detail.product_detail.total_price') }}: <span
                  style="color: var(--main-text-color);">{{
                    totalOrderValue.toLocaleString('vi-VN') }} <span class="currency-symbol">&#8363;</span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay khi modal mở -->
    <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const searchQuery = ref("");
const searchQueryByPeople = ref("");
const isModalVisible = ref(false);
const purchases = ref([]);
const apiStore = useApiStore();
// Tab
const activeTab = ref(t('Purchase_request.tabs.all'));
const tabs = computed(() => [t('Purchase_request.tabs.all'), t('Purchase_request.tabs.pending'), t('Purchase_request.tabs.confirmed'), t('Purchase_request.tabs.canceled')]);
// Sort
const sortOption = ref("");

onMounted(() => {
  getPurchaseRequests();
})

watch(tabs, (newTabs) => {
  activeTab.value = newTabs[0]; // Cập nhật activeTab khi tabs thay đổi
});

const selectedPurchase = reactive({
  sysIdYeuCauMuaHang: "",
  maPR: "",
  ngayYeuCau: "",
  nguoiYeuCau: "",
  trangThai: "",
  chiTietDonHang: []
})

const totalOrderValue = computed(() => {
  return selectedPurchase.chiTietDonHang.reduce((total, item) => {
    return total + (parseFloat(item.tongChiPhi) || 0);
  }, 0);
});


const getPurchaseRequests = async () => {
  try {
    const response = await apiStore.get("purchase-requests");
    purchases.value = response.data;
  } catch (error) {
    console.error("Failed to fetch purchase requests:", error);
  }
};

const showDetail = (purchase) => {
  selectedPurchase.maPR = purchase.maPR;
  selectedPurchase.ngayYeuCau = purchase.ngayYeuCau;
  selectedPurchase.nguoiYeuCau = purchase.nguoiYeuCau;
  selectedPurchase.trangThai = purchase.trangThai;
  selectedPurchase.chiTietDonHang = purchase.chiTietDonHang;

  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Hàm chuyển đổi trạng thái từ tiếng Việt sang giá trị tương ứng
const getStatusValue = (status) => {
  switch (status) {
    case t('Purchase_request.tabs.pending'):
      return "DANG_XU_LY";
    case t('Purchase_request.tabs.confirmed'):
      return "XAC_NHAN";
    case t('Purchase_request.tabs.canceled'):
      return "DA_HUY";
    default:
      return status;
  }
};

// Tạo computed để lọc danh sách yêu cầu
const filteredRequests = computed(() => {
  let filtered = purchases.value;

  // Lọc theo trạng thái nếu không phải tab "Tất cả"
  if (activeTab.value !== t('Purchase_request.tabs.all')) {
    filtered = filtered.filter((purchase) => purchase.trangThai === getStatusValue(activeTab.value));
  }

  // Lọc theo ID hoặc người yêu cầu nếu có từ khóa tìm kiếm
  if (searchQuery.value) {
    const searchLower = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (purchase) =>
        purchase.maPR.toLowerCase().includes(searchLower)
    );
  }

  if (searchQueryByPeople.value) {
    const searchLower = searchQueryByPeople.value.toLowerCase();
    filtered = filtered.filter(
      (purchase) =>
        purchase.nguoiYeuCau.toString().includes(searchLower)
    );
  }

  return filtered;
});

// Sort
const sortByIdAsc = () => {
  if (sortOption.value === "id-asc") {
    sortOption.value = "id-desc";
    // Sắp xếp giảm dần theo maPR
    purchases.value.sort((a, b) => b.maPR.localeCompare(a.maPR));
  } else {
    sortOption.value = "id-asc";
    // Sắp xếp tăng dần theo maPR
    purchases.value.sort((a, b) => a.maPR.localeCompare(b.maPR));
  }
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
  const baseUrl = window.location.pathname;
  const query = new URLSearchParams(window.location.search);

  if (sortOption.value) {
    query.set("sort", sortOption.value);
  } else {
    query.delete("sort");
  }

  // Thêm tham số tab vào URL
  if (activeTab.value && activeTab.value !== "T t c") {
    query.set("tab", activeTab.value);
  } else {
    query.delete("tab");
  }

  const queryString = query.toString() ? `?${query.toString()}` : "";
  window.history.replaceState({}, "", `${baseUrl}${queryString}`);
};

const getBadgeClass = (trangThai) => {
  switch (trangThai) {
    case "DANG_XU_LY":
      return "bg-warning";
    case "XAC_NHAN":
      return "bg-success";
    case "DA_HUY":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

const getStatusLabel = (trangThai) => {
  switch (trangThai) {
    case "DANG_XU_LY":
      return t('Purchase_request.tabs.pending');
    case "XAC_NHAN":
      return t('Purchase_request.tabs.confirmed');
    case "DA_HUY":
      return t('Purchase_request.tabs.canceled');
    default:
      return trangThai;
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
}

.block {
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

td {
  vertical-align: middle;
  font-size: 14px;
}

.bg-success {
  font-size: 14px;
  background-color: #effbf2 !important;
  color: var(--primary-color-hover);
  border: 1.4px solid var(--primary-color);
}

.bg-danger {
  font-size: 14px;
  background-color: #faf0f0 !important;
  color: #dc3545;
  border: 1.4px solid #dc3545;
}

.bg-warning {
  font-size: 14px;
  background-color: #faf5ef !important;
  color: #fe961f;
  border: 1.4px solid #fe961f;
}

.badge {
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 500;
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

.form-control {
  width: 220px;
}

.form-label {
  font-weight: bold;
}

.fs {
  font-size: 14px;
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
</style>
