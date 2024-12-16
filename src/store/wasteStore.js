import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/utils/Toast/toastHandle";

export const useWasteProductStore = defineStore("wasteProduct", () => {
  const wasteProduct = ref([]);
  const wasteTotalProduct = ref([]);
  const apiService = useApiServices();

  const getWasteProduct = async () => {
    try {
      const response = await apiService.get("waste-products");
      wasteProduct.value = response.data;
    } catch (error) {
      console.error("Failed to fetch wasteProduct:", error);
      showToastError("Không thể lấy danh sách. Vui lòng thử lại sau.");
    }
  };

  const getTotalWasteProduct = async () => {
    try {
      const response = await apiService.get("waste-products/tong-so-luong");
      wasteTotalProduct.value = response.data;
      console.log(wasteTotalProduct.value);
    } catch (error) {
      console.error("Failed to fetch wasteProduct:", error);
      showToastError("Không thể lấy danh sách. Vui lòng thử lại sau.");
    }
  };

  return { wasteProduct, getWasteProduct, wasteTotalProduct, getTotalWasteProduct };
});
