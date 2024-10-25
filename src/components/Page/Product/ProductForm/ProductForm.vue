<template>
  <div class="container px-4">
    <div class="row">
      <div class="col-12 col-md-3 mb-4">
        <div class="block box-shadow">
          <div class="image-upload-container">
            <img v-if="imagePreview" :src="imagePreview" alt="product img front" class="product-image" />
            <div v-else class="placeholder-image">
              <span style="color: var(--nav-link-color);">{{ $t('Product.form.no_image') }}</span>
            </div>
            <input type="file" @change="onFileChange" class="file-input" id="imageUpload" />
            <label for="imageUpload" class="upload-button btn btn-primary d-flex align-items-center fw-medium"><span
                class="material-symbols-outlined me-2"> upload </span>{{ $t('Product.form.btn_upload') }}
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <div class="block box-shadow p-3">
          <form @submit.prevent="saveProduct">
            <div class="mb-0">
              <div class="row">
                <div class="col-12 col-md-4 mb-3 d-none">
                  <label for="sysIdSanPham">Mã sản phẩm</label>
                  <input type="text" id="sysIdSanPham" class="form-control" v-model="productInfo.sysIdSanPham" />
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label for="tenSanPham">{{ $t('Product.form.product_name') }} <span
                      class="text-danger">*</span></label>
                  <input type="text" id="tenSanPham" class="form-control" v-model="productInfo.tenSanPham" />
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <label for="soLuongHienCo">{{ $t('Product.form.available_quantity') }} <span
                      class="text-danger">*</span></label>
                  <input type="text" id="soLuongHienCo" class="form-control" v-model="productInfo.soLuongHienCo" />
                </div>
                <div class="col-12 col-md-4">
                  <label for="danhMuc">{{ $t('Product.form.category.title') }} <span
                      class="text-danger">*</span></label>
                  <select id="danhMuc" class="form-select mb-3" v-model="productInfo.sysIdDanhMuc">
                    <option value="" selected disabled>{{ $t('Product.form.category.option') }}</option>
                    <option v-for="category in categoryStore.categories" :key="category.sysIdDanhMuc"
                      :value="category.sysIdDanhMuc">
                      {{ category.tenDanhMuc }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-0">
              <label for="moTa">{{ $t('Product.form.desc') }}</label>
              <textarea id="moTa" class="form-control" rows="4" v-model="productInfo.moTa"></textarea>
            </div>
            <div class="d-flex justify-content-end mt-3">
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
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import i18n from "@/lang/i18n";

const { t } = useI18n();
const imagePreview = ref(null);
const isLoading = ref(false);
const apiStore = useApiServices();
const categoryStore = useCategoriesStore();
const productStore = useProductStore();
const router = useRouter();

const productInfo = reactive({
  sysIdSanPham: "",
  tenSanPham: "",
  soLuongHienCo: "",
  moTa: "",
  sysIdDanhMuc: "",
  hinhAnh: "",
});

const getProductById = async (id) => {
  try {
    const response = await apiStore.get(`products/${id}`);
    if (response.status === 200) {
      const product = response.data;
      Object.assign(productInfo, product);
      imagePreview.value = product.hinhAnhUrl; // Hiển thị hình ảnh nếu có
    } else {
      // showToastError(t("Product.form.swal.error.product_not_found"));
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

watch(() => productStore.selectedProduct, (newProduct) => {
  if (newProduct) {
    Object.assign(productInfo, newProduct);
    imagePreview.value = newProduct.hinhAnhUrl;
  }
}, { deep: true });

const saveProduct = async () => {
  // Validate form
  if (!productInfo.tenSanPham) {
    showToastError(i18n.global.t("Product.form.swal.validate.product_name"));
    return;
  }
  if (!productInfo.soLuongHienCo) {
    showToastError(i18n.global.t("Product.form.swal.validate.available_quantity"));
    return;
  }
  if (!productInfo.sysIdDanhMuc) {
    showToastError(i18n.global.t("Product.form.swal.validate.choose_category"));
    return;
  }

  // Kiểm tra số lượng hiện có phải là số
  if (isNaN(productInfo.soLuongHienCo)) {
    showToastError(i18n.global.t("Product.form.swal.validate.available_quantity_number"));
    return;
  }
  // Kiểm tra xem đã chọn ảnh hay chưa
  if (!imagePreview.value) {
    showToastError(i18n.global.t("Product.form.swal.validate.image"));
    return;
  }
  isLoading.value = true;
  try {
    const formData = new FormData();

    formData.append("tenSanPham", productInfo.tenSanPham);
    formData.append("soLuongHienCo", productInfo.soLuongHienCo);
    formData.append("moTa", productInfo.moTa);
    formData.append("sysIdDanhMuc", productInfo.sysIdDanhMuc);

    if (imagePreview.value) {
      const file = await fetch(imagePreview.value, { mode: 'no-cors' }).then((res) => res.blob());
      formData.append("hinhAnh", file, productInfo.hinhAnh.name);
    }

    if (productInfo.sysIdSanPham) {
      formData.append("sysIdSanPham", productInfo.sysIdSanPham);
    }
    const response = await apiStore.postImage("products", formData);

    if (response.status === 200) {
      showToastSuccess(i18n.global.t("Product.form.swal.success"));
      router.push("/inventory/san-pham");
    } else {
      showToastError("Lưu thất bại");
    }
  } catch (error) {
    console.error("Failed to save products:", error);
    showToastError("Có lỗi xảy ra khi lưu sản phẩm");
  } finally {
    isLoading.value = false;
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

const { params } = router.currentRoute.value;
console.log(params?.id);
</script>

<style scoped>
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
  height: 300px;
  overflow: hidden;
  border-radius: 1rem;
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
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--nav-link-color);
}

.block {
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
