<template>
  <div class="card box-shadow h-100">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold mb-4" style="color: var(--nav-link-color) !important;">
        {{ $t('Home.dashboard.chart_title') }}
      </h5>
      <div class="filters mb-3">
        <!-- Dropdown to filter by warehouse -->
        <label for="warehouse" class="form-label">Chọn kho:</label>
        <select id="warehouse" class="form-select" v-model="selectedWarehouse">
          <option value="all">Tất cả</option>
          <option v-for="warehouse in uniqueWarehouses" :key="warehouse" :value="warehouse">
            {{ warehouse }}
          </option>
        </select>
      </div>
      <div class="chart-container">
        <div ref="chartRef" class="echarts"></div>
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
    stack: null, // Use "total" for stacked chart
    data: categories.map(
      khuVuc => groupedData[khuVuc][product] || 0
    ),
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
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: params => {
        const content = params
          .map(
            param =>
              `${param.marker} ${param.seriesName}: ${param.value}`
          )
          .join("<br/>");
        return `<strong>${params[0].axisValue}</strong><br/>${content}`;
      },
    },
    legend: {
      data: uniqueProducts.value,
    },
    xAxis: {
      type: "category",
      data: categories,
    },
    yAxis: {
      type: "value",
    },
    series,
  };
  chart.value.setOption(option);
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
