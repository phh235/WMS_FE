<template>
  <div id="doughnut-chart" style="width: 80%; height: 80%;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import { ToolboxComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useProductStore } from "@/store/productStore";

const productStore = useProductStore();

const getProducts = async () => {
  await productStore.getProducts();
};

echarts.use([ToolboxComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

onMounted(async () => {
  await getProducts();
  const chartData = productStore.products.map(product => ({
    value: product.soLuongHienCo,
    name: product.tenSanPham,
  }));

  const chartDom = document.getElementById("doughnut-chart");
  const myChart = echarts.init(chartDom);


  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        // Tùy chỉnh tooltip để hiển thị cả value và "số lượng hiện có"
        return `<b>${params.name}</b><br />Số lượng hiện có: <b>${params.value}</b>`;
      },
      fontFamily: "Google Sans",
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    legend: {
      top: "bottom",
      left: "center",
      fontFamily: "Google Sans",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          fontFamily: "Google Sans",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
            fontFamily: "Google Sans",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
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
