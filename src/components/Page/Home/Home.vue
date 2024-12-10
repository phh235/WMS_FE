<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3 class="fw-bold mb-3" style="color: var(--nav-link-color);">
          {{ $t('Home.dashboard.title') }}
        </h3>
        <!-- <div class="d-flex justify-content-end align-items-center mb-4">
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
        </div> -->
      </div>
    </div>

    <AnalysisCard />

    <div class="row equal-height-row">
      <div class="col-12 col-lg-8 mb-4 mb-lg-0">
        <Chart />
      </div>
      <div class="col-12 col-lg-4">
        <RecentlyTransactions />
      </div>
    </div>
    <div class="row equal-height-row mt-4">
      <div class="col-12 col-lg-12">
        <InboundByProd />
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
import AnalysisCard from "./AnalysisCard.vue";
import Chart from "./Chart.vue";
import InboundByProd from "./InboundByProd.vue";

const date = ref([]);
const month = ref([]);
const year = ref(new Date().getFullYear());

const { t } = useI18n();
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

@media (max-width: 768px) {
  .tab-container {
    width: 100%;
    justify-content: space-between;
  }

  .tab-button {
    flex-grow: 1;
    text-align: center;
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
