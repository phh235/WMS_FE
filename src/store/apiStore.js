import { defineStore } from "pinia";
import { apiService } from "../services/apiService.js";

export const useApiStore = defineStore("api", {
  actions: {
    async get(url, params = null) {
      try {
        return await apiService.get(url, params);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    async post(url, data) {
      try {
        return await apiService.post(url, data);
      } catch (error) {
        console.error("Error posting data:", error);
        throw error;
      }
    },

    async postImage(url, data) {
      try {
        return await apiService.postImage(url, data);
      } catch (error) {
        console.error("Error posting data:", error);
        throw error;
      }
    },

    async delete(url, id) {
      try {
        return await apiService.delete(`${url}`, id);
      } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
      }
    },
  },
});
