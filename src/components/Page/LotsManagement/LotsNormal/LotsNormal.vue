<template>
  <div class="text-center d-flex justify-content-center mb-3">
    <button class="btn btn-primary me-2 d-flex align-items-center" @click="zoomIn"><span
        class="material-symbols-outlined me-2">add</span>Zoom In</button>
    <button class="btn btn-secondary d-flex align-items-center" @click="zoomOut"><span
        class="material-symbols-outlined me-2">remove</span>Zoom Out</button>
  </div>
  <div class="container-fluid vh-100 p-0">
    <div class="warehouse-container" ref="warehouseContainer">
      <div class="row">
        <!-- Danh sách các khu vực trong kho -->
        <div class="col-2 mb-4 zone-card" v-for="zone in warehouseZones" :key="zone.id" @click="showZoneDetails(zone)">
          <div class="card">
            <div class="card-body text-center">
              <p class="card-text">{{ zone.name }}</p>
              <p class="card-text"><span class="badge rounded-pill bg-success">{{ zone.id }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Panzoom from '@panzoom/panzoom';

// Dữ liệu ví dụ cho các khu vực trong kho
const warehouseZones = ref([
  { id: 'B3', name: 'Pennywort' },
  { id: 'C1', name: 'Apple' },
  { id: 'D1', name: 'Avocado' },
  { id: 'E1', name: 'Banana' },
  { id: 'F1', name: 'Blueberry' },
  { id: 'G1', name: 'Cherry' },
  { id: 'H1', name: 'Date' },
  { id: 'I1', name: 'Elderberry' },
  { id: 'J1', name: 'Fig' },
  { id: 'K1', name: 'Grape' },
  { id: 'L1', name: 'Honeydew' },
  { id: 'M1', name: 'Kiwi' },
  { id: 'N1', name: 'Lemon' },
  { id: 'O1', name: 'Mango' },
  { id: 'P1', name: 'Nectarine' },
  { id: 'Q1', name: 'Orange' },
  { id: 'R1', name: 'Papaya' },
  { id: 'S1', name: 'Quince' },
  { id: 'T1', name: 'Raspberry' },
  { id: 'U1', name: 'Strawberry' },
  { id: 'V1', name: 'Tomato' },
  { id: 'W1', name: 'Ugli Fruit' },
  { id: 'X1', name: 'Vanilla' },
  { id: 'Y1', name: 'Watermelon' },
  { id: 'Z1', name: 'Xigua' },
  { id: 'ZA1', name: 'Yuzu' },
  { id: 'ZB1', name: 'Zante Currant' },
  { id: 'ZC1', name: 'Amla' },
  { id: 'ZD1', name: 'Ackee' },
  { id: 'ZE1', name: 'Atemoya' },
  { id: 'ZF1', name: 'Buddha\'s Hand' },
  { id: 'ZG1', name: 'Cantaloupe' },
  { id: 'ZH1', name: 'Clementine' },
  { id: 'ZI1', name: 'Damson' },
  { id: 'ZJ1', name: 'Dragon Fruit' },
  { id: 'ZK1', name: 'Durian' },
  { id: 'ZL1', name: 'Elderberry' },
  { id: 'ZM1', name: 'Feijoa' },
  { id: 'ZN1', name: 'Gooseberry' },
  { id: 'ZO1', name: 'Huckleberry' },
  { id: 'ZP1', name: 'Jujube' },
  { id: 'ZQ1', name: 'Kumquat' },
  { id: 'ZR1', name: 'Lychee' },
  { id: 'ZS1', name: 'Mulberry' },
  { id: 'ZT1', name: 'Nance' }
]);

const warehouseContainer = ref(null);
const panzoomInstance = ref(null);

onMounted(() => {
  panzoomInstance.value = Panzoom(warehouseContainer.value, {
    maxScale: 2,
    minScale: 1,
    contain: 'outside',
  });
  warehouseContainer.value.addEventListener('wheel', handleWheel);
});

onBeforeUnmount(() => {
  warehouseContainer.value.removeEventListener('wheel', handleWheel);
});

const handleWheel = (event) => {
  event.preventDefault();
  const scale = event.deltaY < 0 ? 1.6 : 1;
  panzoomInstance.value.zoom(scale, event.clientX, event.clientY);
};

const zoomIn = () => panzoomInstance.value.zoomIn();
const zoomOut = () => panzoomInstance.value.zoomOut();
</script>

<style scoped>
.warehouse-container {
  overflow: hidden;
}

.zone-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.zone-card:hover {
  transform: scale(1.05);
}

.zone-card:hover {
  transform: scale(1.05);
}

.card {
  width: 100%;
}
</style>
