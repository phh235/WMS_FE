<template>
  <div class="row">
    <div class="col">
      <div id="pie-chart"></div>
    </div>
    <div class="col">
      <div id="doghnut-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import { ToolboxComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

onMounted(() => {
  var chartDom = document.getElementById("pie-chart");
  var myChart = echarts.init(chartDom);
  var option = {
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
          normal: {
            fontFamily: "Google Sans",
          },
        },
        data: [
          { value: 40, name: "iPhone 13 Pro" },
          { value: 38, name: "Samsung Galaxy Z Fold3" },
          { value: 32, name: "MacBook Air M1" },
          { value: 30, name: "Apple Watch Series 7" },
          { value: 28, name: "Lenovo IdeaPad 5 Pro" },
          { value: 26, name: "Huawei P40 Pro" },
          { value: 22, name: "AirPods 4 Pro" },
          { value: 18, name: "Google Pixel 6 Pro" },
        ],
      },
    ],
  };

  myChart.setOption(option);

  var chartDom2 = document.getElementById("doghnut-chart");
  var myChart2 = echarts.init(chartDom2);
  var option2 = {
    tooltip: {
      trigger: "item",
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
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Điện thoại" },
          { value: 735, name: "Laptop" },
          { value: 580, name: "Máy tính bảng" },
          { value: 484, name: "Tai nghe" },
          { value: 300, name: "Đồng hồ" },
        ],
      },
    ],
  };

  myChart2.setOption(option2);

  window.addEventListener("resize", () => {
    myChart.resize();
    myChart2.resize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {});
});
</script>

<style scoped>
#pie-chart,
#doghnut-chart {
  width: 100%;
  height: 700px;
}
</style>
