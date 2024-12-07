<template>
  <div class="card box-shadow h-100">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold" style="color: var(--nav-link-color);">{{
        $t('Home.dashboard.recent_transaction.label') }}</h5>
      <p class="card-title" style="color: var(--nav-link-color);">{{ $t('Home.dashboard.recent_transaction.small_1') }}
        <span class="fw-bold" style="color: var(--primary-color);">{{ recentTransactions.length }}</span>
        {{ $t('Home.dashboard.recent_transaction.small_2') }}
      </p>
      <div class="tab-container justify-content-start mb-3 mb-md-0">
        <button v-for="tab in tabs" :key="tab" @click="changeTab(tab)"
          :class="['tab-button', { active: activeTab === tab }]">
          {{ tab }}
        </button>
      </div>
      <div class="overflow-auto" style="max-height: 385px;">
        <ul class="list-group list-group-flush flex-grow-1">
          <li v-for="transaction in recentTransactions" :key="transaction.id"
            class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong style="color: var(--nav-link-color); font-size: 17px">{{ transaction.tenSanPham }}</strong>
              <br />
              <small style="font-size: 14px;">
                {{ $t('Home.dashboard.recent_transaction.title_type') }}:
                <span class="fw-bold"
                  :style="transaction.loaiGiaoDich === 'NHAP' ? 'color: var(--primary-color) !important;' : 'color: #dc3545 !important;'">
                  {{ transaction.loaiGiaoDich === 'NHAP' ? 'Nhập' : 'Xuất' }}
                </span>
              </small>
              <br>
              <small style="color: var(--nav-link-color);">{{ $t('Home.dashboard.recent_transaction.title_quantity') }}:
                <span class="fw-bold"
                  :style="transaction.loaiGiaoDich === 'NHAP' ? 'color: var(--primary-color) !important;' : 'color: #dc3545 !important;'">{{
                    transaction.soLuongGiaoDich
                  }}</span></small>
            </div>
            <span :class="[
              'badge',
              transaction.loaiGiaoDich === 'NHAP' ? 'bg-success' : 'bg-danger',
            ]">
              {{ transaction.loaiGiaoDich === 'NHAP' ? '+ ' : '- ' }}{{
                parseFloat(transaction.tongSoLuong).toLocaleString('vi-VN') }} Kg
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, computed, watch, onMounted } from 'vue';
import { useApiServices } from '@/services/apiService';

const { t } = useI18n();
const activeTab = ref(t('Home.dashboard.tabs.all'));
const apiService = useApiServices();
const inbounds = ref([]);
const outbounds = ref([]);
const recentTransactions = ref([]);

const tabs = computed(() => [
  t('Home.dashboard.tabs.all'),
  t('Home.dashboard.tabs.imported'),
  t('Home.dashboard.tabs.exported'),
]);

onMounted(async () => {
  await getRecentlyInboundTransactions();
});

// dùng Watch để theo dõi và luôn chọn tab đầu tiên mỗi khi đổi ngôn ngữ hoặc load lại trang
watch(() => tabs.value, (newTabs) => {
  activeTab.value = newTabs[0];
});

// Watch for changes in the selected tab
watch(activeTab, async (newTab) => {
  if (newTab === t('Home.dashboard.tabs.all')) {
    await getAllTransactions(); // Lấy tất cả giao dịch
  } else if (newTab === t('Home.dashboard.tabs.imported')) {
    await getRecentlyInboundTransactions(); // Lấy giao dịch nhập
  } else if (newTab === t('Home.dashboard.tabs.exported')) {
    await getRecentlyOutboundTransactions(); // Lấy giao dịch xuất
  }
});

// Change active tab and fetch related transactions
const changeTab = (tab) => {
  activeTab.value = tab;
};

const getAllTransactions = async () => {
  try {
    // Gọi cả hai API đồng thời
    const [inboundResponse, outboundResponse] = await Promise.all([
      apiService.get('thongke/giao-dich-san-pham/nhap'),
      apiService.get('thongke/giao-dich-san-pham/xuat'),
    ]);

    // Lấy dữ liệu từ API và gắn thêm `loaiGiaoDich`
    const inboundData = inboundResponse.data.thongKeGiaoDichSanPhamResp.map((item) => ({
      ...item,
      loaiGiaoDich: 'NHAP', // Đánh dấu giao dịch nhập
    }));
    const outboundData = outboundResponse.data.thongKeGiaoDichSanPhamResp.map((item) => ({
      ...item,
      loaiGiaoDich: 'XUAT', // Đánh dấu giao dịch xuất
    }));

    // Kết hợp cả hai danh sách
    recentTransactions.value = [...inboundData, ...outboundData];
  } catch (error) {
    console.error('Error fetching all transactions:', error);
  }
};

const getRecentlyInboundTransactions = async () => {
  try {
    const response = await apiService.get('thongke/giao-dich-san-pham/nhap');
    inbounds.value = response.data.thongKeGiaoDichSanPhamResp;
    recentTransactions.value = inbounds.value;
  } catch (error) {
    console.log(error);
  }
}

const getRecentlyOutboundTransactions = async () => {
  try {
    const response = await apiService.get('thongke/giao-dich-san-pham/xuat');
    outbounds.value = response.data.thongKeGiaoDichSanPhamResp;
    recentTransactions.value = outbounds.value;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.list-group-item {
  background-color: var(--background-color) !important;
  border-bottom: 1.5px solid var(--border-main-color) !important;
}

.badge {
  padding: 6px 8px;
  border-radius: 12px;
  font-size: 14px;
}

.bg-danger {
  font-size: 0.875rem;
  background-color: var(--bg-danger) !important;
  color: #dc3545;
  border: 1.5px solid #dc3545;
}

.bg-success {
  font-size: 0.875rem;
  background-color: var(--bg-success) !important;
  color: var(--primary-color);
  border: 1.5px solid var(--primary-color);
}
</style>
