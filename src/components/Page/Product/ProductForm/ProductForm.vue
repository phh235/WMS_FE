<template>
  <div class="container px-4">
    <div class="row">
      <div class="col-12 col-md-3 mb-4">
        <div class="card box-shadow" style="border-radius: 16px; border: 1px solid #e4e4e7">
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
            <input type="file" @change="onFileChange" class="file-input" id="imageUpload" />
            <label
              for="imageUpload"
              class="upload-button btn btn-primary d-flex align-items-center fw-medium"
              ><span class="material-symbols-outlined me-2"> upload </span>Chọn ảnh
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <div class="block box-shadow p-4">
          <div class="mb-3">
            <div class="row">
              <div class="col-12 col-md-4 mb-3 d-none">
                <label for="sysIdSanPham">Mã sản phẩm</label>
                <input
                  type="text"
                  id="sysIdSanPham"
                  class="form-control"
                  v-model="productInfo.sysIdSanPham"
                />
              </div>
              <div class="col-12 col-md-4 mb-3">
                <label for="tenSanPham">Tên sản phẩm</label>
                <input
                  type="text"
                  id="tenSanPham"
                  class="form-control"
                  v-model="productInfo.tenSanPham"
                />
              </div>
              <div class="col-12 col-md-4 mb-3">
                <label for="soLuongHienCo">Số lượng hiện có</label>
                <input
                  type="text"
                  id="soLuongHienCo"
                  class="form-control"
                  v-model="productInfo.soLuongHienCo"
                />
              </div>
              <div class="col-12 col-md-4">
                <label for="danhMuc">Danh mục</label>
                <select id="danhMuc" class="form-select mb-3" v-model="productInfo.sysIdDanhMuc">
                  <option value="" selected disabled>Chọn danh mục</option>
                  <option
                    v-for="category in categoryStore.categories"
                    :key="category.sysIdDanhMuc"
                    :value="category.sysIdDanhMuc"
                  >
                    {{ category.tenDanhMuc }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="moTa">Mô tả</label>
            <textarea id="moTa" class="form-control" rows="4" v-model="productInfo.moTa"></textarea>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary ms-auto d-flex align-items-center" @click="saveProduct">
              <span class="material-symbols-outlined me-2"> check </span>Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import { useRouter } from "vue-router";

const imagePreview = ref(null);
const apiStore = useApiStore();
const categoryStore = useCategoriesStore();
const router = useRouter();

const productInfo = reactive({
  tenSanPham: "",
  soLuongHienCo: "",
  moTa: "",
  sysIdDanhMuc: "",
  hinhAnh: "",
});

onMounted(() => {
  fetchCategories();
});

const fetchCategories = async () => {
  await categoryStore.getCategories();
};

const saveProduct = async () => {
  // Validate form
  if (!productInfo.tenSanPham) {
    showToastError("Tên sản phẩm không được để trống.");
    return;
  }
  if (!productInfo.soLuongHienCo) {
    showToastError("Số lượng không được để trống.");
    return;
  }
  if (!productInfo.sysIdDanhMuc) {
    showToastError("Vui lòng chọn danh mục.");
    return;
  }
  if (!productInfo.moTa) {
    showToastError("Mô tả không được để trống.");
    return;
  }
  // Kiểm tra số lượng hiện có phải là số
  if (isNaN(productInfo.soLuongHienCo)) {
    showToastError("Số lượng hiện có phải là một số.");
    return;
  }
  // Kiểm tra xem đã chọn ảnh hay chưa
  if (!imagePreview.value) {
    showToastError("Vui lòng chọn ảnh sản phẩm.");
    return;
  }
  try {
    const formData = new FormData();

    formData.append("tenSanPham", productInfo.tenSanPham);
    formData.append("soLuongHienCo", productInfo.soLuongHienCo);
    formData.append("moTa", productInfo.moTa);
    formData.append("sysIdDanhMuc", productInfo.sysIdDanhMuc);

    if (imagePreview.value) {
      const file = await fetch(imagePreview.value).then((res) => res.blob());
      formData.append("hinhAnh", file, productInfo.hinhAnh.name);
    }

    const response = await apiStore.postImage("products", formData);

    if (response.status === 200) {
      showToastSuccess("Lưu thành công");
      setTimeout(() => {
        router.push("/inventory/san-pham");
      }, 1900);
    } else {
      showToastError("Lưu thất bại");
    }
  } catch (error) {
    console.error("Failed to save products:", error);
    showToastError("Có lỗi xảy ra khi lưu sản phẩm");
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    // Lưu tên tệp vào productInfo
    productInfo.hinhAnh = file.name; // Lưu tên tệp
  }
};
</script>

<style scoped>
.card-header {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #d0eddb;
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
  border-radius: 16px;
}

.placeholder-image {
  display: flex;
  justify-content: center;
  align-items: center;
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

label {
  font-size: 14px;
  font-weight: bold;
}

.block {
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}
</style>
