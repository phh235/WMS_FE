import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/";

const getToken = () => {
  return localStorage.getItem("token");
};

export const apiService = {
  async get(url, params = null) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      if (params) {
        config.params = params;
      }
      const response = await axios.get(`${BASE_URL}${url}`, config);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },

  async post(url, data) {
    try {
      const response = await axios.post(`${BASE_URL}${url}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  async postImage(url, data) {
    try {
      const response = await axios.post(`${BASE_URL}${url}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  async delete(url, id) {
    try {
      const response = await axios.delete(`${BASE_URL}${url}`, id, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
};
