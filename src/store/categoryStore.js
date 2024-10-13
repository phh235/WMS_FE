import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "./apiStore";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

// Utility function để lấy dữ liệu từ localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// Utility function để lưu dữ liệu vào localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useCategoriesStore = defineStore("categories", () => {
  // Load initial data từ localStorage, nếu không có thì trả về mảng rỗng
  const categories = ref(loadFromLocalStorage("categories", []));
  const apiStore = useApiStore();

  const getCategories = async () => {
    // Nếu dữ liệu đã có trong localStorage thì không cần gọi lại API
    if (categories.value.length === 0) {
      try {
        const response = await apiStore.get("category-products");
        categories.value = response.data.list;
        // Lưu dữ liệu categories vào localStorage
        saveToLocalStorage("categories", categories.value);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        showToastError("Không thể lấy danh sách danh mục. Vui lòng thử lại sau.");
      }
    }
  };

  return { categories, getCategories };
});
