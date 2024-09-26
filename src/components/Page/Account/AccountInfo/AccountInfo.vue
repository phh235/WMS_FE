<template>
  <div class="app-container">
    <main class="content">
      <div class="settings-content">
        <h2>Tổng quan tài khoản</h2>
        <div class="profile-card d-flex align-items-center">
          <div
            class="profile-image-container"
            @mouseover="showCamera = true"
            @mouseleave="showCamera = false"
          >
            <img :src="avatarUrl" alt="User Profile" class="profile-image" />
            <div class="camera-overlay" v-if="showCamera" @click="$refs.fileInput.click()">
              <span class="material-symbols-outlined"> photo_camera </span>
            </div>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="uploadAvatar"
              accept="image/*"
            />
          </div>
          <div class="profile-info ms-3">
            <h3 class="fw-bold">Phan Huy Hoàng</h3>
            <p class="role">Admin</p>
            <p class="email">phanhuyhoang.dev@gmail.com</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="info-card">
              <div class="card-header">
                <h3>Thông tin cơ bản</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <label>Họ tên</label>
                  <input type="text" value="Phan Huy Hoàng" />
                </div>
                <div class="info-item">
                  <label>Tên người dùng</label>
                  <input type="text" value="phh235" />
                </div>
                <div class="info-item">
                  <label>Email</label>
                  <input type="email" value="phanhuyhoang.dev@gmail.com" />
                </div>
                <div class="info-item">
                  <label>Điện thoại</label>
                  <input type="tel" value="0559 224 553" />
                </div>
                <div class="d-flex">
                  <button class="btn btn-primary">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="info-card">
              <div class="card-header">
                <h3>Đổi mật khẩu</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <label>Mật khẩu</label>
                  <input type="password" value="123" />
                </div>
                <div class="info-item">
                  <label>Nhập lại mật khẩu</label>
                  <input type="password" value="123" />
                </div>
                <div class="d-flex">
                  <button class="btn btn-primary">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showCamera = ref(false);
const fileInput = ref(null);
const avatarUrl = ref("https://avatars.githubusercontent.com/u/121915529?v=4");
const isUploading = ref(false);

const uploadAvatar = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  isUploading.value = true;

  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically make an API call to upload the file
    console.log("Avatar uploaded successfully");
  } catch (error) {
    console.error("Error uploading avatar:", error);
    // Here you might want to show an error message to the user
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.content {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.settings-container {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #00000014;
}

.settings-content {
  flex-grow: 1;
  padding: 2rem;
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.profile-card {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  transition: filter 0.3s ease;
}

.profile-info h3 {
  font-size: 1.1rem;
}

.profile-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.edit-btn {
  background: none;
  border: 1px solid #d9d9d9;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
}

.info-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid #dfdfdf;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: bold;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.info-item input {
  padding: 0.5rem;
  font-size: 15px;
  border-radius: 8px;
  /* border: 2px solid var(--secondary-color); */
  border: 1px solid #dfdfdf;
  transition: all 0.2s;
  &:focus,
  &:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border: 2px solid var(--border-input-color) !important;
  }
}

input {
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

@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }

  .settings-container {
    flex-direction: column;
  }

  .settings-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem;
  }

  .settings-content {
    padding: 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
  }

  .profile-image {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .edit-btn {
    margin-left: 0;
    margin-top: 1rem;
  }
}
.profile-image-container {
  position: relative;
  cursor: pointer;
}

.camera-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.camera-overlay span {
  color: white;
  font-size: 24px;
}

.profile-image-container:hover .profile-image {
  filter: brightness(0.95);
}
</style>
