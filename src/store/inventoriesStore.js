import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useInventoriesStore = defineStore("inventories", () => {
  const inventories = ref([]);
  const apiService = useApiServices();

  const getInventories = async () => {
    try {
      const response = await apiService.get("inventories");
      inventories.value = response.data;
    } catch (error) {
      console.error("Failed to fetch inventories:", error);
      showToastError("Không thể lấy danh sách tồn kho vật lý. Vui lòng thử lại sau.");
    }
  };

  return { inventories, getInventories };
});
