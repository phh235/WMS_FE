<template>
  <div class="card box-shadow">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold mb-4" style="color: var(--nav-link-color) !important;">
        {{ $t('Home.dashboard.chart_title') }}
      </h5>
      <div class="chart-container">
        <div ref="chartRef" class="echarts"></div>
      </div>
      <div class="mt-3 text-center">
        <h5 class="fw-bold" style="font-size: 15px; color: var(--nav-link-color);">
          Thống kê số lượng sản phẩm theo khu vực
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useApiServices } from "@/services/apiService";

const chartRef = ref(null);
const chart = ref(null);
const productData = ref([]);
const uniqueProducts = ref([]); // Unique product names

// Fetch data from API
const fetchProductData = async () => {
  const apiService = useApiServices();
  try {
    const response = await apiService.get("thongke/san-pham/theo-khu-vuc");
    productData.value = response.data;

    // Extract unique products
    uniqueProducts.value = [
      ...new Set(productData.value.map(item => item.tenSanPham)),
    ];
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

// Prepare data for Grouped Bar Chart
const prepareGroupedData = () => {
  const groupedData = {};

  productData.value.forEach(item => {
    if (!groupedData[item.tenKhuVuc]) {
      groupedData[item.tenKhuVuc] = {};
    }
    if (!groupedData[item.tenKhuVuc][item.tenSanPham]) {
      groupedData[item.tenKhuVuc][item.tenSanPham] = 0;
    }
    groupedData[item.tenKhuVuc][item.tenSanPham] += item.tongSoLuongTonKho;
  });

  const categories = Object.keys(groupedData);
  const series = uniqueProducts.value.map(product => ({
    name: product,
    type: "bar",
    stack: "total", // Enable stacking
    data: categories.map(
      khuVuc => groupedData[khuVuc][product] || 0 // Use number 0 instead of string '0'
    ),
    label: {
      show: true,
      position: "inside",
      formatter: params => {
        const value = params.value;
        return value > 0 ? `${product}: ${value}` : "";
      },
    },
  }));

  return { categories, series };
};

// Initialize chart
const initChart = () => {
  if (!chartRef.value) return;

  if (chart.value) {
    chart.value.dispose();
  }

  chart.value = echarts.init(chartRef.value);

  const { categories, series } = prepareGroupedData();

  const option = {
    tooltip: {
      trigger: "item", // Change trigger to 'item' to show tooltip per stack
      formatter: params => {
        if (params.componentType === 'series') {
          return `${params.seriesName}: ${params.value}`;
        }
        return '';
      },
      backgroundColor: 'rgba(0,0,0,0.7)',
      textStyle: {
        color: '#fff',
      },
      // Ensure tooltip displays on hover over each stack
      showContent: true,
    },
    legend: {
      data: uniqueProducts.value,
      orient: 'horizontal',
      top: 'top',
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        interval: 0,
        rotate: 30, // Rotate labels if they overlap
      },
    },
    yAxis: {
      type: "value",
      name: 'Số lượng',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series,
  };

  chart.value.setOption(option, true);
};

// Handle chart resize
const resizeChart = () => {
  if (chart.value) {
    chart.value.resize();
  }
};

onMounted(async () => {
  await fetchProductData();
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (chart.value) {
    chart.value.dispose();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>