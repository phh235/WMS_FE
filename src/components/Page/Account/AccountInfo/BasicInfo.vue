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
        <button :disabled="isLoading" class="btn btn-primary d-flex align-items-center">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
          </span>
          <span v-else class="material-symbols-outlined me-2">sync</span>
          {{ $t("AccountInfo.btn_update") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useApiServices } from '@/services/apiService';
import { showToastError, showToastSuccess } from '@/components/Toast/utils/toastHandle';
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';

const { t } = useI18n();
const isLoading = ref(false);
const isFormChanged = ref(false);
const apiService = useApiServices();
const userStore = useUserStore();
const userInfo = reactive({
  username: '',
  fullName: '',
  email: '',
  soDienThoai: '',
});

onMounted(async () => {
  userStore.loadUserFromSession();
  Object.assign(userInfo, userStore.user);
});

// watch(userInfo, (newValue) => {
//   console.log('User info updated:', newValue);
//   userStore.getUserByUsername();
//   userStore.loadUserFromSession();
// }, { deep: true });

const updateInfo = async () => {

  if (!userInfo.username) {
    showToastError(t('AccountInfo.swal.error.username_text'));
    return;
  }

  if (!userInfo.fullName) {
    showToastError(t('AccountInfo.swal.error.fullname_text'));
    return;
  }

  if (!userInfo.email) {
    showToastError(t('AccountInfo.swal.error.email_text'));
    return;
  }

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(userInfo.email)) {
    showToastError(t('AccountInfo.swal.error.email_check'));
    return;
  }

  if (!userInfo.soDienThoai) {
    showToastError(t('AccountInfo.swal.error.phone_text'));
    return;
  }

  // Kiểm tra số điện thoại
  const phonePattern = /^\d{10,11}$/; // Đảm bảo là 10 hoặc 11 chữ số
  if (!phonePattern.test(userInfo.soDienThoai)) {
    showToastError(t('AccountInfo.swal.error.phone_check'));
    return;
  }

  const swalConfirm = await Swal.fire({
    title: i18n.global.t("AccountInfo.swal.confirm.title"),
    text: i18n.global.t("AccountInfo.swal.confirm.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("AccountInfo.swal.confirm.btn_cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("AccountInfo.swal.confirm.btn_confirm"),
  });

  if (swalConfirm.isConfirmed) {
    isLoading.value = true;
    try {
      const response = await apiService.post("users/update-info", userInfo);
      if (response.status === 200) {
        showToastSuccess(t('AccountInfo.swal.success.title_info'));
        await userStore.getUserByUsername();
        Object.assign(userInfo, userStore.user);
      } else {
        showToastError(t('AccountInfo.swal.error.failed'));
      }
    } catch (error) {
      showToastError(t('AccountInfo.swal.error.failed'));
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped>
.btn-primary:disabled,
.btn-primary[disabled] {
  background-color: var(--primary-color);
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
