<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-4" v-for="(card, index) in cards" :key="index">
    <div class="card" :style="{ '--card-bg-color': card.bgColor }">
      <div class="row">
        <div class="col-7">
          <div class="card-body">
            <router-link :to="card.path" class="card-title h6 fw-bold">
              {{ card.title }}
            </router-link>
            <p class="card-text text-secondary fs">{{ card.warehouseName }} - {{ card.text }}</p>
            <router-link :to="card.path" class="btn btn-primary">{{ card.buttonText }}</router-link>
          </div>
        </div>
        <div class="col-5">
          <div class="card-body float-end">
            <p class="card-text text-secondary" style="font-size: 12px">2 {{ card.orderStatus }}</p>
            <p class="card-text text-secondary" style="font-size: 12px">2 {{ card.orderStatus }}</p>
            <p class="card-text text-secondary" style="font-size: 12px">2 {{ card.orderStatus }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cards = [
  {
    title: "Phiếu nhập kho",
    text: "phh235",
    warehouseName: "Kho chính",
    path: "/inventory/nhap",
    buttonText: "6 cần xử lý",
    orderStatus: "Trễ",
    bgColor: "#00a86b",
  },
  {
    title: "Phiếu xuất kho",
    text: "phh235",
    warehouseName: "Kho chính",
    path: "/inventory/xuat",
    buttonText: "6 cần xử lý",
    orderStatus: "Đang chờ",
    bgColor: "#00a86b",
  },
  {
    title: "Điều chuyển nội bộ",
    text: "phh235",
    warehouseName: "Kho chính",
    path: "/inventory/dieu-chuyen",
    buttonText: "6 cần xử lý",
    orderStatus: "Đơn chậm trễ",
    bgColor: "#00a86b",
  },
  {
    title: "Phiếu nhập kho",
    text: "trungnb",
    warehouseName: "Kho chính",
    path: "/inventory/nhap",
    buttonText: "6 cần xử lý",
    orderStatus: "Trễ",
    bgColor: "#aaf0ca",
  },
  {
    title: "Phiếu xuất kho",
    text: "trungnb",
    warehouseName: "Kho chính",
    path: "/inventory/xuat",
    buttonText: "6 cần xử lý",
    orderStatus: "Đang chờ",
    bgColor: "#aaf0ca",
  },
  {
    title: "Điều chuyển nội bộ",
    text: "trungnb",
    warehouseName: "Kho chính",
    path: "/inventory/dieu-chuyen",
    buttonText: "6 cần xử lý",
    orderStatus: "Đơn chậm trễ",
    bgColor: "#aaf0ca",
  },
];
// bỏ comment nếu call api get all phiếu nhập/xuất
// const cards = ref([]);
// onMounted(async () => {
//   try {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/todos"); // Thay thế bằng URL của API thật
//     cards.value = response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy dữ liệu:", error);
//   }
// });
</script>

<style scoped>
.card {
  border-left: 1px solid #000;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #00000014;
  transition: all 0.1s;
  overflow: hidden;
  position: relative;
  &:hover {
    border: 1px solid #c9c9c9;
  }
}
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 5px;
  background-color: var(--card-bg-color);
}
.card-content {
  padding: 15px;
}
.card-title {
  cursor: pointer;
  text-decoration: none;
  color: var(--main-text-color);
  font-size: 16px;
}
.fs {
  font-size: 14px;
}
</style>
