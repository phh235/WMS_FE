import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "./apiStore";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref([]);
  const apiStore = useApiStore();

  const getCategories = async () => {
    try {
      const response = await apiStore.get("category-products");
      categories.value = response.data.list;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      showToastError("Không thể lấy danh sách kho. Vui lòng thử lại sau.");
    }
  };

  return { categories, getCategories };
});
