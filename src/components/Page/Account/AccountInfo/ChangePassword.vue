<template>
  <div class="card box-shadow p-md-4 p-1">
    <div class="card-body">
      <h5 class="mb-4 fw-bold" style="color: var(--primary-color); font-size: 1.5rem">
        {{ $t("AccountInfo.title_password") }}
      </h5>
      <form @submit.prevent="changePassword">
        <!-- Old Password -->
        <div class="row mb-3 d-flex align-items-center">
          <label for="passwordOld" class="col-sm-4 form-label">
            {{ $t("AccountInfo.label.password.old") }}
          </label>
          <div class="col-sm-8">
            <input id="passwordOld" v-model="passwordChange.passwordOld" type="password" class="form-control"
              :class="{ 'is-invalid': !passwordChange.passwordOld && formSubmitted }" />
            <div class="invalid-feedback" v-if="formSubmitted && !passwordChange.passwordOld">
              {{ $t("AccountInfo.swal.error.password_old_text") }}
            </div>
          </div>
        </div>

        <!-- New Password -->
        <div class="row mb-3 d-flex align-items-center">
          <label for="password" class="col-sm-4 form-label">
            {{ $t("AccountInfo.label.password.new") }}
          </label>
          <div class="col-sm-8">
            <input id="password" v-model="passwordChange.password" type="password" class="form-control"
              @input="validatePassword" :class="{ 'is-invalid': !isValidPassword && formSubmitted }" />
            <div class="invalid-feedback" v-if="formSubmitted && !passwordChange.password">
              {{ $t("AccountInfo.swal.error.password_new_text") }}
            </div>
          </div>
        </div>

        <div class="row mb-3 d-flex align-items-center" v-if="formSubmitted">
          <label for="password" class="col-sm-4 form-label opacity-0">
            {{ $t("AccountInfo.label.password.new") }}
          </label>
          <!-- Password Criteria -->
          <div class="col-sm-8" v-if="formSubmitted">
            <div class="box-shadow px-2 py-1"
              style="border-radius: 1rem; border: 1.5px solid var(--border-main-color); width: fit-content;">
              <ul class="password-criteria">
                <li v-for="(valid, key) in passwordCriteria" :key="key" :class="{ valid, invalid: !valid }"
                  class="d-flex align-items-center">
                  <span class="material-symbols-outlined me-1"
                    :style="{ color: valid ? 'var(--valid-color)' : 'var(--is-valid-color)' }">
                    {{ valid ? 'check_circle' : 'cancel' }}
                  </span>
                  {{ $t(`Swal.reset.toast.error.check_${key}`) }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="row mb-3 d-flex align-items-center">
          <label for="confirmPassword" class="col-sm-4 form-label">
            {{ $t("AccountInfo.label.password.confirm") }}
          </label>
          <div class="col-sm-8">
            <input id="confirmPassword" v-model="passwordChange.confirmPassword" type="password" class="form-control"
              :class="{ 'is-invalid': (!passwordChange.confirmPassword || passwordChange.password !== passwordChange.confirmPassword) && formSubmitted }" />
            <div class="invalid-feedback"
              v-if="formSubmitted && !passwordChange.confirmPassword || passwordChange.password !== passwordChange.confirmPassword">
              {{
                !passwordChange.confirmPassword
                  ? $t("AccountInfo.swal.error.password_confirm_check_empty")
                  : passwordChange.password !== passwordChange.confirmPassword
                    ? $t("AccountInfo.swal.error.password_confirm_check")
                    : ""
              }}
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button :disabled="isLoading" class="btn btn-primary d-flex align-items-center">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span v-else class="material-symbols-outlined me-2">sync</span>
          {{ $t("AccountInfo.btn_update") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useApiServices } from "@/services/apiService";
import { showToastError, showToastSuccess } from "@/utils/Toast/toastHandle";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t } = useI18n();
const isLoading = ref(false);
const formSubmitted = ref(false);
const apiService = useApiServices();

const passwordChange = reactive({
  username: localStorage.getItem("user"),
  passwordOld: "",
  password: "",
  confirmPassword: "",
});

const passwordCriteria = reactive({
  length: false,
  uppercase: false,
  number: false,
  special: false,
});

const validatePassword = () => {
  const password = passwordChange.password;
  passwordCriteria.length = /.{8,}/.test(password);
  passwordCriteria.uppercase = /[A-Z]/.test(password);
  passwordCriteria.number = /\d/.test(password);
  passwordCriteria.special = /[@$!%*?&]/.test(password);
};

const isValidPassword = computed(() =>
  Object.values(passwordCriteria).every((criterion) => criterion)
);

const validateForm = () => {
  formSubmitted.value = true;
  return isValidPassword.value &&
    passwordChange.passwordOld &&
    passwordChange.password &&
    passwordChange.confirmPassword &&
    passwordChange.password === passwordChange.confirmPassword;
};

const changePassword = async () => {
  if (!validateForm()) {
    // showToastError(t("AccountInfo.swal.error.validation_failed"));
    return;
  }

  const swalConfirm = await Swal.fire({
    title: t("AccountInfo.swal.confirm.title_password"),
    text: t("AccountInfo.swal.confirm.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: t("AccountInfo.swal.confirm.btn_cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: t("AccountInfo.swal.confirm.btn_confirm"),
  });

  if (swalConfirm.isConfirmed) {
    isLoading.value = true;
    try {
      const response = await apiService.post("users/update-password", passwordChange);
      if (response.status === 200) {
        showToastSuccess(t("AccountInfo.swal.success.title_password"));
        resetForm();
      } else {
        showToastError(t("AccountInfo.swal.error.failed_password"));
      }
    } catch (error) {
      if (error.response.data.errorMessage === "Old password is incorrect") {
        showToastError(t("AccountInfo.swal.error.password_old_check"));
      } else {
        showToastError(t("AccountInfo.swal.error.failed_password"));
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const resetForm = () => {
  passwordChange.passwordOld = "";
  passwordChange.password = "";
  passwordChange.confirmPassword = "";
  formSubmitted.value = false;
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

input {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
}

.password-criteria {
  list-style-type: none;
  padding: 0;
  margin: 5px 0 0;
  font-size: 0.875rem;
}

.password-criteria li {
  margin-bottom: 5px;
  color: var(--is-valid-color);
}

.password-criteria .valid {
  color: var(--valid-color);
}

.invalid-feedback {
  display: block;
  color: var(--is-valid-color);
}
</style>
