<template>
  <div class="container-fluid px-5">
    <div class="head mb-4">
      <h2 class="text-center fw-bold" style="color: var(--nav-link-color)">Tạo đơn đặt hàng</h2>
      <h5 class="text-center fw-bold" style="color: var(--nav-link-color)">{{ steps[currentStep] }}</h5>
    </div>

    <div class="row justify-content-center">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-3 p-4">
        <div class="container box-shadow p-4">
          <ul class="nav flex-column nav-pills">
            <li class="nav-item mb-2" v-for="(step, index) in steps" :key="index">
              <a class="nav-link d-flex align-items-center" :class="{ 'active bg-primary': currentStep === index }">
                <span class="material-symbols-outlined me-4" style="color: var(--primary-color);"
                  v-if="currentStep > index">
                  check_circle
                </span>
                <span class="material-symbols-outlined me-4" v-else>
                  {{ getStepIcon(index) }}
                </span>
                {{ step }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main content -->
      <div class="col-md-9 col-lg-6 p-4">
        <!-- Step content with transition -->
        <div class="container box-shadow p-4">
          <div v-if="currentStep === 0">
            <div class="mb-3">
              <label for="vendor" class="form-label">Nhà cung cấp</label>
              <select id="vendor" v-model="formData.vendor" class="form-select">
                <option value="">Chọn nhà cung cấp</option>
              </select>
            </div>
          </div>

          <div v-if="currentStep === 1">
            <div class="mb-3">
              <label for="deliveryDate" class="form-label">Ngày giao hàng dự kiến</label>
              <input type="date" id="deliveryDate" v-model="formData.deliveryDate" class="form-control">
            </div>
          </div>

          <div v-if="currentStep === 2">
            <div class="mb-3">
              <label for="product" class="form-label">Sản phẩm</label>
              <select id="product" v-model="formData.product" class="form-select">
                <option value="" disabled>Chọn sản phẩm</option>
                <option v-for="product in productStore.products" :key="product.sysIdSanPham"
                  :value="product.sysIdSanPham">
                  <img :src="product.hinhAnhUrl" alt="">
                  {{ product.tenSanPham }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="currentStep === 3">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="formData.email" class="form-control">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom p-4 px-5 d-flex justify-content-center align-items-center"
      style="border-top: 2px solid #e4e4e7;">
      <div class="d-flex">
        <button type="button" class="btn btn-secondary me-3 d-flex align-items-center" @click="prevStep"
          :disabled="currentStep === 0">
          <span class="material-symbols-outlined me-2"> chevron_left </span>
          Quay lại
        </button>
        <button type="button" class="btn btn-primary d-flex align-items-center" @click="nextStep"
          v-if="currentStep < steps.length - 1">
          Tiếp theo
          <span class="material-symbols-outlined ms-2"> chevron_right </span>
        </button>
        <button type="button" class="btn btn-primary d-flex align-items-center" @click="submitForm"
          v-if="currentStep === steps.length - 1">
          <span class="material-symbols-outlined me-2">check</span> Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useProductStore } from '@/store/productStore';
import { showToastSuccess, showToastLoading, closeToastLoading } from '@/components/Toast/utils/toastHandle';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
});

const currentStep = ref(0);
const steps = ['Thông tin chung', 'Chi tiết giao hàng', 'Sản phẩm', 'Gửi Email'];

const formData = reactive({
  vendor: '',
  deliveryDate: '',
  product: '',
  email: '',
});

const getStepIcon = (index) => {
  const icons = ['info', 'local_shipping', 'inventory_2', 'email'];
  return icons[index];
};

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const submitForm = async () => {
  showToastLoading("Đang tạo đơn hàng", "Vui lòng đợi trong giây lát");

  setTimeout(() => {
    closeToastLoading();
    showToastSuccess("Đơn hàng đã được tạo");
    currentStep.value = 0;
    // Reset form
    Object.keys(formData).forEach(key => formData[key] = '');
  }, 2000);
};
</script>

<style scoped>
.container {
  border: 1px solid #e4e4e7;
  border-radius: 1rem;
}

.btn {
  padding: .8rem 2.2rem;
  font-size: 1rem;
}

.nav {
  user-select: none;
}

.nav-link {
  color: var(--nav-link-color);
  border-radius: calc(1rem - 2px);
  padding: 12px;
  font-size: 15px;
  transition: none;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.form-label {
  font-weight: bold;
  color: var(--label-color);
}

@media screen and (max-width: 768px) {
  .btn {
    padding: 12px 20px;
    font-size: 0.875rem;
  }
}
</style>
