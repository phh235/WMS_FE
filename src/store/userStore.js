import { defineStore } from "pinia";
import { reactive } from "vue";
import { useApiServices } from "../services/apiService";
import { showToastError } from "@/components/Toast/utils/toastHandle";

export const useUserStore = defineStore("user", () => {
  // Sử dụng reactive để tạo đối tượng user có thể phản ứng
  const user = reactive({
    username: "",
    email: "",
    fullName: "",
    soDienThoai: "",
    role: "",
  });

  const apiService = useApiServices();

  // Hàm load user từ sessionStorage
  const loadUserFromSession = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      user.username = storedUser.username;
      user.email = storedUser.email;
      user.fullName = storedUser.fullName;
      user.soDienThoai = storedUser.soDienThoai;
      user.role = storedUser.roles[0]?.roleName || ""; // lấy roleName nếu tồn tại
    }
  };

  // Hàm getUserByUsername để gọi API và lưu thông tin vào sessionStorage
  const getUserByUsername = async () => {
    try {
      const storedUsername = localStorage.getItem("user");
      if (!storedUsername) {
        console.error("Username not found in localStorage");
        showToastError("Không tìm thấy thông tin người dùng.");
        return;
      }
      const response = await apiService.get(`users/${storedUsername}`);
      const responseData = response.data;

      // Cập nhật reactive user với thông tin từ API
      user.username = responseData.username;
      user.email = responseData.email;
      user.fullName = responseData.fullName;
      user.soDienThoai = responseData.soDienThoai;
      user.role = responseData.roles[0]?.roleName || ""; // lấy roleName nếu tồn tại

      // Lưu thông tin người dùng vào sessionStorage để sử dụng lại
      sessionStorage.setItem("user", JSON.stringify(responseData));
    } catch (error) {
      console.error("Failed to fetch user by username:", error);
      showToastError("Không thể lấy thông tin user. Vui lòng thử lại sau.");
    }
  };

  return { user, loadUserFromSession, getUserByUsername };
});