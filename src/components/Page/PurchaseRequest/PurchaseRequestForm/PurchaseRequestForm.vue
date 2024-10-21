<template>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="row p-md-3">
        <div class="col-12 col-md-4">
          <div class="mb-3">
            <label for="maPR" class="form-label">Mã yêu cầu mua hàng</label>
            <input v-model="formData.maPR" type="text" class="form-control" id="maPR" />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="mb-3">
            <label for="requesterName" class="form-label">Người yêu cầu</label>
            <input type="text" class="form-control" id="requesterName" value="phh235" disabled />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="mb-3">
            <label for="customer" class="form-label">Khách hàng</label>
            <select v-model="selectedCustomer" id="customer" class="form-select">
              <option value="" disabled>Chọn khách hàng</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer">
                {{ customer.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-responsive p-md-3">
        <button type="button" class="btn btn-secondary d-flex align-items-center" @click="addProduct"
          style="transition: all 0.2s;">
          <span class="material-symbols-outlined me-2">add</span>Thêm sản phẩm
        </button>
        <table class="table">
          <thead>
            <tr>
              <th class="td-product">Sản phẩm</th>
              <th class="td-quantity">Số lượng</th>
              <th class="td-price">Giá</th>
              <th class="td-date">Ngày nhập hàng dự kiến</th>
              <th class="text-center td-action">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="formData.chiTietDonHang.length === 0">
              <td colspan="10" class="text-center">Chưa có sản phẩm</td>
            </tr>
            <tr v-for="(product, index) in formData.chiTietDonHang" :key="index">
              <td class="td-product">
                <select v-model="product.sysIdSanPham" class="form-select">
                  <option value="" disabled>Chọn sản phẩm</option>
                  <option v-for="prod in productStore.products" :key="prod.sysIdSanPham" :value="prod.sysIdSanPham">
                    {{ prod.tenSanPham }}
                  </option>
                </select>
              </td>
              <td class="td-quantity">
                <input v-model.number="product.soLuong" type="number" class="form-control" min="0" />
              </td>
              <td class="td-price">
                <input v-model.number="product.gia" type="number" class="form-control" min="0" />
              </td>
              <td>
                <input v-model="product.ngayNhap" type="date" class="form-control" />
              </td>
              <td class="td-action">
                <div class="d-flex align-items-center justify-content-center"><button type="button"
                    class="btn btn-danger  d-flex justify-content-center align-items-center"
                    @click="removeProduct(index)">
                    <span class="material-symbols-outlined">delete_sweep</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <button :disabled="isLoading" type="submit" class="btn btn-primary d-flex align-items-center">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
              aria-hidden="true"></span>
            <span v-else class="material-symbols-outlined me-2">check</span>
            Xác nhận
          </button>
          <h5 class="fw-bold" style="color: var(--label-color);">Tổng tiền: <span
              style="color: var(--primary-color);">{{ totalCost.toLocaleString() }}
              đ</span></h5>
        </div>
      </div>
    </form>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useProductStore } from "@/store/productStore.js";
import { useRouter } from "vue-router";
import ProductForm from '../../Product/ProductForm/ProductForm.vue';
import { useApiServices } from "@/services/apiService.js";
import { showToastSuccess, showToastError, showToastInfo } from "@components/Toast/utils/toastHandle.js";

const apiStore = useApiServices();
const productStore = useProductStore();
const router = useRouter();
const isLoading = ref(false);
const selectedCustomer = ref(null);

onMounted(async () => {
  await productStore.getProducts();
});

const formData = reactive({
  maPR: '',
  ngayYeuCau: '',
  nguoiYeuCau: 1,
  trangThai: 'DANG_XU_LY',
  chiTietDonHang: []
});

const customers = ref([
  { id: 1, name: 'Nguyễn Văn A' },
  { id: 2, name: 'Trần Thị B' },
  { id: 3, name: 'Trần Thị C' },
]);

const addProduct = () => {
  formData.chiTietDonHang.push({
    sysIdSanPham: '',
    sysIdKhachHang: '',
    soLuong: 0,
    gia: 0,
    ngayNhap: ''
  });
};

const removeProduct = (index) => {
  formData.chiTietDonHang.splice(index, 1);
};

const totalCost = computed(() => {
  return formData.chiTietDonHang.reduce((total, product) => {
    return total + (product.soLuong * product.gia);
  }, 0);
});

const formatDate = (date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const handleSubmit = async () => {
  if (formData.maPR.trim() === '') {
    showToastError('Mã yêu cầu không được để trống!');
    return;
  }
  if (!selectedCustomer.value) {
    showToastError('Vui lòng chọn khách hàng!');
    return;
  }
  if (formData.chiTietDonHang.length === 0) {
    showToastError('Vui lòng thêm sản phẩm!');
    return
  }
  isLoading.value = true;
  const submitData = {
    maPR: formData.maPR,
    nguoiYeuCau: 1,
    chiTietDonHang: formData.chiTietDonHang.map(product => ({
      soLuong: product.soLuong,
      gia: product.gia,
      tongChiPhi: product.soLuong * product.gia,
      ngayNhap: formatDate(product.ngayNhap),
      sysIdSanPham: product.sysIdSanPham,
      sysIdKhachHang: selectedCustomer.value.id
    }))
  };

  try {
    let response;
    response = await apiStore.post("purchase-requests/save", submitData);
    showToastSuccess('Tạo yêu cầu mua hàng thành công!');
    setTimeout(() => {
      showToastInfo('Đã gửi mail cho phòng Purchase Order');
    }, 2000);
    router.push("/inventory/yeu-cau-mua-hang");
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
  max-width: 1200px;
  border: 1px solid var(--border-main-color);
  border-radius: 16px;
}

.form-label {
  font-weight: bold;
  color: var(--label-color);
}

input[type='date'] {
  position: relative;
}

input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
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
  width: 300px;
}

.td-action {
  width: 100px;
}

.td-quantity,
.td-price {
  width: 160px;
}
</style>
