<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="fw-bold mb-3" style="color: var(--nav-link-color);">
          {{ $t('Home.dashboard.title') }}
        </h3>
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="tab-container mb-3 mb-md-0">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
              :class="['tab-button', { active: activeTab === tab }]">
              {{ tab }}
            </button>
          </div>
          <button class="btn btn-primary box-shadow d-flex align-items-center"
            style="color: var(--btn-primary-color) !important;">
            <span class="material-symbols-outlined me-2" style="color: var(--btn-primary-color) !important;"> download
            </span>
            {{ $t('Home.dashboard.btn_download') }}
          </button>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
      <div v-for="card in cardData" :key="card.title" class="col">
        <div class="card box-shadow h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="card-subtitle fs">{{ card.title }}</h6>
              <span class="material-symbols-outlined text-muted fs-5">{{ card.icon }}</span>
            </div>
            <h2 class="card-title mb-0 fw-bold fs-2">{{ card.value }}</h2>
            <small class="text-success">{{ card.change }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row equal-height-row">
      <div class="col-12 col-lg-8 mb-4 mb-lg-0">
        <div class="card box-shadow h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold mb-4">{{ $t('Home.dashboard.chart_title') }}</h5>
            <div ref="chartRef" class="flex-grow-1 echarts"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card box-shadow h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ $t('Home.dashboard.recent_transaction.label') }}</h5>
            <p class="card-text">{{ $t('Home.dashboard.recent_transaction.small') }}</p>
            <ul class="list-group list-group-flush flex-grow-1 overflow-auto">
              <li v-for=" transaction in recentTransactions" :key="transaction.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{{ transaction.type }}</strong>
                  <br />
                  <small class="text-muted">{{ transaction.item }}</small>
                </div>
                <span :class="[
                  'badge',
                  'rounded-pill',
                  transaction.type === 'Nhận' ? 'bg-success' : 'bg-primary',
                ]">
                  {{ transaction.quantity }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import * as echarts from "echarts";
import { useI18n } from 'vue-i18n';

const chartRef = ref(null);
const chart = ref(null);
const { t } = useI18n();

const activeTab = ref(t('Home.dashboard.tabs.all'));

const tabs = computed(() => [
  t('Home.dashboard.tabs.all'),
  t('Home.dashboard.tabs.imported'),
  t('Home.dashboard.tabs.exported'),
]);

watch(tabs, (newTabs) => {
  activeTab.value = newTabs[0]; // Cập nhật activeTab khi tabs thay đổi
});

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

const recentTransactions = ref([
  { id: 1, type: "Nhận", item: "Khoai tây", quantity: "+500" },
  { id: 2, type: "Gửi", item: "Cà chua", quantity: "-200" },
  { id: 3, type: "Nhận", item: "Khoai lang", quantity: "+300" },
  { id: 4, type: "Gửi", item: "Hành tím", quantity: "-150" },
  { id: 5, type: "Nhận", item: "Táo", quantity: "+1000" },
]);

const initChart = () => {
  chart.value = echarts.init(chartRef.value);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["Nhận hàng", "Gửi hàng", "Thay đổi ròng"],
      textStyle: {
        fontFamily: "Google Sans",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Số lượng",
        min: 0,
        max: 6000,
        interval: 1000,
      },
      {
        type: "value",
        name: "Thay đổi ròng",
        min: -2000,
        max: 2000,
        interval: 1000,
      },
    ],
    series: [
      {
        name: "Nhận hàng",
        type: "bar",
        data: [2500, 2800, 3200, 3600, 3100, 2900, 3400, 3800, 3500, 3700, 4000, 4200],
        itemStyle: {
          color: "#16a34a",
        },
      },
      {
        name: "Gửi hàng",
        type: "bar",
        data: [2300, 2500, 2900, 3300, 2800, 2700, 3100, 3500, 3200, 3400, 3600, 3800],
        itemStyle: {
          color: "#d0eddb",
        },
      },
      {
        name: "Thay đổi ròng",
        type: "line",
        yAxisIndex: 1,
        data: [200, 300, 300, 300, 300, 200, 300, 300, 300, 300, 400, 400],
      },
    ],
  };
  chart.value.setOption(option);
};

const resizeHandler = () => {
  chart.value && chart.value.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
  chart.value && chart.value.dispose();
});
</script>

<style scoped>
.container-fluid {
  max-width: 1600px;
}

.card {
  border: 1px solid var(--border-main-color);
  border-radius: 16px;
}

.card,
.card-body {
  background-color: var(--background-color);
  border-radius: 16px;
}

.card-subtitle,
.card-title {
  color: var(--text-light-color) !important;
}

.tab-container {
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 4px;
  display: inline-flex;
}

.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: var(--tab-button-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}

.tab-button.active {
  background-color: var(--background-color);
  color: var(--nav-link-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}

/* .tab-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
} */

.text-success {
  color: var(--primary-color) !important;
}

.bg-success {
  background-color: var(--primary-color) !important;
}

.fs {
  font-size: 15px;
}

.equal-height-row {
  display: flex;
  flex-wrap: wrap;
}

.equal-height-row>[class*="col-"] {
  display: flex;
  flex-direction: column;
}

.equal-height-row .card {
  flex: 1;
}

.equal-height-row .card-body {
  display: flex;
  flex-direction: column;
}

.equal-height-row .flex-grow-1 {
  flex: 1 0 auto;
}

@media (max-width: 768px) {
  .tab-container {
    width: 100%;
    justify-content: space-between;
  }

  .tab-button {
    flex-grow: 1;
    text-align: center;
  }

  .echarts {
    height: 300px;
  }
}

@media (max-width: 1200px) {
  .card-title {
    font-size: 24px;
  }
}

.bg-primary {
  background-color: #3498db !important;
}

.list-group {
  background-color: var(--background-color);
}
</style>
