<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card">
        <div class="image-upload-container">
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="product img front"
            class="product-image"
          />
          <div v-else class="placeholder-image">
            <span>Chưa có ảnh</span>
          </div>
          <input
            type="file"
            @change="onFileChange"
            accept="image/*"
            class="file-input"
            id="imageUpload"
          />
          <label for="imageUpload" class="upload-button btn btn-primary"
            >Chọn ảnh từ máy tính</label
          >
        </div>
        <div class="card-body">
          <h5 class="card-title">cocoonvietnam</h5>
          <p class="card-text">
            Sản phẩm treatment dành cho tóc, phù hợp với tình trạng tóc rụng, tóc yếu, tóc thưa
            mỏng. Sản phẩm có thành phần từ tinh dầu bưởi Việt Nam truyền thống, Xylishine, Vitamin
            B5, Baicapil và Bisabolol.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="block p-4">
        <div class="card">
          <!-- Header -->
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Danh Mục Sản Phẩm</span>
          </div>
          <!-- Card body with 4 small boxes -->
          <div class="card-body">
            <div class="row">
              <!-- First box -->
              <div class="col-6 col-md-3">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action"> Điện Thoại </a>
                </div>
              </div>
              <!-- Second box -->
              <div class="col-6 col-md-3">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action"> Quần Áo </a>
                </div>
              </div>
              <!-- Third box -->
              <div class="col-6 col-md-3">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action"> Gia Dụng </a>
                </div>
              </div>
              <!-- Fourth box -->
              <div class="col-6 col-md-3">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action"> Thực Phẩm </a>
                </div>
              </div>
              <div class="col-6 col-md-3 mt-2">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action"> Điện Tử </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- product-details -->
        <div class="card mt-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Chi Tiết Sản Phẩm</span>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Product Name -->
              <div class="col-6 col-md-6">
                <div class="form-group">
                  <label for="tenSanPham" class="form-label fw-bold">Tên sản phẩm</label>
                  <input type="text" class="form-control" id="tenSanPham" />
                </div>
              </div>
              <!-- Product Branch -->
              <div class="col-6 col-md-6">
                <div class="form-group">
                  <label for="maSku" class="form-label fw-bold">Mã Sku</label>
                  <input type="text" class="form-control" id="maSku" />
                </div>
              </div>
              <!-- Product Branch -->
              <div class="col-6 col-md-4 mt-3">
                <div class="form-group">
                  <label for="soLuongHienCo" class="form-label fw-bold">Số lượng hiện có</label>
                  <input type="text" class="form-control" id="soLuongHienCo" />
                </div>
              </div>
              <!-- Product Branch -->
              <div class="col-6 col-md-4 mt-3">
                <div class="form-group">
                  <label for="chiPhi" class="form-label fw-bold">Chi phí</label>
                  <input type="text" class="form-control" id="chiPhi" />
                </div>
              </div>
              <div class="col-6 col-md-4 mt-3">
                <div class="form-group">
                  <label for="giaBan" class="form-label fw-bold">Giá bán</label>
                  <input type="text" class="form-control" id="giaBan" />
                </div>
              </div>
              <div class="col-6 col-md-4 mt-3">
                <div class="form-group">
                  <label for="exampleFormControlTextarea1" class="form-label fw-bold">Mô tả</label>
                  <textarea class="form-control" id="moTa" rows="3"></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-primary ms-auto" type="submit">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imagePreview = ref(null);
const productName = ref("");
const productDescription = ref("");
const selectedCategory = ref(null);
const categories = ref(["Điện Thoại", "Quần Áo", "Gia Dụng", "Thực Phẩm", "Điện Tử"]);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const selectCategory = (category) => {
  selectedCategory.value = category;
};
</script>

<style scoped>
.card-header {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #97bec6;
}

.image-upload-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.product-image,
.placeholder-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.placeholder-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #666;
}

.file-input {
  display: none;
}

.upload-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.card-body {
  text-align: center;
}

.card-title {
  margin-top: 10px;
}

.form-group {
  text-align: left;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 15px;
  border-radius: 8px;
  /* border: 2px solid var(--secondary-color); */
  border: 2px solid #dcdcdc !important;
  transition: all 0.2s;
  &:focus,
  &:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border: 2px solid var(--border-input-color) !important;
  }
}

.nav-link.active {
  background-color: var(--primary-color);
}
.nav-link:hover {
  background-color: var(--primary-color);
}

.list-group-item:focus {
  border: 2px solid var(--primary-color);
}

.block {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}
</style>
