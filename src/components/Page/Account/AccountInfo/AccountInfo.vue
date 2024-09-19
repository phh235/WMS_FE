<template>
  <div class="app-container">
    <main class="content">
      <div class="settings-content">
        <h2>Tổng quan tài khoản</h2>
        <div class="profile-card d-flex align-items-center">
          <img
            src="https://avatars.githubusercontent.com/u/121915529?v=4"
            alt="User Profile"
            class="profile-image"
          />
          <div class="profile-info">
            <h3>Phan Huy Hoàng</h3>
            <p class="role">Admin</p>
            <p class="email">phanhuyhoang.dev@gmail.com</p>
          </div>
          <button class="btn btn-secondary d-flex align-items-center ms-auto">
            <i class="bi bi-pencil"></i>
            <span class="material-symbols-outlined me-2"> edit </span>Edit
          </button>
        </div>

        <div class="info-card">
          <div class="card-header">
            <h3>Thông tin cá nhân</h3>
            <button class="btn btn-secondary d-flex align-items-center">
              <i class="bi bi-pencil"></i
              ><span class="material-symbols-outlined me-2"> edit </span>Edit
            </button>
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
              <label>Mật khẩu</label>
              <input type="password" value="123" />
            </div>
            <div class="info-item">
              <label>Điện thoại</label>
              <input type="tel" value="+84 559 224 553" />
            </div>
            <div class="info-item">
              <label>Role</label>
              <input type="text" value="Admin" />
            </div>
            <div class="d-flex">
              <button class="btn btn-primary d-flex align-items-center me-2">
                <span class="material-symbols-outlined me-2"> save </span>Lưu
              </button>
              <button class="btn btn-secondary d-flex align-items-center">
                <span class="material-symbols-outlined me-2"> cancel </span>Hủy
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="info-card">
            <div class="card-header">
              <h3>Address</h3>
              <button class="btn btn-secondary"><i class="bi bi-pencil"></i> Edit</button>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Country</label>
                <input type="text" value="United Kingdom" />
              </div>
              <div class="info-item">
                <label>City/State</label>
                <input type="text" value="Leeds, East London" />
              </div>
              <div class="info-item">
                <label>Postal Code</label>
                <input type="text" value="ERT 2354" />
              </div>
              <div class="info-item">
                <label>TAX ID</label>
                <input type="text" value="AS45645756" />
              </div>
            </div>
          </div> -->
      </div>
    </main>
  </div>
</template>

<script setup></script>

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
  border: 1px solid #00000014;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 1rem;
}

.profile-info h3 {
  font-size: 1.1rem;
}

.profile-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.profile-info .role {
  margin-top: 0.2rem;
}

.profile-info .email {
  margin-top: 0.2rem;
  font-size: 0.8rem;
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
  border: 1px solid #00000014;
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
</style>
