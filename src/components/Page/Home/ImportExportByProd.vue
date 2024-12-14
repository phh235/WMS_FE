<template>
  <div class="box-shadow p-3" style="border-radius: 16px; border: 1px solid var(--border-main-color)">
    <!-- Tabs -->
    <div class="tab-container justify-content-center mb-2 mb-md-0">
      <button v-for="tab in tabs" :key="tab.name" :class="['tab-button', { active: currentTab === tab.name }]"
        @click="selectTab(tab.name)">
        {{ tab.label }}
      </button>
    </div>

    <!-- Chart -->
    <div id="chart-container" style="width: 100%; height: 400px;"></div>

    <!-- Chart Title -->
    <div class="mt-3 text-center">
      <h5 class="fw-bold" style="font-size: 15px; color: var(--nav-link-color);">
        Thống kê số lượng sản phẩm {{ currentTab === 'export' ? 'xuất' : 'nhập' }} theo tháng
      </h5>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { useApiServices } from '@/services/apiService';


const apiService = useApiServices();
const chartInstance = ref(null);
const tabs = [
  { name: 'import', label: 'Nhập' },
  { name: 'export', label: 'Xuất' }
];
const currentTab = ref(tabs[0].name); // Default: Xuất

const generateFullYearData = (inputData) => {
  const monthsData = Array.from({ length: 12 }, (_, index) => ({
    month: `${index + 1}`,
    value: 0,
    name: ''
  }));

  inputData.forEach(item => {
    const monthIndex = parseInt(item.thang) - 1;
    monthsData[monthIndex] = {
      month: item.thang,
      value: item.tongSoLuong,
      name: item.tenSanPham
    };
  });

  return monthsData;
};

const initChart = (data) => {
  const dom = document.getElementById('chart-container');

  // Hủy biểu đồ cũ nếu đã tồn tại
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // Khởi tạo biểu đồ mới
  chartInstance.value = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  const months = Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`);
  const products = [...new Set(data.map(item => item.tenSanPham))];

  const series = products.map(product => ({
    name: product,
    type: 'bar',
    stack: 'total',
    data: Array(12).fill(0).map((_, index) => {
      const item = data.find(d => d.tenSanPham === product && parseInt(d.thang) === index + 1);
      return item ? item.tongSoLuong : 0;
    }),
    label: {
      show: true,
      position: 'inside'
    }
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        let tooltip = `${params[0].axisValue}<br/>`;
        params.forEach(p => {
          tooltip += `${p.seriesName}: ${p.value.toLocaleString()}<br/>`;
        });
        return tooltip;
      }
    },
    legend: {
      data: products,
      textStyle: {
        fontFamily: 'Google Sans'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: months,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        fontFamily: 'Google Sans'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Số lượng',
      axisLabel: {
        formatter: '{value}',
        fontFamily: 'Google Sans'
      }
    },
    series: series
  };

  chartInstance.value.setOption(option);
};

const fetchDataByTab = async () => {
  try {
    const endpoint =
      currentTab.value === 'export'
        ? 'reports/export-product-by-months'
        : 'reports/import-product-by-months';

    const response = await apiService.get(endpoint);
    const data = response.data;
    initChart(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

const selectTab = (tabName) => {
  currentTab.value = tabName;
  fetchDataByTab();
};

onMounted(() => {
  fetchDataByTab();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    window.removeEventListener('resize', handleResize);
  }
});
</script>
