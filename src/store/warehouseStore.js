import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "./apiStore";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

export const useWarehouseStore = defineStore("warehouses", () => {
  const warehouses = ref([]);
  const apiStore = useApiStore();

  const getWarehouses = async () => {
    try {
      const response = await apiStore.get("warehouses");
      warehouses.value = response.data.list;
    } catch (error) {
      console.error("Failed to fetch warehouses:", error);
      showToastError("Không thể lấy danh sách kho. Vui lòng thử lại sau.");
    }
  };

  return { warehouses, getWarehouses };
});
