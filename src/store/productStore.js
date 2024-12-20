import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const apiService = useApiServices();

  const getProducts = async () => {
    try {
      const response = await apiService.get("products");
      products.value = response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showToastError("Không thể lấy danh sách sản phẩm. Vui lòng thử lại sau.");
    }
  };

  return { products, getProducts };
});
