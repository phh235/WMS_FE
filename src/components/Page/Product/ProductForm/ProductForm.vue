<template>
  <div class="container-fluid">
    <router-link to="/inventory/products" class="btn btn-secondary mb-3 d-flex align-items-center fw-bold"
      style="width: fit-content;">
      <span class="material-symbols-outlined me-2">chevron_left</span> Quay về danh sách
    </router-link>
    <div class="row">
      <div class="col-12 col-md-3 mb-4">
        <div class="block box-shadow">
          <div class="image-upload-container">
            <img v-if="imagePreview" :src="imagePreview" alt="product img front" class="product-image" />
            <div v-else class="placeholder-image">
              <span style="color: var(--nav-link-color);">{{ $t('Product.form.no_image') }}</span>
            </div>
            <input type="file" @change="onFileChange" class="file-input" id="imageUpload" />
            <label for="imageUpload"
              class="upload-button btn btn-primary box-shadow d-flex align-items-center fw-medium"><span
                class="material-symbols-outlined me-2"> upload </span>{{ $t('Product.form.btn_upload') }}
            </label>
            <div class="image-actions" v-if="imagePreview">
              <button class="btn btn-secondary d-flex align-items-center mb-1" @click="replaceImage"><span
                  class="material-symbols-outlined me-2">
                  replace_image </span> {{ $t('Product.form.btn_replace') }}</button>
              <button class="btn btn-danger d-flex align-items-center" @click="deleteImage"><span
                  class="material-symbols-outlined me-2"> delete_sweep
                </span> {{ $t('Product.form.btn_remove') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <div class="block box-shadow p-3">
          <form @submit.prevent="saveProduct">
            <div class="mb-0">
              <div class="row">
                <div class="col-12 col-md-4 mb-3 d-none">
                  <label for="sysIdSanPham" class="form-label">Mã sản phẩm</label>
                  <input type="text" id="sysIdSanPham" class="form-control" v-model="productInfo.sysIdSanPham">
                </div>
                <div class="col-12 col-md-6 mb-3">
                  <label for="tenSanPham" class="form-label">{{ $t('Product.form.product_name') }} <span
                      class="text-danger">*</span></label>
                  <input type="text" id="tenSanPham" class="form-control" v-model="productInfo.tenSanPham" :class="{
                    'is-invalid': !productInfo.tenSanPham && formSubmitted,
                  }" />
                  <div class="invalid-feedback">
                    {{ $t("Product.form.swal.validate.product_name") }}
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="danhMuc" class="form-label">{{ $t('Product.form.category.title') }} <span
                      class="text-danger">*</span></label>
                  <select id="danhMuc" class="form-select" v-model="productInfo.sysIdDanhMuc" :class="{
                    'is-invalid': !productInfo.sysIdDanhMuc && formSubmitted,
                  }">
                    <option value="" selected disabled>{{ $t('Product.form.category.option') }}</option>
                    <option v-for="category in categoryStore.categories" :key="category.sysIdDanhMuc"
                      :value="category.sysIdDanhMuc">
                      {{ category.tenDanhMuc }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ $t("Product.form.swal.validate.choose_category") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 mb-md-0">
              <label for="moTa" class="form-label">{{ $t('Product.form.desc') }}</label>
              <textarea id="moTa" class="form-control" rows="7" v-model="productInfo.moTa"></textarea>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button :disabled="isLoading" type="submit" class="btn btn-primary ms-auto d-flex align-items-center">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                  aria-hidden="true"></span>
                <span v-else class="material-symbols-outlined me-2"> check </span>{{ $t('Product.form.btn_save') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useCategoriesStore } from "@/store/categoryStore.js";
import { useProductStore } from "@/store/productStore.js";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import i18n from "@/lang/i18n";

const { t } = useI18n();
const imagePreview = ref(null);
const isLoading = ref(false);
const apiService = useApiServices();
const categoryStore = useCategoriesStore();
const formSubmitted = ref(false);
const productStore = useProductStore();
const router = useRouter();

const productInfo = reactive({
  sysIdSanPham: "",
  tenSanPham: "",
  moTa: "",
  sysIdDanhMuc: "",
  hinhAnh: null, // Lưu File object trực tiếp
});

const getProductById = async (id) => {
  try {
    const response = await apiService.get(`products/${id}`);
    if (response.status === 200) {
      const product = response.data;
      Object.assign(productInfo, product);
      imagePreview.value = product.hinhAnhUrl; // Hiển thị hình ảnh nếu có
    } else {
      showToastError(t("Product.form.swal.error.product_not_found"));
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

onMounted(async () => {
  await categoryStore.getCategories();
  const { id } = router.currentRoute.value.params; // Lấy ID từ route param
  if (id) {
    await getProductById(id); // Gọi API để lấy chi tiết sản phẩm
  }
});

watch(
  () => productStore.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      Object.assign(productInfo, newProduct);
      imagePreview.value = newProduct.hinhAnhUrl;
    }
  },
  { deep: true }
);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result; // Gắn URL xem trước
    };
    reader.readAsDataURL(file);

    // Lưu File object vào productInfo.hinhAnh để sử dụng trong FormData
    productInfo.hinhAnh = file;
  }
};

const saveProduct = async () => {
  formSubmitted.value = true;
  // Validate form
  if (!productInfo.tenSanPham) {
    showToastError(t("Product.form.swal.validate.product_name"));
    return;
  }
  if (!productInfo.sysIdDanhMuc) {
    showToastError(t("Product.form.swal.validate.choose_category"));
    return;
  }

  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("tenSanPham", productInfo.tenSanPham);
    formData.append("moTa", productInfo.moTa);
    formData.append("sysIdDanhMuc", productInfo.sysIdDanhMuc);

    if (productInfo.hinhAnh) {
      formData.append("hinhAnh", productInfo.hinhAnh); // Lấy File object trực tiếp
    }

    if (productInfo.sysIdSanPham) {
      formData.append("sysIdSanPham", productInfo.sysIdSanPham);
    }

    const response = await apiService.postImage("products", formData);

    if (response.status === 200) {
      showToastSuccess(i18n.global.t("Product.form.swal.success"));
      router.push("/inventory/products");
    } else {
      showToastError("Lưu thất bại");
    }
  } catch (error) {
    console.error("Failed to save product:", error);
    showToastError("Có lỗi xảy ra, vui lòng thử lại!");
  } finally {
    isLoading.value = false;
  }
};

const replaceImage = () => {
  document.getElementById("imageUpload").click();
};

const deleteImage = () => {
  imagePreview.value = null;
  productInfo.hinhAnh = null;
};
</script>

<style scoped>
.container-fluid {
  width: 100%;
}

.card-header {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #d0eddb;
}

.image-upload-container {
  background-color: var(--background-color);
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 1rem;
}

.product-image,
.placeholder-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
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
  cursor: pointer;
}

label {
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--nav-link-color);
}

.block {
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
  min-height: 400px;
}

.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

.image-actions {
  position: absolute;
  top: 35%;
  right: 126px;
  display: none;

  .btn-danger {
    margin-left: 35px;
  }
}

.image-upload-container:hover .image-actions {
  display: block;
}
</style>
