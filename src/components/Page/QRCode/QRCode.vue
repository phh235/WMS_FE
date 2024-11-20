<template>
  <div class="container mt-5">
    <h1 class="text-center fw-bold" style="font-family: Bricolage Grotesque; color: var(--primary-color);">Quét QR</h1>
    <div class="text-center mt-4">
      <!-- Gắn ref video -->
      <video ref="videoElement" class="box-shadow" style="width: 400px; min-height: auto;" autoplay muted
        playsinline></video>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary" @click="startScanner">
        <span class="material-symbols-outlined me-2 align-middle">
          qr_code_scanner
        </span>Quét</button>
      <button class="btn btn-danger ms-2" @click="stopScanner"> <span
          class="material-symbols-outlined me-2 align-middle">
          close
        </span>Dừng quét</button>
    </div>
    <div class="alert alert-success mt-3" v-if="qrCodeData">
      Scanned QR Code Data: <strong>{{ qrCodeData }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const qrCodeData = ref(null);
const videoElement = ref(null);
let qrScanner = null;

const loadQrScanner = async () => {
  const QrScanner = (await import("qr-scanner")).default;
  return QrScanner;
};

const startScanner = async () => {
  if (!videoElement.value) {
    console.error("Video element not mounted!");
    return;
  }

  qrCodeData.value = null;
  const QrScanner = await loadQrScanner();

  if (!qrScanner) {
    qrScanner = new QrScanner(
      videoElement.value,
      (result) => {
        qrCodeData.value = result.data;
        // gọi api theo pr code data
        // router push by name or path
        stopScanner();
      },
      {
        returnDetailedScanResult: true,
      }
    );
  }
  qrScanner.start();
};

const stopScanner = () => {
  if (qrScanner) {
    qrScanner.stop();
  }
};

onBeforeUnmount(() => {
  if (qrScanner) {
    qrScanner.destroy();
  }
});
</script>

<style>
.box-shadow {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}
</style>
