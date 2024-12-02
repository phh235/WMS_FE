<template>
  <div class="container mt-5">
    <h3 class="text-center fw-bold" style="font-family: Bricolage Grotesque; color: var(--primary-color);">Quét QR lô
      hàng</h3>
    <div class="text-center mt-4">
      <!-- Gắn ref video -->
      <video ref="videoElement" class="box-shadow video" autoplay muted playsinline></video>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary" @click="startScanner" style="height: 39px;">
        <span class="material-symbols-outlined me-2 align-middle">
          qr_code_scanner
        </span>Bắt đầu quét</button>
      <button class="btn btn-danger ms-2" @click="stopScanner">
        <span class="material-symbols-outlined me-2 align-middle">close</span>Dừng quét
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";

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
        window.open(`/inventory/scan-result/lot-info/${result.data}`, "_blank");
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

.video {
  width: 400px;
  height: auto;
}

@media screen and (max-width: 768px) {
  .video {
    width: 100% !important;
  }
}
</style>
