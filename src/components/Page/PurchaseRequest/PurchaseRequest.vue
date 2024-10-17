<template>
  <div class="container-fluid">
    <div class="block p-3 box-shadow">
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
          <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortById"
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
              <th class="sticky">{{ $t('Purchase_request.table.id') }}</th>
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
              <td class="sticky">{{ purchase.maPR }}</td>
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
              <p class="fw-bold float-end mt-2"> {{ $t('Purchase_request.table.detail.product_detail.total_price') }}:
                <span style="color: var(--main-text-color);">{{
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

// dùng Watch để theo dõi và luôn chọn tab đầu tiên mỗi khi đổi ngôn ngữ hoặc load lại trang
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
  const statusMap = {
    [t('Purchase_request.tabs.pending')]: "DANG_XU_LY",
    [t('Purchase_request.tabs.confirmed')]: "XAC_NHAN",
    [t('Purchase_request.tabs.canceled')]: "DA_HUY",
  };

  return statusMap[status] || status;
};

const filteredRequests = computed(() => {
  return purchases.value
    .filter(purchase => activeTab.value === t('Purchase_request.tabs.all') || purchase.trangThai === getStatusValue(activeTab.value))
    .filter(purchase => !searchQuery.value || purchase.maPR.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .filter(purchase => !searchQueryByPeople.value || purchase.nguoiYeuCau.toString().includes(searchQueryByPeople.value.toLowerCase()));
});

// Sort
const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  purchases.value.sort((a, b) => sortOption.value === "id-asc" ? a.maPR.localeCompare(b.maPR) : b.maPR.localeCompare(a.maPR));
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
    DANG_XU_LY: "bg-warning",
    XAC_NHAN: "bg-success",
    DA_HUY: "bg-danger",
  };

  return statusMap[status] || "bg-secondary";
};

const getStatusLabel = (status) => {
  const statusMap = {
    DANG_XU_LY: t("Purchase_request.tabs.pending"),
    XAC_NHAN: t("Purchase_request.tabs.confirmed"),
    DA_HUY: t("Purchase_request.tabs.canceled"),
  };

  return statusMap[status] || status;
};
</script>

<style scoped>
.container-fluid {
  max-width: 1350px;
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
