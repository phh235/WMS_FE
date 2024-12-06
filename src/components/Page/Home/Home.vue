<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="fw-bold mb-3" style="color: var(--nav-link-color);">
          {{ $t('Home.dashboard.title') }}
        </h3>
        <div class="d-flex justify-content-end align-items-center mb-4">
          <div class="d-flex flex-column flex-md-row">
            <VueDatePicker v-model="date" week-picker placeholder="Tìm theo tuần" class="me-2"
              style="max-width: 200px;" />
            <VueDatePicker v-model="date" range placeholder="Tìm theo ngày" class="me-2" style="max-width: 200px;" />
            <VueDatePicker v-model="month" range month-picker auto-apply placeholder="Tìm theo tháng" class="me-2"
              style="max-width: 200px;" />
            <VueDatePicker v-model="year" year-picker range auto-apply placeholder="Tìm theo năm" class="me-2"
              style="max-width: 200px;" />
            <button class="btn btn-primary box-shadow d-flex align-items-center">
              <span class="material-symbols-outlined me-2"> download
              </span>
              {{ $t('Home.dashboard.btn_download') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
      <div v-for="card in cardData" :key="card.title" class="col">
        <div class="card box-shadow h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="card-subtitle fs">{{ card.title }}</h6>
              <span class="material-symbols-outlined text-muted fs-5"
                style="color: var(--nav-link-color) !important;">{{ card.icon
                }}</span>
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
        <RecentlyTransactions />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import * as echarts from "echarts";
import { useI18n } from 'vue-i18n';
import VueDatePicker from '@vuepic/vue-datepicker';
import RecentlyTransactions from "./RecentlyTransactions.vue";

const date = ref([]);
const month = ref([]);
const year = ref(new Date().getFullYear());

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
      textStyle: {
        color: "var(--nav-link-color)",
      },
    },
    legend: {
      data: ["Nhận hàng", "Gửi hàng", "Thay đổi ròng"],
      textStyle: {
        fontFamily: "Google Sans",
        color: "var(--nav-link-color)",
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
        axisLabel: {
          textStyle: {
            color: "var(--nav-link-color)",
          },
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
        axisLabel: {
          textStyle: {
            color: "var(--nav-link-color)",
          },
        },
      },
      {
        type: "value",
        name: "Thay đổi ròng",
        min: -2000,
        max: 2000,
        interval: 1000,
        axisLabel: {
          textStyle: {
            color: "var(--nav-link-color)",
          },
        },
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
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "var(--nav-link-color)",
          },
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
  width: 100%;
}

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

.list-group-item {
  background-color: var(--background-color) !important;
}
</style>
