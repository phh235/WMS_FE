<template>
  <div class="container">
    <div class="block p-4 box-shadow">
      <div class="d-flex justify-content-end align-items-center mb-4">
        <div class="form-group fs has-search d-flex align-items-center me-3">
          <span class="material-symbols-outlined form-control-feedback">search</span>
          <input
            type="search"
            class="form-control"
            placeholder="Tìm theo ID, người yêu cầu"
            v-model="searchQuery"
          />
        </div>
        <button class="btn btn-primary d-flex align-items-center">
          <span class="material-symbols-outlined me-2"> add </span>Tạo yêu cầu mua hàng
        </button>
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
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Người yêu cầu</th>
              <th>Trạng thái</th>
              <th>Ngày yêu cầu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredOrders.length === 0" style="text-align: center; font-style: italic">
              <td colspan="10">Không tìm thấy yêu cầu mua hàng</td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id" class="tr-hover">
              <td>{{ order.id }}</td>
              <td>{{ order.requester }}</td>
              <td>
                <span :class="['badge', getBadgeClass(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td>{{ order.dateRequest }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const searchQuery = ref("");

const orders = ref([
  {
    id: "PO1",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
  },
  {
    id: "PO2",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã phê duyệt",
  },
  {
    id: "PO3",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
  },
  {
    id: "PO4",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã phê duyệt",
  },
  {
    id: "PO5",
    requester: "phh235",
    dateRequest: "29/09/2024",
    status: "Đã hủy",
  },
  {
    id: "PO6",
    requester: "andrewh",
    dateRequest: "29/09/2024",
    status: "Đã phê duyệt",
  },
  {
    id: "PO7",
    requester: "andrewh",
    dateRequest: "29/09/2024",
    status: "Đã phê duyệt",
  },
  {
    id: "PO8",
    requester: "andrewh",
    dateRequest: "29/09/2024",
    status: "Đã phê duyệt",
  },
]);

const activeTab = ref("Tất cả");
const tabs = ["Tất cả", "Đã phê duyệt", "Đã hủy"];

const filteredOrders = computed(() => {
  let filtered = orders.value;

  // Lọc theo trạng thái nếu không phải tab "Tất cả"
  if (activeTab.value !== "Tất cả") {
    filtered = filtered.filter((order) => order.status === activeTab.value);
  }

  // Lọc theo ID hoặc người yếu cầu nếu có từ khóa tìm kiếm
  if (searchQuery.value) {
    filtered = filtered.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        order.requester.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

// dùng watch để cập nhật URL khi activeTab thay đổi
watch(activeTab, () => {
  updateUrl();
});

/**
 * Cập nhật URL hiện tại
 * - Thêm tham số tab vào URL
 * - Xóa tham số tab khỏi URL
 */
const updateUrl = () => {
  const baseUrl = window.location.pathname;
  const query = [];

  // Thêm tham số tab vào URL
  if (activeTab.value && activeTab.value !== "Tất cả") {
    query.push(`tab=${activeTab.value}`);
  }

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  window.history.replaceState({}, "", `${baseUrl}${queryString}`);
};

const getBadgeClass = (status) => {
  switch (status) {
    case "Đã phê duyệt":
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
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}
td {
  vertical-align: middle;
  font-size: 14px;
}
.bg-success {
  font-size: 14px;
  background-color: #effbf2 !important;
  color: var(--primary-color-hover);
  border: 1.4px solid var(--primary-color);
}
.bg-danger {
  font-size: 14px;
  background-color: #faf0f0 !important;
  color: #dc3545;
  border: 1.4px solid #dc3545;
}
.badge {
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 500;
}
.tab-container {
  background-color: #f4f4f5;
  border-radius: 12px;
  padding: 4px;
  max-width: fit-content;
}
.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}
.tab-button.active {
  background-color: white;
  color: #000;
  /* box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04); */
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
  &:hover {
    background-color: white;
  }
}
td {
  cursor: pointer;
}
.tr-hover:hover td {
  background-color: var(--secondary-color);
}
</style>
