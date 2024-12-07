<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
    <div v-for="card in cardData" :key="card.title" class="col">
      <div class="card box-shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="card-subtitle fs">{{ card.title }}</h6>
            <span class="material-symbols-outlined text-muted fs-5" style="color: var(--nav-link-color) !important;">{{
              card.icon
            }}</span>
          </div>
          <h2 class="card-title mb-0 fw-bold fs-2">{{ card.value }}</h2>
          <small style="color: var(--primary-color) !important;">{{ card.change }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const cardData = ref([
  {
    title: "Tổng giá trị kho hàng",
    value: "230.520.004 ₫",
    change: "+5,2% so với tháng trước",
    icon: "inventory_2",
  },
  {
    title: "Số lượng nhập kho",
    value: "5.142",
    change: "+12,3% so với tháng trước",
    icon: "input",
  },
  {
    title: "Số lượng xuất kho",
    value: "4.224",
    change: "+8,7% so với tháng trước",
    icon: "output",
  },
  {
    title: "Số lượng hàng hiện tại",
    value: "235",
    change: "+3,5% so với tuần trước",
    icon: "inventory",
  },
]);
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
}

.equal-height-row .card {
  flex: 1;
}

.equal-height-row .card-body {
  display: flex;
  flex-direction: column;
}
</style>