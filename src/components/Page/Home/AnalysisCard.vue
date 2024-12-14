<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
    <div v-for="card in cardData" :key="card.title" class="col">
      <div class="card box-shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="card-subtitle">{{ card.title }}</h6>
            <span class="material-symbols-outlined text-muted fs-5" style="color: var(--nav-link-color) !important;">{{
              card.icon
            }}</span>
          </div>
          <h2 class="card-title mb-0 fw-bold fs-2"
            style="color: var(--primary-color) !important; font-family: Bricolage Grotesque;">
            {{ card.value }}
          </h2>
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
    title: "Tổng giá trị kho hàng",
    value: "Đang tải...",
    icon: "inventory_2",
  },
  {
    title: "Số lượng nhập kho",
    value: "Đang tải...",
    icon: "input",
  },
  {
    title: "Số lượng xuất kho",
    value: "Đang tải...",
    icon: "output",
  },
  {
    title: "Số lượng hàng trong tồn kho",
    value: "Đang tải...",
    icon: "inventory",
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
      apiService.get('consignment/thong-ke-tong-gia-tri'),
      apiService.get('purchase-details/thong-ke-nhap'),
      apiService.get('purchase-details-outbound/thong-ke-xuat'),
      apiService.get('inventories/tong-so-luong'),
    ]);

    cardData.value = [
      {
        title: "Tổng giá trị kho hàng",
        value: formatCurrency(priceRes.data || 0),
        icon: "inventory_2",
      },
      {
        title: "Số lượng nhập kho",
        value: formatNumberWithUnit(ibRes.data || 0, "Kg"),
        icon: "input",
      },
      {
        title: "Số lượng xuất kho",
        value: formatNumberWithUnit(obRes.data || 0, "Kg"),
        icon: "output",
      },
      {
        title: "Số lượng hàng trong tồn kho",
        value: formatNumberWithUnit(invRes.data || 0, "Kg"),
        icon: "inventory",
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