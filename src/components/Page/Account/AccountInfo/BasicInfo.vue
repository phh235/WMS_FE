<template>
  <div class="card mb-4 box-shadow p-4">
    <div class="card-body">
      <h5 class="mb-4 fw-bold" style="color: var(--primary-color); font-size: 1.5rem">
        {{ $t("AccountInfo.title_info") }}
      </h5>
      <form @submit.prevent="updateInfo">
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="username" class="form-label">{{ $t("AccountInfo.label.username") }}</label>
          </div>
          <div class="col-sm-8">
            <input id="username" v-model="userInfo.username" type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="fullname" class="form-label">{{ $t("AccountInfo.label.fullname") }}</label>
          </div>
          <div class="col-sm-8">
            <input id="fullname" v-model="userInfo.fullName" type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="email" class="form-label">Email</label>
          </div>
          <div class="col-sm-8">
            <input id="email" v-model="userInfo.email" type="email" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="phone" class="form-label">{{ $t("AccountInfo.label.phone") }}</label>
          </div>
          <div class="col-sm-8">
            <input id="phone" v-model="userInfo.soDienThoai" type="tel" class="form-control" />
          </div>
        </div>
        <button class="btn btn-primary d-flex align-items-center">
          <span class="material-symbols-outlined me-2">sync</span>
          {{ $t("AccountInfo.btn_update") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useApiServices } from '@/services/apiService';
import { showToastError, showToastSuccess } from '@/components/Toast/utils/toastHandle';

const apiService = useApiServices();
const userStore = useUserStore();
const userInfo = reactive({
  username: '',
  fullName: '',
  email: '',
  soDienThoai: '',
});

onMounted(() => {
  userStore.loadUserFromSession();
  Object.assign(userInfo, userStore.user);
});

const updateInfo = async () => {

  if (!userInfo.username) {
    showToastError("Tên người dùng không được để trống");
    return;
  }

  if (!userInfo.fullName) {
    showToastError("Họ tên không được để trống");
    return;
  }

  if (!userInfo.email) {
    showToastError("Email không được để trống");
    return;
  }

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(userInfo.email)) {
    showToastError('Địa chỉ email không hợp lệ.');
    return;
  }

  if (!userInfo.soDienThoai) {
    showToastError('Số điện thoại không được để trống.');
    return;
  }

  // Kiểm tra số điện thoại
  const phonePattern = /^\d{10,11}$/; // Đảm bảo là 10 hoặc 11 chữ số
  if (!phonePattern.test(userInfo.soDienThoai)) {
    showToastError('Số điện thoại phải là từ 10 đến 11 chữ số.');
    return;
  }

  try {
    const response = await apiService.post("users/update-info", userInfo);
    if (response.status === 200) {
      showToastSuccess('Cập nhật thông tin thành công');
      userStore.loadUserFromSession();
      Object.assign(userInfo, userStore.user);
    } else {
      showToastError('Cập nhật thông tin thất bại');
    }
  } catch (error) {
    showToastError('Cập nhật thông tin thất bại');
  }
};
</script>
