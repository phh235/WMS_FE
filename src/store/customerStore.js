import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { showToastError } from "@/components/Toast/utils/toastHandle";

export const useCustomerStore = defineStore("customers", () => {
  const customers = ref([]);
  const apiService = useApiServices();

  const getCustomers = async () => {
    try {
      const response = await apiService.get("customers");
      customers.value = response.data;
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      showToastError("Không thể lấy danh sách khách hàng. Vui lòng thử lại sau.");
    }
  };

  return { customers, getCustomers };
});
