<template>
  <div class="container">
    <div class="block p-4">
      <div class="d-flex justify-content-end align-items-center mb-4">
        <!-- <h1 class="h2 fw-bold">Yêu cầu mua hàng</h1> -->
        <button class="btn btn-primary">Tạo yêu cầu mua hàng</button>
      </div>
      <div class="tab-container mb-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="['tab-button', { active: activeTab === tab }]"
        >
          {{ tab }}
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-secondary">
            <tr>
              <th>ID</th>
              <th>Người yêu cầu</th>
              <th>Trạng thái</th>
              <th>Ngày yêu cầu</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.requester }}</td>
              <td>
                <span :class="['badge', getBadgeClass(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td>{{ order.dateRequest }}</td>
              <td>{{ order.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const orders = ref([
  {
    id: "PO1",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
    total: "10.000 đ",
  },
  {
    id: "PO2",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã duyệt",
    total: "10.000 đ",
  },
  {
    id: "PO3",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
    total: "10.000 đ",
  },
  {
    id: "PO4",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã duyệt",
    total: "10.000 đ",
  },
  {
    id: "PO5",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
    total: "10.000 đ",
  },
  {
    id: "PO6",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã duyệt",
    total: "15.000 đ",
  },
  {
    id: "PO7",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã duyệt",
    total: "8.000 đ",
  },
  {
    id: "PO8",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã duyệt",
    total: "20.000 đ",
  },
]);

const activeTab = ref("Tất cả");
const tabs = ["Tất cả", "Đã duyệt", "Đã hủy"];

const filteredOrders = computed(() => {
  if (activeTab.value === "Tất cả") {
    return orders.value;
  } else {
    return orders.value.filter((order) => order.status === activeTab.value);
  }
});

const getBadgeClass = (status) => {
  switch (status) {
    case "Đã duyệt":
      return "bg-success";
    case "Đã hủy":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};
</script>

<style scoped>
.block {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}
td {
  vertical-align: middle;
  font-size: 14px;
}
.bg-success {
  font-size: 14px;
  background-color: #effbf2 !important;
  color: #1bbc60;
  border: 1.5px solid #1bbc60;
}
.bg-danger {
  font-size: 14px;
  background-color: #faf0f0 !important;
  color: #f68282;
  border: 1.5px solid #f68282;
}
.badge {
  padding: 5px 10px;
  font-weight: 600;
}
.tab-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  max-width: fit-content;
}
.tab-button {
  padding: 6px 12px;
  border: none;
  margin: 2px;
  background-color: transparent;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: #e9ecef;
  }
}
.tab-button.active {
  background-color: white;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: white;
  }
}
th {
  background-color: #f8f9fa;
}
</style>
