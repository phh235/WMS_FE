<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center flex-column flex-md-row mb-2">
      <div class="tab-container justify-content-start mb-2 mb-md-0">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['tab-button', { active: activeTab === tab }]">
          {{ tab }}
        </button>
      </div>
      <div class="d-flex flex-column flex-md-row align-items-center">
        <div class="form-group fs has-search d-flex align-items-center me-2">
          <span class="material-symbols-outlined form-control-feedback">search</span>
          <input type="search" class="form-control" placeholder="Tìm kiếm" v-model="searchQuery" />
        </div>
        <button class="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <span class="material-symbols-outlined me-2">add</span>Tạo đơn đặt hàng
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="order-card box-shadow mt-3 p-3" v-if="filteredOrders.length === 0">
          <div class="d-flex align-content-center justify-content-center">
            Không tìm thấy đơn đặt hàng
          </div>
        </div>
        <div class="order-card box-shadow mt-3 p-3" v-for="order in filteredOrders" :key="order.id"
          style="cursor: pointer">
          <div class="order-header d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-center fw-bold">
              <h5 class="me-5 fs fw-bold" style="color: var(--nav-link-color);">
                <span class="me-2">{{ order.id }}</span> |
                <span class="ms-2">{{ order.product }}</span>
              </h5>
            </div>
            <span class="badge d-flex align-items-center" :class="getStatusClass(order.status)">
              <span class="material-symbols-outlined me-1">{{ getStatusIcon(order.status) }}</span>
              {{ order.status }}
            </span>
          </div>
          <div class="order-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex justify-content-center">
                <div class="order-user me-3">
                  <span class="material-symbols-outlined me-1">person</span>
                  {{ order.user }}
                </div>
                <div class="order-info">
                  <span class="material-symbols-outlined me-1">place</span>
                  {{ order.address }}
                </div>
              </div>
              <div class="order-info">
                <span class="material-symbols-outlined me-1">receipt</span>
                {{ order.billingStatus }}
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :class="getProgressBarClass(order.status)"
                :style="{ width: `${getProgressPercentage(order.status)}%` }"
                :aria-valuenow="getProgressPercentage(order.status)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress-steps">
              <div class="step" v-for="(step, index) in progressSteps" :key="index">
                <span class="material-symbols-outlined" :class="getStepIconClass(order.status, index)">
                  {{ step }}
                </span>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2" style="color: var(--nav-link-color);">
              <small>{{ order.date }}</small>
              <strong>{{ order.price }} đ</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-xl">
      <div class="modal-content" style="background-color: var(--background-color);">
        <div class="modal-header border-0">
          <button type="button" class="btn btn-secondary d-flex align-items-center" data-bs-dismiss="modal"
            aria-label="Close"> <span class="material-symbols-outlined me-2 icon"> chevron_left </span>
            Quay lại
          </button>
        </div>
        <div class="modal-body p-0 container-fluid vh-100">
          <PurchaseOrderForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PurchaseOrderForm from "./PurchaseOrderForm/PurchaseOrderForm.vue";
import { useI18n } from "vue-i18n";


const searchQuery = ref("");
const { t } = useI18n();
const activeTab = ref(t('PurchaseRequest.tabs.all'));
const tabs = computed(() => [t('PurchaseRequest.tabs.all'), t('PurchaseRequest.tabs.pending'), t('PurchaseRequest.tabs.confirmed'), t('PurchaseRequest.tabs.canceled')]);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const searchLower = searchQuery.value.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.id.toUpperCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower) ||
      order.user.toLowerCase().includes(searchLower) ||
      order.address.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });
});

const progressSteps = ["schedule", "inventory", "local_shipping", "check_circle"];

const getStatusClass = (status) => {
  const classes = {
    waiting: "bg-warning",
    pending: "bg-info",
    done: "bg-success",
    cancel: "bg-danger",
  };
  return classes[status] || "bg-secondary";
};

const getStatusIcon = (status) => {
  const icons = {
    waiting: "hourglass_empty",
    pending: "refresh",
    done: "check_circle",
    cancel: "cancel",
  };
  return icons[status] || "help";
};

const getProgressBarClass = (status) => {
  const classes = {
    waiting: "bg-warning",
    pending: "bg-info",
    done: "bg-success",
    cancel: "bg-danger",
  };
  return classes[status] || "bg-secondary";
};

const getProgressPercentage = (status) => {
  const percentages = {
    waiting: 35,
    pending: 50,
    done: 100,
    cancel: 100,
  };
  return percentages[status] || 0;
};

const getStepIconClass = (status, index) => {
  const statusIndex = ["waiting", "pending", "done"].indexOf(status);
  if (status === "cancel") return index === 3 ? "text-danger" : "text-muted";
  return index <= statusIndex ? "text-primary" : "text-muted";
};

const orders = ref([
  {
    id: "PO-652",
    product: "Cà chua - 100KG",
    user: "phh235",
    address: "Dĩ An, Bình Dương",
    billingStatus: "Vận đơn",
    status: "pending",
    date: "05/10/2024",
    price: "150.000",
  },
  {
    id: "PO-655",
    product: "Khoai tây - 100KG",
    user: "phh235",
    address: "Dĩ An, Bình Dương",
    billingStatus: "Vận đơn",
    status: "waiting",
    date: "05/10/2024",
    price: "150.000",
  },
  {
    id: "PO-654",
    product: "Hành tím - 100KG",
    address: "TPHCM",
    user: "phh235",
    billingStatus: "Đã nhận",
    status: "done",
    date: "05/10/2024",
    price: "150.000",
  },
  {
    id: "PO-657",
    product: "Hành lá - 50KG",
    user: "phh235",
    address: "Dĩ An, Bình Dương",
    billingStatus: "Vận đơn",
    status: "cancel",
    date: "05/10/2024",
    price: "150.000",
  },
]);
</script>

<style scoped>
.container {
  max-width: 1300px;
}

.order-card {
  background-color: var(--background-color);
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border-main-color);
}

.order-header {
  padding: 0px 16px;
}

.order-body {
  padding: 6px 16px;
}

.order-user {
  color: var(--nav-link-color);
  font-size: 0.875rem;
}

.order-info {
  font-size: 0.875rem;
  color: var(--nav-link-color);
  display: flex;
  align-items: center;
}

.progress {
  height: 10px;
  margin-bottom: 8px;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.progress-bar {
  border-radius: 100px;
}

.step {
  font-size: 1.25rem;
  color: #ced4da;
}

.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}

.material-symbols-outlined {
  font-size: 1rem;
  vertical-align: middle;
}

.badge .material-symbols-outlined {
  font-size: 0.875rem;
}

.bg-success {
  background-color: var(--primary-color) !important;
}

.bg-danger {
  background-color: #e74c3c !important;
}

.bg-info {
  background-color: #3498db !important;
}

.bg-warning {
  background-color: #f1c40f !important;
}

.text-primary {
  color: var(--primary-color) !important;
}

@media screen and (max-width: 768.98px) {
  .fs {
    font-size: calc(1rem - 2px);
  }

  .order-body {
    padding: 8px;
  }

  .order-info,
  .order-user {
    font-size: 0.75rem;
  }

  .progress-steps .step {
    font-size: 1rem;
  }
}

.tab-container {
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 4px;
  max-width: fit-content;
}

.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: var(--tab-button-text);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}

.tab-button.active {
  background-color: var(--background-color);
  color: var(--nav-link-color);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
</style>
