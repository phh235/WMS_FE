import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useZoneDetailStore = defineStore("zoneDetail", () => {
  const zoneDetail = ref([]);
  const apiService = useApiServices();

  const getZoneDetail = async () => {
    try {
      const response = await apiService.get("zone-details");
      zoneDetail.value = response.data;
    } catch (error) {
      console.error("Failed to fetch zoneDetail:", error);
      showToastError("Không thể lấy danh sách chi tiết khu vực. Vui lòng thử lại sau.");
    }
  };

  return { zoneDetail, getZoneDetail };
});
