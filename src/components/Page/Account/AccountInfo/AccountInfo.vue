<template>
  <div class="app-container">
    <main class="content">
      <div class="settings-content">
        <div class="profile-card box-shadow d-flex align-items-center">
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
          <div class="col-12 col-md-6">
            <div class="info-card box-shadow">
              <div class="card-header">
                <h3>Thông tin cơ bản</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <label for="fullname" class="form-label">Họ tên</label>
                  <input id="fullname" type="text" value="Phan Huy Hoàng" class="form-control" />
                </div>
                <div class="info-item">
                  <label for="username" class="form-label">Tên người dùng</label>
                  <input id="username" type="text" value="phh235" class="form-control" />
                </div>
                <div class="info-item">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    value="phanhuyhoang.dev@gmail.com"
                    class="form-control"
                  />
                </div>
                <div class="info-item">
                  <label for="phone" class="form-label">Điện thoại</label>
                  <input id="phone" type="tel" value="0559224553" class="form-control" />
                </div>
                <div class="d-flex">
                  <button class="btn btn-primary d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> sync </span>Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="info-card box-shadow">
              <div class="card-header">
                <h3>Đổi mật khẩu</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <label for="password" class="form-label">Mật khẩu</label>
                  <input id="password" type="password" value="123" class="form-control" />
                </div>
                <div class="info-item">
                  <label for="confirm-password" class="form-label">Nhập lại mật khẩu</label>
                  <input id="confirm-password" type="password" value="123" class="form-control" />
                </div>
                <div class="d-flex">
                  <button class="btn btn-primary d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> sync </span>Cập nhật
                  </button>
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
  border-radius: 16px;
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
  margin-bottom: 1.3rem;
  padding: 1rem;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
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

.info-card {
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e4e4e7;
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
  font-size: 0.9rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0.3rem;
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
