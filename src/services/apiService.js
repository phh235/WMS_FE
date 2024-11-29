import { defineStore } from "pinia";
import axios from "axios";

const API_DOMAIN_LOCAL = "http://157.66.26.244:8080";
const BASE_URL = `${API_DOMAIN_LOCAL}/api/v1/`;

const getToken = () => localStorage.getItem("token");

const createConfig = (isMultipart = false, params = null) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
  };

  const config = { headers };

  if (params) {
    config.params = params;
  }

  return config;
};

export const useApiServices = defineStore("api", {
  actions: {
    async get(url, params = null) {
      try {
        const response = await axios.get(`${BASE_URL}${url}`, createConfig(false, params));
        return response.data;
      } catch (error) {
        console.error("GET request error:", error);
        throw error;
      }
    },

    async post(url, data) {
      try {
        const response = await axios.post(`${BASE_URL}${url}`, data, createConfig());
        return response.data;
      } catch (error) {
        console.error("POST request error:", error);
        throw error;
      }
    },

    async postImage(url, data) {
      try {
        const response = await axios.post(`${BASE_URL}${url}`, data, createConfig(true));
        return response.data;
      } catch (error) {
        console.error("POST image request error:", error);
        throw error;
      }
    },

    async delete(url, id) {
      try {
        const response = await axios.delete(`${BASE_URL}${url}`, {
          ...createConfig(),
          data: id,
        });
        return response.data;
      } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
      }
    },
  },
});
