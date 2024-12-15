<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-8 g-4 mb-4">
    <div v-for="card in cardData" :key="card.title" class="col">
      <div class="card box-shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="card-subtitle">{{ card.title }}</h6>
            <span class="material-symbols-outlined text-muted fs-5" style="color: var(--nav-link-color) !important;">{{
              card.icon
            }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="card-title mb-0 fw-bold me-3"
              style="color: var(--export-color) !important; font-family: Bricolage Grotesque;">
              {{ card.name }}
            </h2>
            <h3 class="card-title mb-0 fw-bold"
              style="color: var(--primary-color) !important; font-family: Bricolage Grotesque;">
              {{ card.value }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useApiServices } from '@/services/apiService';

const apiService = useApiServices();

const cardData = ref([
  {
    title: "Nhập ít nhất",
    name: "Đang tải...",
    value: "Đang tải...",
  },
  {
    title: "Nhập nhiều nhất",
    name: "Đang tải...",
    value: "Đang tải...",
  },
  {
    title: "Xuất ít nhất",
    name: "Đang tải...",
    value: "Đang tải...",
  },
  {
    title: "Xuất nhiều nhất",
    name: "Đang tải...",
    value: "Đang tải...",
  },
]);

const formatNumberWithUnit = (value, unit = "") => {
  return `${new Intl.NumberFormat('vi-VN').format(value)} ${unit}`;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const loadData = async () => {
  try {
    const [priceRes, ibRes, obRes, invRes] = await Promise.all([
      apiService.get('purchase-details/thong-ke-nhap-it-nhat'),
      apiService.get('purchase-details/thong-ke-nhap-nhieu-nhat'),
      apiService.get('purchase-details-outbound/thong-ke-xuat-it-nhat'),
      apiService.get('purchase-details-outbound/thong-ke-xuat-nhieu-nhat'),
    ]);

    // Truy xuất dữ liệu từ `data[0]`:
    cardData.value = [
      {
        title: "Nhập ít nhất",
        name: priceRes.data[0]?.tenSanPham || "Không có",
        value: formatNumberWithUnit(priceRes.data[0]?.soLuong || 0, "Kg"),
      },
      {
        title: "Nhập nhiều nhất",
        name: ibRes.data[0]?.tenSanPham || "Không có",
        value: formatNumberWithUnit(ibRes.data[0]?.soLuong || 0, "Kg"),
      },
      {
        title: "Xuất ít nhất",
        name: obRes.data[0]?.tenSanPham || "Không có",
        value: formatNumberWithUnit(obRes.data[0]?.soLuong || 0, "Kg"),
      },
      {
        title: "Xuất nhiều nhất",
        name: invRes.data[0]?.tenSanPham || "Không có",
        value: formatNumberWithUnit(invRes.data[0]?.soLuong || 0, "Kg"),
      },
    ];
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.card {
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
}

.card,
.card-body {
  background-color: var(--background-color);
  border-radius: 1rem;
}

.card-subtitle,
.card-title,
.card-text {
  background-color: var(--background-color);
  color: var(--nav-link-color);
  font-weight: bold;
}

.equal-height-row .card {
  flex: 1;
}

.equal-height-row .card-body {
  display: flex;
  flex-direction: column;
}
</style>
