import { defineStore } from "pinia";
import axios from "axios";

const API_DOMAIN_LOCAL = "http://localhost:8080";
const API_DOMAIN_SERVER = "https://wms-techtribe.io.vn";
const BASE_URL = `${API_DOMAIN_SERVER}/api/v1/`;

const getToken = () => localStorage.getItem("token");

const createConfig = (isMultipart = false, params = null) => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
  },
  params,
});

export const useApiServices = defineStore("api", {
  actions: {
    async get(url, params) {
      try {
        return (await axios.get(`${BASE_URL}${url}`, createConfig(false, params))).data;
      } catch (error) {
        console.error("GET request error:", error);
        throw error;
      }
    },

    async post(url, data) {
      try {
        return (await axios.post(`${BASE_URL}${url}`, data, createConfig())).data;
      } catch (error) {
        console.error("POST request error:", error);
        throw error;
      }
    },

    async postImage(url, data) {
      try {
        return (await axios.post(`${BASE_URL}${url}`, data, createConfig(true))).data;
      } catch (error) {
        console.error("POST image request error:", error);
        throw error;
      }
    },

    async delete(url, id) {
      try {
        return (
          await axios.delete(`${BASE_URL}${url}`, {
            ...createConfig(),
            data: id,
          })
        ).data;
      } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
      }
    },
  },
});
