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
      localStorage.setItem("tokenApi", token);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    checkAuth() {
      const token = localStorage.getItem("tokenApi");
      if (token) {
        this.setToken(token);
        return true;
      }
      return false;
    },

    logout() {
      this.token = null;
      localStorage.removeItem("tokenApi");
      // delete axios.defaults.headers.common["Authorization"];
      showToastSuccess("Đã đăng xuất");
      return router.push("/");
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
