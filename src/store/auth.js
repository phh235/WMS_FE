import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
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

          const redirectPath = "/inventory";
          router.push(redirectPath);
        }
        return true;
      } catch (error) {
        showToastError("Đăng nhập thất bại");
      }
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
      const tokenDecode = JSON.parse(atob(token.split(".")[1])).sub;
      console.log(tokenDecode);
      localStorage.setItem("user", JSON.stringify(tokenDecode));
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây

        // Kiểm tra xem token đã hết hạn chưa
        if (tokenDecode.exp && tokenDecode.exp < currentTime) {
          showToastError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
          this.logout(); // Đăng xuất nếu token đã hết hạn
          return false;
        }

        this.setToken(token);
        return true;
      }
      return false;
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
      // delete axios.defaults.headers.common["Authorization"];
      showToastSuccess("Đã đăng xuất");
      return router.push("/dang-nhap");
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
