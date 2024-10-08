<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div id="pie-chart" style="width: 100%; height: 700px"></div>
    </div>
    <div class="col-12 col-md-6">
      <div id="doghnut-chart" style="width: 100%; height: 700px"></div>
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
          { value: 40, name: "Gạo" },
          { value: 38, name: "Ngô" },
          { value: 32, name: "Khoai tây" },
          { value: 30, name: "Cà phê" },
          { value: 28, name: "Trái cây" },
          { value: 26, name: "Rau xanh" },
          { value: 22, name: "Chè" },
          { value: 18, name: "Hạt điều" },
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
          { value: 40, name: "Gạo" },
          { value: 38, name: "Ngô" },
          { value: 32, name: "Khoai tây" },
          { value: 30, name: "Cà phê" },
          { value: 28, name: "Trái cây" },
          { value: 26, name: "Rau xanh" },
          { value: 22, name: "Chè" },
          { value: 18, name: "Hạt điều" },
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
@media (max-width: 768px) {
  #pie-chart,
  #doghnut-chart {
    height: 200px;
  }
}
</style>
