import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useQRCodeStore = defineStore("qRCode", () => {
  const qrCode = ref([]);
  const apiService = useApiServices();

  const getQRCode = async () => {
    try {
      const response = await apiService.get(`barcodes/generate?maLo=LOT191224012`);
      qrCode.value = response.data;
      console.log(qrCode.value);
    } catch (error) {
      console.error("Failed to fetch qRCode:", error);
      showToastError("Không thể lấy danh sách khách hàng. Vui lòng thử lại sau.");
    }
  };

  return { qrCode, getQRCode };
});
