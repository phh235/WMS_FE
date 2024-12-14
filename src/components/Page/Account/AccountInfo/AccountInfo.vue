<template>
  <!-- Khung chứa chính -->
  <div class="container">
    <div class="row flex-column flex-md-row">
      <!-- Phần hiển thị thông tin ảnh đại diện -->
      <div class="col-12 col-md-4 order-md-2 mb-md-0 mb-4">
        <div class="card box-shadow">
          <div class="card-body text-center">
            <div class="d-flex justify-content-center mb-3 position-relative">
              <div style="width: 278px; height: 278px;">
                <img :src="avatarUrl" alt="Avatar" class="rounded-4 img-fluid mb-3" loading="lazy"
                  style="object-fit: cover; object-position: center; width: 100%; height: 100%;" />
                <button @click="openFileInput"
                  class="btn btn-secondary position-absolute bottom-0 m-2 d-flex align-items-center"
                  style="padding: 10px 10px;">
                  <span class="material-symbols-outlined">photo_camera</span>
                </button>
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="d-none" />
              </div>
            </div>
            <h4 class="fw-bold" style="color: var(--label-color);">{{ userStore.user.fullName }}</h4>
            <div class="d-flex justify-content-center">
              <span class="badge py-2 px-3"
                style="background-color: var(--bg-success) !important; border-radius: 10px; color: var(--primary-color) !important; font-size: 0.875rem !important;">
                {{ userStore.user.role }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Phần thông tin cơ bản -->
      <div class="col-12 col-md-8 order-md-1 mb-md-0">
        <BasicInfo />
      </div>

      <!-- Phần thay đổi mật khẩu -->
      <div class="col-12 order-md-3 mb-5">
        <ChangePassword />
      </div>
    </div>

    <!-- Modal xem trước ảnh đại diện -->
    <div v-if="showPreviewModal" class="modal" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Tiêu đề của modal -->
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Xem trước ảnh đại diện</h5>
            <span class="material-symbols-outlined custom-close" @click="closePreviewModal">close</span>
          </div>
          <!-- Hiển thị ảnh xem trước -->
          <div class="modal-body d-flex justify-content-center">
            <img :src="previewUrl" alt="Preview" class="img-fluid rounded-4"
              style="width: 500px; height: 500px; object-fit: cover;" />
          </div>
          <!-- Nút hành động trong modal -->
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-logout d-flex align-items-center" @click="closePreviewModal">
              <span class="material-symbols-outlined me-2">close</span> Hủy
            </button>
            <button :disabled="isLoading" type="button" class="btn btn-primary d-flex align-items-center"
              @click="saveAvatar">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
              </span>
              <span v-else class="material-symbols-outlined me-2">check</span> Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore';
import BasicInfo from './BasicInfo.vue';
import ChangePassword from './ChangePassword.vue';
import { useApiServices } from "@/services/apiService";
import { validateImage } from '@/utils/image';
import { showToastError, showToastSuccess } from '@/utils/Toast/toastHandle';

const apiService = useApiServices();
const userStore = useUserStore();
const defaultAvatar = 'https://scontent-sin2-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHhpylGP-pRms_VZ8gahMcxWt9TLzuBU1Ba31MvO4FTUEPSj7eG2-liyHygiWo4_l0k3agXQGFkKlM5KXb6mLiO&_nc_ohc=nhHrY9pzliIQ7kNvgFT9LSh&_nc_zt=24&_nc_ht=scontent-sin2-2.xx&_nc_gid=ABYRsLogzm2p1zMr-TshowT&oh=00_AYBPq1EYWpZvdd3cAL6gv0wzJv-XEnAHsC1RhisNhbEKRA&oe=67776D7A';
const avatarUrl = ref(null);
const fileInput = ref(null);
const showPreviewModal = ref(false);
const previewUrl = ref(null);
const isLoading = ref(false);

onMounted(() => {
  validateImage(userStore.user.hinhAnh, defaultAvatar, (url) => {
    avatarUrl.value = url;
  });
});

/* Mở input chọn tệp */
const openFileInput = () => {
  fileInput.value.click();
};

/* Xử lý khi chọn tệp ảnh */
const handleFileChange = (event) => {
  const file = event.target.files[0]; // Lấy tệp đầu tiên
  if (file) {
    const reader = new FileReader(); // Tạo FileReader để đọc tệp
    reader.onload = (e) => {
      previewUrl.value = e.target.result; // Gán URL xem trước
      showPreviewModal.value = true; // Hiển thị modal xem trước
    };
    reader.readAsDataURL(file); // Đọc tệp dưới dạng URL
  }
};

/* Đóng modal xem trước */
const closePreviewModal = () => {
  showPreviewModal.value = false; // Ẩn modal
  previewUrl.value = null; // Xóa URL xem trước
  fileInput.value.value = ''; // Reset input tệp
};

/* Lưu ảnh đại diện */
const saveAvatar = async () => {
  const formData = new FormData();
  formData.append("username", userStore.user.username);
  formData.append("fullName", userStore.user.fullName);
  formData.append("email", userStore.user.email);
  formData.append("soDienThoai", userStore.user.soDienThoai);
  formData.append("hinhAnh", fileInput.value.files[0]); // Tệp ảnh được chọn

  isLoading.value = true;
  try {
    const response = await apiService.postImage("users/update-info", formData);

    if (response) {
      showToastSuccess("Cập nhật ảnh thành công");
      // Làm mới dữ liệu từ store
      await userStore.getUserByUsername(userStore.user.username);
      // Cập nhật lại avatarUrl với dữ liệu mới
      avatarUrl.value = `${userStore.user.hinhAnh}`;
      closePreviewModal();
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
    showToastError("Cập nhật thất bại", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.card {
  background-color: var(--background-color);
}

.card :deep(.form-label) {
  font-weight: bold;
  color: var(--nav-link-color);
  font-size: 15px;
}

.card {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

@media screen and (max-width: 2000px) {
  .card :deep(.form-control) {
    max-width: 300px;
  }

  .container {
    max-width: 1200px;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
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
