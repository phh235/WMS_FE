import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

// Utility function để load dữ liệu từ localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// Utility function để lưu dữ liệu vào localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useProductStore = defineStore("products", () => {
  const products = ref(loadFromLocalStorage("products", [])); // Load từ localStorage
  const apiStore = useApiStore();

  const getProducts = async () => {
    // Nếu dữ liệu đã có trong localStorage thì không cần gọi lại API
    if (products.value.length === 0) {
      try {
        const response = await apiStore.get("products");
        products.value = response.data.list;
        // Lưu dữ liệu vào localStorage
        saveToLocalStorage("products", products.value);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        showToastError("Không thể lấy danh sách sản phẩm. Vui lòng thử lại sau.");
      }
    }
  };

  return { products, getProducts };
});
