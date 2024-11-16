import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/components/Toast/utils/toastHandle";

export const useConsignmentsStore = defineStore("consignments", () => {
  const consignments = ref([]);
  const apiService = useApiServices();

  const getConsignments = async () => {
    try {
      const response = await apiService.get("consignment");
      consignments.value = response.data;
    } catch (error) {
      console.error("Failed to fetch consignments:", error);
      showToastError("Không thể lấy danh sách lô hàng. Vui lòng thử lại sau.");
    }
  };

  return { consignments, getConsignments };
});
