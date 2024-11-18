<template>
  <div class="container-fluid border-0 p-0">
    <router-link to="/inventory/purchase-request/inbound"
      class="btn btn-secondary mb-3 d-flex align-items-center fw-bold" style="width: fit-content;">
      <span class="material-symbols-outlined me-2">chevron_left</span> Quay về danh sách
    </router-link>
  </div>
  <div class="container-fluid box-shadow p-3 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="row p-md-3">
        <div class="col-12 col-md-2">
          <div class="mb-3 mb-md-0">
            <label for="maPR" class="form-label">Mã yêu cầu mua hàng <span class="text-danger">*</span></label>
            <input v-model="formData.maPR" type="text" class="form-control" id="maPR" disabled>
          </div>
        </div>
        <div class="col-12 col-md-2">
          <div class="mb-3 mb-md-0">
            <label for="requesterName" class="form-label">Người yêu cầu <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="requesterName" v-model="nguoiYeuCau" disabled />
          </div>
        </div>
        <div class="col-12 col-md-2">
          <div class="mb-3 mb-md-0">
            <label for="dateDuKien" class="form-label">Ngày nhập hàng dự kiến <span class="text-danger">*</span></label>
            <VueDatePicker v-model="dateDuKien" :enable-time-picker="false" :teleport="true" :format="format" auto-apply
              :auto-position="true" placeholder="Chọn ngày nhập dự kiến">
            </VueDatePicker>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="supplier" class="form-label">Nhà cung cấp <span class="text-danger">*</span></label>
            <select v-model="selectedSupplier" id="supplier" class="form-select">
              <option value="" disabled>Chọn nhà cung cấp</option>
              <option v-for="supplier in supplierStore.suppliers" :key="supplier.sysIdNhaCungCap" :value="supplier">
                {{ supplier.tenNhaCungCap }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="mb-3 mb-md-0">
            <label for="customer" class="form-label">Khách hàng <span class="text-danger">*</span></label>
            <select v-model="selectedCustomer" id="customer" class="form-select">
              <option value="" disabled>Chọn khách hàng</option>
              <option v-for="customer in customerStore.customers" :key="customer.sysIdKhachHang" :value="customer">
                {{ customer.tenKhachHang }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-responsive p-md-3">
        <button type="button" class="btn btn-secondary d-flex align-items-center mb-3 mb-md-2" @click="addProduct"
          style="transition: all 0.2s;">
          <span class="material-symbols-outlined me-2">add</span>Thêm sản phẩm
        </button>
        <table class="table">
          <thead>
            <tr>
              <th class="td-product text-center">Sản phẩm</th>
              <th class="td-quantity text-center">Số lượng (Kg)</th>
              <th class="td-price text-center">Giá (đ)</th>
              <th class="text-center td-action">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="formData.chiTietNhapHang.length === 0">
              <td colspan="10" class="text-center">Chưa có sản phẩm</td>
            </tr>
            <tr v-for="(product, index) in formData.chiTietNhapHang" :key="index">
              <td class="d-none">{{ product.sysIdChiTietNhapHang }}</td>
              <td class="td-product">
                <select v-model="product.sysIdSanPham" class="form-select">
                  <option value="" disabled>Chọn sản phẩm</option>
                  <option v-for="prod in productStore.products" :key="prod.sysIdSanPham" :value="prod.sysIdSanPham">
                    {{ prod.tenSanPham }}
                  </option>
                </select>
              </td>
              <td class="td-quantity">
                <input v-model.number="product.soLuong" type="text" class="form-control" />
              </td>
              <td class="td-price">
                <input v-model.number="product.gia" type="text" class="form-control" />
              </td>
              <td class="td-action">
                <div class="d-flex align-items-center justify-content-center">
                  <button type="button" class="btn btn-danger  d-flex justify-content-center align-items-center"
                    @click="removeProduct(index)">
                    <span class="material-symbols-outlined">delete_sweep</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-center mt-5">
          <button :disabled="isLoading" type="submit" class="btn btn-primary d-flex align-items-center">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
            </span>
            <span v-else class="material-symbols-outlined me-2">check</span>{{ isEdit ? 'Cập nhật' : 'Xác nhận' }}
          </button>
          <h5 class="fw-bold" style="color: var(--label-color);">
            Tổng tiền: <span style="color: var(--primary-color);">{{ totalCost.toLocaleString() }} đ</span>
          </h5>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useProductStore } from "@/store/productStore.js";
import { useCustomerStore } from '@/store/customerStore';
import { useSupplierStore } from '@/store/supplierStore';
import { useRouter } from "vue-router";
import { useApiServices } from "@/services/apiService.js";
import { showToastSuccess, showToastError, showToastInfo, closeToastLoading, showToastLoading } from "@/components/Toast/utils/toastHandle";
import VueDatePicker from "@vuepic/vue-datepicker"
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const apiService = useApiServices();
const productStore = useProductStore();
const customerStore = useCustomerStore();
const supplierStore = useSupplierStore();
const router = useRouter();
const isLoading = ref(false);
const selectedCustomer = ref(null);
const selectedSupplier = ref(null);
const isEdit = ref(false);
const nguoiYeuCau = ref(JSON.parse(sessionStorage.getItem("user")).fullName);
const dateDuKien = ref();

onMounted(async () => {
  await productStore.getProducts();
  await customerStore.getCustomers();
  await supplierStore.getSuppliers();
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
  maPR: '',
  nguoiYeuCau: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
  loaiYeuCau: 'NHAP',
  chiTietNhapHang: []
});

const resetFormData = () => {
  formData.maPR = '';
  formData.nguoiYeuCau = JSON.parse(sessionStorage.getItem("user")).sysIdUser;
  formData.loaiYeuCau = 'NHAP';
  formData.chiTietNhapHang = [];
};

// format date của VueDatePicker
const format = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Chuyển đổi kiểu ngày là String sang kiểu Date (dd/MM/yyyy)
const parseDateString = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day); // month - 1 vì tháng trong Date bắt đầu từ 0
};

// Lấy thông tin yêu cầu xuất hàng theo mã yêu cầu
const getPurchaseRequestOBByID = async (id) => {
  try {
    const response = await apiService.get(`purchase-requests/${id}`);
    if (response.status) {
      const purchase = response.data[0];
      Object.assign(formData, purchase);
      // Gán giá trị cho chiTietXuatHang bao gồm sysIdKhachHang và các giá trị khác
      formData.chiTietNhapHang = purchase.chiTietNhapHang.map((product) => ({
        sysIdChiTietNhapHang: product.sysIdChiTietNhapHang,
        sysIdSanPham: product.sysIdSanPham,
        sysIdKhachHang: product.sysIdKhachHang,
        sysIdNhaCungCap: product.sysIdNhaCungCap,
        soLuong: product.soLuong,
        gia: product.gia,
        ngayNhapDuKien: product.ngayNhapDuKien,
      }));

      dateDuKien.value = parseDateString(formData.chiTietNhapHang[0].ngayNhapDuKien);

      selectedSupplier.value = supplierStore.suppliers.find(
        (s) => s.sysIdNhaCungCap === formData.chiTietNhapHang[0].sysIdNhaCungCap
      );
      console.log(selectedSupplier.value);

      selectedCustomer.value = customerStore.customers.find(
        (c) => c.sysIdKhachHang === formData.chiTietNhapHang[0].sysIdKhachHang
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Thêm 1 dòng mới trong table (push)
const addProduct = () => {
  formData.chiTietNhapHang.push({
    sysIdSanPham: '',
    sysIdKhachHang: '',
    sysIdNhaCungCap: '',
    soLuong: 0,
    gia: 0,
    ngayNhapDuKien: ''
  });
};

// Xóa hàng vừa thêm vào bảng từ addProduct
const removeProduct = (index) => {
  formData.chiTietNhapHang.splice(index, 1);
};

// Tính tổng tiền = giá * số lượng
const totalCost = computed(() => {
  return formData.chiTietNhapHang.reduce((total, product) => {
    return total + (product.soLuong * product.gia);
  }, 0);
});

// Thêm/chỉnh sửa yêu cầu
const handleSubmit = async () => {
  if (!dateDuKien.value) {
    showToastError('Vui lòng chọn ngày nhập dự kiến!');
    return;
  }

  if (!selectedSupplier.value) {
    showToastError('Vui lòng chọn nhà cung cấp!');
    return;
  }

  if (!selectedCustomer.value) {
    showToastError('Vui lòng chọn khách hàng!');
    return;
  }

  if (formData.chiTietNhapHang.length === 0) {
    showToastError('Vui lòng thêm sản phẩm!');
    return;
  }

  isLoading.value = true;

  try {
    const submitData = {
      maPR: formData.maPR,
      nguoiYeuCau: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
      loaiYeuCau: 'NHAP',
      chiTietNhapHang: formData.chiTietNhapHang.map(product => ({
        soLuong: product.soLuong,
        gia: product.gia,
        tongChiPhi: product.soLuong * product.gia,
        sysIdSanPham: product.sysIdSanPham,
        sysIdKhachHang: selectedCustomer.value.sysIdKhachHang,
        sysIdNhaCungCap: selectedSupplier.value.sysIdNhaCungCap,
        ngayNhapDuKien: format(dateDuKien.value)
      }))
    };

    const submitDataUpdate = {
      sysIdYeuCauNhapHang: formData.sysIdYeuCauNhapHang,
      maPR: formData.maPR,
      nguoiYeuCau: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
      trangThai: 'open',
      loaiYeuCau: 'NHAP',
      chiTietNhapHang: formData.chiTietNhapHang.map(product => ({
        sysIdChiTietNhapHang: product.sysIdChiTietNhapHang,
        maPR: formData.maPR, // fix tạm
        sysIdSanPham: product.sysIdSanPham,
        sysIdKhachHang: selectedCustomer.value.sysIdKhachHang,
        sysIdNhaCungCap: selectedSupplier.value.sysIdNhaCungCap,
        soLuong: product.soLuong,
        gia: product.gia,
        tongChiPhi: product.soLuong * product.gia,
        ngayNhapDuKien: format(dateDuKien.value)
      }))
    };

    showToastLoading(i18n.global.t('PurchaseRequest.table.swal.loading'), 10000);
    const response = isEdit.value
      ? await apiService.post("purchase-requests/save", submitDataUpdate)
      : await apiService.post("purchase-requests/save", submitData);

    if (response.status === 201) {
      closeToastLoading();
      showToastSuccess(`${isEdit.value ? 'Cập nhật' : 'Tạo'} yêu cầu mua hàng thành công!`);
      setTimeout(() => {
        showToastInfo('Đã gửi mail cho phòng Purchase Order');
      }, 2500);
      router.push("/inventory/purchase-request/inbound");
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
