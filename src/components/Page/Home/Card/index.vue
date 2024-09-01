<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(card, index) in cards" :key="index">
    <div class="card">
      <div class="row">
        <div class="col">
          <div class="card-body">
            <router-link
              :to="card.link"
              class="card-title h6"
              style="cursor: pointer; text-decoration: none; color: #489a78"
            >
              {{ card.title }}
            </router-link>
            <p class="card-text text-secondary">{{ card.text }}</p>
            <router-link :to="card.link" class="btn btn-primary text-light">{{
              card.buttonText
            }}</router-link>
          </div>
        </div>
        <div class="col">
          <div class="card-body float-end">
            <p class="card-text text-secondary" style="font-size: 14px">2 {{ card.orderStatus }}</p>
            <p class="card-text text-secondary" style="font-size: 14px">2 {{ card.orderStatus }}</p>
            <p class="card-text text-secondary" style="font-size: 14px">2 {{ card.orderStatus }}</p>
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
    link: "/inventory/nhap",
    buttonText: "6 cần xử lý",
    orderStatus: "Trễ",
  },
  {
    title: "Phiếu xuất kho",
    text: "phh235",
    link: "/inventory/xuat",
    buttonText: "6 cần xử lý",
    orderStatus: "Đang chờ",
  },
  {
    title: "Điều chuyển nội bộ",
    text: "phh235",
    link: "/inventory/dieu-chuyen",
    buttonText: "6 cần xử lý",
    orderStatus: "Đơn chậm trễ",
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
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, .04);
  border: 1px solid #00000014;
  transition: all 0.1s;
  &:hover {
    border: 1px solid #c9c9c9;
  }
}
</style>
