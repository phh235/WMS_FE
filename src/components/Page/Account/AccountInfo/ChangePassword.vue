<template>
  <div class="card box-shadow p-4">
    <div class="card-body">
      <h5 class="mb-4 fw-bold" style="color: var(--primary-color); font-size: 1.5rem">{{
        $t("AccountInfo.title_password") }}</h5>
      <form @submit.prevent="changePassword">
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="passwordOld" class="form-label">{{ $t("AccountInfo.label.password.old") }}</label>
          </div>
          <div class="col-sm-8">
            <input id="passwordOld" v-model="passwordChange.passwordOld" type="password" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="password" class="form-label">{{ $t("AccountInfo.label.password.new") }}</label>
          </div>
          <div class="col-sm-8">
            <input id="password" v-model="passwordChange.password" type="password" class="form-control" />
          </div>
        </div>
        <div class="row mb-3 d-flex align-items-center">
          <div class="col-sm-4">
            <label for="confirmPassword" class="form-label">{{ $t("AccountInfo.label.password.confirm")
              }}</label>
          </div>
          <div class="col-sm-8">
            <input id="confirmPassword" v-model="passwordChange.confirmPassword" type="password" class="form-control" />
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
import { reactive } from 'vue'
import { useApiServices } from '@/services/apiService';
import { showToastError, showToastSuccess } from '@/components/Toast/utils/toastHandle';

const apiService = useApiServices();
const passwordChange = reactive({
  username: localStorage.getItem("user"),
  passwordOld: '',
  password: '',
  confirmPassword: ''
});

const changePassword = async () => {
  if (!passwordChange.passwordOld) {
    showToastError('Vui lòng nhập mật khẩu cũ');
    // showToastError(i18n.global.t("Product.form.swal.validate.product_name"));
    return;
  }

  if (!passwordChange.password) {
    showToastError('Vui lòng nhập mật khẩu mới');
    // showToastError(i18n.global.t("Product.form.swal.validate.product_name"));
    return;
  }

  if (!passwordChange.confirmPassword) {
    showToastError('Vui lòng xác nhận mật khẩu mới');
    // showToastError(i18n.global.t("Product.form.swal.validate.product_name"));
    return;
  }

  if (passwordChange.password !== passwordChange.confirmPassword) {
    showToastError('Mật khẩu xác nhận không khớp');
    // showToastError(i18n.global.t("Product.form.swal.validate.product_name"));
    return;
  }
  try {
    console.log(passwordChange);

    const response = await apiService.post("users/update-password", passwordChange);
    if (response.status === 200) {
      showToastSuccess("Đổi mật khẩu thành công");
      resetForm();
    } else {
      showToastError("Đổi mật khẩu thất bại");
    }
  } catch (error) {
    if (error.response.data.errorMessage === "Old password is incorrect") {
      showToastError("Mật khẩu cũ không chính xác");
    } else {
      showToastError("Có lỗi xảy ra, vui lòng thử lại");
    }
  }
};

const resetForm = () => {
  passwordChange.passwordOld = '';
  passwordChange.password = '';
  passwordChange.confirmPassword = '';
};
</script>