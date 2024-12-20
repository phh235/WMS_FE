import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useZoneStore = defineStore("zones", () => {
  const zones = ref([]);
  const apiService = useApiServices();

  const getZones = async () => {
    try {
      const response = await apiService.get("zones");
      zones.value = response.data;
    } catch (error) {
      console.error("Failed to fetch zones:", error);
      showToastError("Không thể lấy danh sách khu vực. Vui lòng thử lại sau.");
    }
  };

  return { zones, getZones };
});
