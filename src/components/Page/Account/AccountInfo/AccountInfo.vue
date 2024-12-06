<template>
  <!-- Khung chứa chính -->
  <div class="container">
    <div class="row">
      <!-- Phần hiển thị thông tin ảnh đại diện -->
      <div class="col-lg-4">
        <div class="card mb-4 box-shadow">
          <div class="card-body text-center">
            <!-- Hiển thị ảnh đại diện -->
            <div class="d-flex justify-content-center mb-3 position-relative">
              <div style="width: 320px; height: 278px;">
                <!-- Ảnh đại diện với nút chỉnh sửa -->
                <img :src="avatarUrl" alt="Avatar" class="rounded-4 img-fluid mb-3" loading="lazy"
                  style="object-fit: cover; object-position: center; width: 100%; height: 100%;" />
                <!-- Nút thay đổi ảnh đại diện -->
                <button @click="openFileInput"
                  class="btn btn-secondary position-absolute bottom-0 m-2 d-flex align-items-center"
                  style="padding: 10px 10px;">
                  <span class="material-symbols-outlined">photo_camera</span>
                </button>
                <!-- Input tệp ảnh ẩn -->
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="d-none" />
              </div>
            </div>
            <!-- Hiển thị tên người dùng -->
            <h4 class="fw-bold" style="color: var(--label-color);">{{ userStore.user.fullName }}</h4>
            <!-- Hiển thị vai trò người dùng -->
            <div class="d-flex justify-content-center">
              <span class="badge p-2 box-shadow"
                style="background-color: var(--primary-color) !important; border-radius: 8px; color: var(--btn-primary-color) !important; font-size: 0.875rem !important">
                {{ userStore.user.role }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Phần thông tin cơ bản và thay đổi mật khẩu -->
      <div class="col-lg-8">
        <BasicInfo />
        <ChangePassword />
      </div>
    </div>

    <!-- Modal xem trước ảnh đại diện -->
    <div v-if="showPreviewModal" class="modal" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Tiêu đề của modal -->
          <div class="modal-header border-0">
            <h5 class="modal-title">Xem trước ảnh đại diện</h5>
            <span class="material-symbols-outlined custom-close" @click="closePreviewModal">close</span>
          </div>
          <!-- Hiển thị ảnh xem trước -->
          <div class="modal-body">
            <img :src="previewUrl" alt="Preview" class="img-fluid rounded-4"
              style="width: 300px; height: 300px; object-fit: cover;" />
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
              <span v-else class="material-symbols-outlined me-2">check</span> Lưu thay đổi
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
const defaultAvatar = 'https://example.com/default-avatar.png';
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
  if (!fileInput.value.files[0]) { // Kiểm tra xem đã chọn tệp chưa
    showToastError("Vui lòng chọn ảnh trước khi lưu");
    return;
  }

  // Chuẩn bị dữ liệu gửi lên server
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

      closePreviewModal(); // Đóng modal
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
