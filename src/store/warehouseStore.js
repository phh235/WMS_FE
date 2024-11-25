import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useWarehouseStore = defineStore("warehouses", () => {
  const warehouses = ref([]);
  const apiService = useApiServices();

  const getWarehouses = async () => {
    try {
      const response = await apiService.get("warehouses");
      warehouses.value = response.data;
    } catch (error) {
      console.error("Failed to fetch warehouses:", error);
      showToastError("Không thể lấy danh sách kho. Vui lòng thử lại sau.");
    }
  };

  return { warehouses, getWarehouses };
});
