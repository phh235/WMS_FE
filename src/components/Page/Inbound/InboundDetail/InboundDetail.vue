<template>
  <div class="container-fluid border-0 p-0">
    <router-link to="/inventory/purchase-request/outbound"
      class="btn btn-secondary mb-3 d-flex align-items-center fw-bold" style="width: fit-content;">
      <span class="material-symbols-outlined me-2">chevron_left</span> Quay về danh sách
    </router-link>
  </div>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="row p-md-3">
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="maPO" class="form-label">Mã yêu cầu mua hàng <span class="text-danger">*</span></label>
            <input v-model="formData.maPO" type="text" class="form-control" id="maPO" disabled>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="requesterName" class="form-label">Người yêu cầu <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="requesterName" v-model="sysIdUser" disabled />
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="customer" class="form-label">Khách hàng <span class="text-danger">*</span></label>
            <select v-model="selectedCustomer" id="customer" class="form-select">
              <option :value="null" disabled>Chọn khách hàng</option>
              <option v-for="customer in customerStore.customers" :key="customer.sysIdKhachHang" :value="customer">
                {{ customer.tenKhachHang }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="dateDuKien" class="form-label">Ngày xuất hàng dự kiến <span class="text-danger">*</span></label>
            <VueDatePicker v-model="dateDuKien" :enable-time-picker="false" :teleport="true" :format="format" auto-apply
              :auto-position="true" placeholder="Chọn ngày xuất hàng dự kiến">
            </VueDatePicker>
          </div>
        </div>
      </div>

      <div class="table-responsive p-md-3">
        <button type="button" class="btn btn-secondary d-flex align-items-center mb-3 mb-md-2" @click="addProduct"
          style="transition: all 0.2s;">
          <span class="material-symbols-outlined me-2">add</span>Thêm sản phẩm
        </button>
        <div class="d-flex justify-content-between align-items-center mt-5">
          <button :disabled="isLoading" type="submit" class="btn btn-primary d-flex align-items-center">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
            </span>
            <span v-else class="material-symbols-outlined me-2">check</span>{{ isEdit ? 'Cập nhật' : 'Xác nhận' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useProductStore } from "@/store/productStore.js";
import { useCustomerStore } from '@/store/customerStore';
import { useRouter } from "vue-router";
import { useApiServices } from "@/services/apiService.js";
import { showToastSuccess, showToastError, showToastInfo, closeToastLoading, showToastLoading } from "@/utils/Toast/toastHandle";
import VueDatePicker from "@vuepic/vue-datepicker"
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const apiService = useApiServices();
const productStore = useProductStore();
const customerStore = useCustomerStore();
const router = useRouter();
const isLoading = ref(false);
const selectedCustomer = ref(null);
const isEdit = ref(false);
const sysIdUser = ref(JSON.parse(sessionStorage.getItem("user")).fullName);
const dateDuKien = ref();

onMounted(async () => {
  await productStore.getProducts();
  await customerStore.getCustomers();
  const { id } = router.currentRoute.value.params;
  if (id) {
    await getPurchaseRequestOBByID(id);
    isEdit.value = true;
  } else {
    resetFormData();
    isEdit.value = false;
  }
});

// Object purchase request
const formData = reactive({
  maPO: '',
  maKho: '',
  sysIdUser: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
});

const resetFormData = () => {
  formData.maPO = '';
  formData.maKho = '';
  formData.sysIdUser = JSON.parse(sessionStorage.getItem("user")).sysIdUser;
};

// Thêm/chỉnh sửa yêu cầu
const handleSubmit = async () => {
  if (!formData.value) {
    showToastError('Vui lòng chọn kho!');
    return;
  }

  isLoading.value = true;

  try {
    const submitData = {
      maPO: formData.maPO,
      maKho: formData.maKho,
      sysIdUser: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
    };

    const submitDataUpdate = {
      sysIdYeuCauXuatHang: formData.sysIdYeuCauXuatHang,
      maPO: formData.maPO,
      maKho: formData.maKho,
      sysIdUser: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
    };

    showToastLoading(i18n.global.t('PurchaseRequest.table.swal.loading'), 10000);
    const response = isEdit.value
      ? await apiService.post("inbound/create", submitDataUpdate)
      : await apiService.post("inbound/create", submitData);

    if (response.status === 201) {
      closeToastLoading();
      showToastSuccess(`${isEdit.value ? 'Cập nhật' : 'Tạo'} yêu cầu mua hàng thành công!`);
      setTimeout(() => {
        showToastInfo('Đã gửi mail cho phòng Purchase Order');
      }, 2500);
      router.push("/inventory/inbound");
    } else {
      showToastError('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  } catch (error) {
    console.error('Error submitting purchase request:', error);
    showToastError('Vui lòng nhập đầy đủ thông tin sản phẩm yêu cầu');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
}

.form-label {
  font-weight: bold;
  color: var(--label-color);
}

.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

.btn-danger {
  padding: 10px;
}

.td-product,
.td-date {
  width: 270px;
}

.td-action {
  width: 100px;
}

.td-quantity,
.td-price {
  width: 160px;
}
</style>
