<template>
  <!--   <div id="pie-chart" style="width: 100%; height: 100%;"></div> -->
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import { ToolboxComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useProductStore } from "@/store/productStore";

const productStore = useProductStore();

const getProducts = async () => {
  await productStore.getProducts();
};

// Khởi tạo echarts
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

onMounted(async () => {
  await getProducts();

  // Lấy dữ liệu từ productStore
  const chartData = productStore.products.map(product => ({
    value: product.soLuong,
    name: product.tenSanPham,
  }));

  const chartDom = document.getElementById("pie-chart");
  const myChart = echarts.init(chartDom);

  const option = {
    legend: {
      top: "bottom",
      textStyle: {
        fontFamily: "Google Sans",
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          fontFamily: "Google Sans",
        },
        data: chartData, // Sử dụng dữ liệu từ productStore
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => { });
});
</script>
