<template>
  <div class="container mb-3">
    <div class="d-flex align-items-center">
      <router-link to="/inventory/yeu-cau-mua-hang" class="btn btn-secondary d-flex align-items-center"
        style="width: fit-content;">
        <span class="material-symbols-outlined me-2">chevron_left</span> Danh sách yêu cầu
      </router-link>
    </div>
  </div>
  <div class="container-fluid box-shadow p-4 mx-auto">
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <div class="row">
          <div class="col-md-4 mb-4 d-flex align-items-stretch">
            <div class="box-shadow block p-3 flex-fill">
              <div class="mb-3">
                <label for="requester" class="form-label">Mã yêu cầu mua hàng</label>
                <input type="text" class="form-control" id="requester" />
              </div>
              <div class="mb-3">
                <label for="requesterName" class="form-label">Người yêu cầu</label>
                <input type="text" class="form-control" id="requesterName" value="phh235" disabled />
              </div>
            </div>
          </div>
          <div class="col-md-8 mb-4 d-flex align-items-stretch">
            <div class="box-shadow block p-3 flex-fill">
              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <label for="customer" class="form-label">Khách hàng</label>
                  <select id="customer" class="form-select">
                    <option value="" selected>Chọn khách hàng</option>
                  </select>
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <div class="d-flex justify-content-between">
                    <label for="product" class="form-label">Sản phẩm</label>
                    <button type="button" class="btn-add d-flex align-items-center" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" style="font-size: 13px;">
                      <span class="material-symbols-outlined me-2">add</span> Thêm sản phẩm
                    </button>
                  </div>
                  <select id="product" class="form-select">
                    <option value="" disabled>Chọn sản phẩm</option>
                    <option v-for="product in productStore.products" :key="product.sysIdSanPham"
                      :value="product.sysIdSanPham">
                      {{ product.tenSanPham }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label for="quantity" class="form-label">Số lượng</label>
                  <input type="text" class="form-control" id="quantity" />
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label for="price" class="form-label">Giá</label>
                  <input type="text" class="form-control" id="price" />
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label for="entryDate" class="form-label">Ngày nhập hàng dự kiến</label>
                  <input type="date" class="form-control" id="entryDate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4 footer-section">
        <button type="submit" class="btn btn-primary d-flex align-items-center">
          <span class="material-symbols-outlined me-2">check</span> Xác nhận
        </button>
        <h5 class="fw-bold">Tổng tiền: 9999 đ</h5>
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
import { onMounted } from 'vue';
import { useProductStore } from "@/store/productStore.js";
import ProductForm from '../../Product/ProductForm/ProductForm.vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
});
</script>

<style scoped>
.block {
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

.container-fluid {
  max-width: 1200px;
  border: 1px solid #e4e4e7;
  border-radius: 16px;
}

.form-label {
  font-weight: bold;
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

.btn-add {
  border: none;
  background-color: transparent;
  font-weight: bold;
  transition: all .2s;

  &:hover {
    color: var(--primary-color);
  }
}
</style>
