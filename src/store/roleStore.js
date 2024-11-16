import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/components/Toast/utils/toastHandle";

export const useRoleStore = defineStore("roles", () => {
  const roles = ref([]);
  const apiService = useApiServices();

  const getRole = async () => {
    try {
      const response = await apiService.get("role");
      roles.value = response.data;
    } catch (error) {
      console.error("Failed to fetch role:", error);
      showToastError("Không thể lấy danh sách vai trò. Vui lòng thử lại sau.");
    }
  };

  return { roles, getRole };
});
