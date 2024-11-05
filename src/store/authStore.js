import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { showToastSuccess, showToastError } from "@/components/Toast/utils/toastHandle";
import i18n from "@/lang/i18n";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    language: localStorage.getItem("language") || "VI",
  }),
  actions: {
    async login(userCredentials) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          userCredentials
        );

        if (typeof response.data.accessToken) {
          this.setToken(response.data.accessToken);

          // Kiểm tra nếu có đường dẫn được lưu lại trước đó
          const redirectPath = localStorage.getItem("redirectPath") || "/inventory";

          // Xóa đường dẫn đã lưu sau khi chuyển hướng
          localStorage.removeItem("redirectPath");

          showToastSuccess(i18n.global.t("Swal.login.toast.success.title"));
          router.push(redirectPath);
        }
        return true;
      } catch (error) {
        showToastError(i18n.global.t("Swal.login.toast.error.login_fail"));
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
      // Decode JWT token to get username is logged in
      const tokenDecode = JSON.parse(atob(token.split(".")[1])).sub;
      // Lưu giá trị tokenDecode mà không có dấu ngoặc kép
      localStorage.setItem("user", tokenDecode); // Không cần JSON.stringify
    },
    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây

        // Kiểm tra xem token thời gian hết hạn
        if (tokenDecode.exp && tokenDecode.exp < currentTime) {
          return false;
        }

        this.setToken(token);
        return true;
      }
      return false;
    },
    checkPermissions(permissions) {
      const tokenDecodeRoles = JSON.parse(atob(this.token.split(".")[1])).roles;
      return permissions.includes(tokenDecodeRoles);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Xóa lịch sử trình duyệt để không thể quay lại trang trước khi đăng xuất
      window.history.replaceState(null, "", "/login");
      showToastSuccess(i18n.global.t("Swal.logout.toast.success.title"));
      return router.push("/login");
    },
    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem("language", lang); // Lưu giá trị vi-en vào localStorage
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
