import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useSupplierStore = defineStore("suppliers", () => {
  const suppliers = ref([]);
  const apiService = useApiServices();

  const getSuppliers = async () => {
    try {
      const response = await apiService.get("suppliers");
      suppliers.value = response.data;
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      showToastError("Không thể lấy danh sách nhà cung cấp. Vui lòng thử lại sau.");
    }
  };

  return { suppliers, getSuppliers };
});
