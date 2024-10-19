import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/components/Toast/utils/toastHandle";

// Utility function để lấy dữ liệu từ localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// Utility function để lưu dữ liệu vào localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useWarehouseStore = defineStore("warehouses", () => {
  const apiStore = useApiServices();
  // Load initial data từ localStorage, nếu không có thì trả về mảng rỗng
  const warehouses = ref(loadFromLocalStorage("warehouses", []));

  const getWarehouses = async () => {
    // Nếu dữ liệu đã có trong localStorage thì không cần gọi lại API
    if (warehouses.value.length === 0) {
      try {
        const response = await apiStore.get("warehouses");
        warehouses.value = response.data.list;
        // Lưu dữ liệu warehouses vào localStorage
        saveToLocalStorage("warehouses", warehouses.value);
      } catch (error) {
        console.error("Failed to fetch warehouses:", error);
        showToastError("Không thể lấy danh sách kho. Vui lòng thử lại sau.");
      }
    }
  };

  return { warehouses, getWarehouses };
});
