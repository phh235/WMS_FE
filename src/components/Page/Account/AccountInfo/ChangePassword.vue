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
import { ref, reactive } from 'vue'
import { useApiServices } from '@/services/apiService';
import { showToastError, showToastSuccess } from '@/components/Toast/utils/toastHandle';
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import Swal from 'sweetalert2';

const { t } = useI18n();
const isLoading = ref(false);
const apiService = useApiServices();
const passwordChange = reactive({
  username: localStorage.getItem("user"),
  passwordOld: '',
  password: '',
  confirmPassword: ''
});

const changePassword = async () => {
  if (!passwordChange.passwordOld) {
    showToastError(t('AccountInfo.swal.error.password_old_text'));
    return;
  }

  if (!passwordChange.password) {
    showToastError(t('AccountInfo.swal.error.password_new_text'));
    return;
  }

  if (!passwordChange.confirmPassword) {
    showToastError(t('AccountInfo.swal.error.password_confirm_text'));
    return;
  }

  if (passwordChange.password !== passwordChange.confirmPassword) {
    showToastError(t('AccountInfo.swal.error.password_confirm_check'));
    return;
  }

  const swalConfirm = await Swal.fire({
    title: i18n.global.t("AccountInfo.swal.confirm.title_password"),
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
      const response = await apiService.post("users/update-password", passwordChange);
      if (response.status === 200) {
        showToastSuccess(t('AccountInfo.swal.success.title_password'));
        resetForm();
      } else {
        showToastError(t('AccountInfo.swal.erroe.failed_password'));
      }
    } catch (error) {
      if (error.response.data.errorMessage === "Old password is incorrect") {
        showToastError(t('AccountInfo.swal.error.password_old_check'));
      } else {
        showToastError(t('AccountInfo.swal.error.failed_password'));
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const resetForm = () => {
  passwordChange.passwordOld = '';
  passwordChange.password = '';
  passwordChange.confirmPassword = '';
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