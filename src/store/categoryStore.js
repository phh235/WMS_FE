import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/components/Toast/utils/toastHandle";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref([]);
  const apiService = useApiServices();

  const getCategories = async () => {
    try {
      const response = await apiService.get("category-products");
      categories.value = response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      showToastError("Không thể lấy danh sách danh mục. Vui lòng thử lại sau.");
    }
  };

  return { categories, getCategories };
});
