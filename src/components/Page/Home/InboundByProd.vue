<template>
  <div class="box-shadow p-3" style="border-radius: 16px; border: 1px solid var(--border-main-color)">
    <div id="chart-container" style="width: 100%; height: 400px;"></div>
    <div class="mt-3 text-center">
      <h5 class="fw-bold" style="font-size: 15px;">Thống kê số lượng sản phẩm nhập vào theo tháng</h5>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { useApiServices } from '@/services/apiService';

const apiService = useApiServices();
const chartInstance = ref(null);

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
  chartInstance.value = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  const fullYearData = generateFullYearData(data);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data.name}: ${params.data.value.toLocaleString()}`
    },
    legend: {
      data: [...new Set(data.map(item => item.tenSanPham))],
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
      data: fullYearData.map(item => `Tháng ${item.month}`),
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
    series: [
      {
        name: 'Số lượng sản phẩm',
        type: 'bar',
        barWidth: '60%',
        data: fullYearData.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.value > 0 ? '#5470C6' : '#E0E0E0'
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: (params) => params.value > 0 ? params.value.toLocaleString() : '',
          fontFamily: 'Google Sans'
        }
      }
    ]
  };

  chartInstance.value.setOption(option);
};

const getIbByProd = async () => {
  try {
    const response = await apiService.get('reports/import-product-by-months');
    const data = response.data;
    initChart(data);
  } catch (error) {
    console.error('Error fetching product import data:', error);

    const sampleData = [
      { "tenSanPham": "Thịt vịt", "tongSoLuong": 1000.0, "thang": "11", "nam": "2024" },
      { "tenSanPham": "Dứa", "tongSoLuong": 115939.0, "thang": "12", "nam": "2024" }
    ];
    initChart(sampleData);
  }
};

const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

onMounted(() => {
  getIbByProd();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    window.removeEventListener('resize', handleResize);
  }
});
</script>

