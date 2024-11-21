<template>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1" style="color: var(--primary-color); font-family: Bricolage Grotesque;">
        {{ $t("LoginForgotForm.reset.title") }}
      </h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);">
        {{ $t("LoginForgotForm.reset.small") }}
      </h6>
      <form style="width: 20rem; margin: auto" @submit.prevent="handleResetPassword">
        <!-- Mật khẩu -->
        <div class="mb-2 password-container">
          <label class="form-label fs" for="password">{{ $t("LoginForgotForm.reset.password") }}</label>
          <input id="password" :type="showPassword ? 'text' : 'password'" class="form-control"
            v-model="passwordInput.password" @input="validatePassword" />
          <span class="toggle-password" @click="toggleShowPassword">
            <span v-if="showPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
        </div>
        <ul class="password-criteria box-shadow-sm px-2 py-2 mb-2 user-select-none">
          <li :class="{ valid: passwordCriteria.length, invalid: !passwordCriteria.length }">
            <span class="material-symbols-outlined me-1"
              :style="{ color: passwordCriteria.length ? 'var(--valid-color)' : 'var(--is-valid-color)' }">
              {{ passwordCriteria.length ? 'check_circle' : 'cancel' }}
            </span>
            {{ $t("Swal.reset.toast.error.check_length") }}
          </li>
          <li :class="{ valid: passwordCriteria.uppercase, invalid: !passwordCriteria.uppercase }">
            <span class="material-symbols-outlined me-1"
              :style="{ color: passwordCriteria.uppercase ? 'var(--valid-color)' : 'var(--is-valid-color)' }">
              {{ passwordCriteria.uppercase ? 'check_circle' : 'cancel' }}
            </span>
            {{ $t("Swal.reset.toast.error.check_uppercase") }}
          </li>
          <li :class="{ valid: passwordCriteria.number, invalid: !passwordCriteria.number }">
            <span class="material-symbols-outlined me-1"
              :style="{ color: passwordCriteria.number ? 'var(--valid-color)' : 'var(--is-valid-color)' }">
              {{ passwordCriteria.number ? 'check_circle' : 'cancel' }}
            </span>
            {{ $t("Swal.reset.toast.error.check_number") }}
          </li>
          <li :class="{ valid: passwordCriteria.specialChar, invalid: !passwordCriteria.specialChar }">
            <span class="material-symbols-outlined me-1"
              :style="{ color: passwordCriteria.specialChar ? 'var(--valid-color)' : 'var(--is-valid-color)' }">
              {{ passwordCriteria.specialChar ? 'check_circle' : 'cancel' }}
            </span>
            {{ $t("Swal.reset.toast.error.check_special") }}
          </li>
        </ul>
        <!-- Xác nhận mật khẩu -->
        <div class="mb-3 password-container">
          <label class="form-label fs" for="repeatPassword">{{ $t("LoginForgotForm.reset.confirm") }}</label>
          <input id="repeatPassword" :type="showConfirmPassword ? 'text' : 'password'" class="form-control"
            v-model="passwordInput.repeatPassword" :class="{ 'is-invalid': errors.repeatPassword }" />
          <span class="toggle-password" @click="toggleShowConfirmPassword" v-if="!errors.repeatPassword">
            <span v-if="showConfirmPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
          <div class="invalid-feedback">
            {{ $t(errors.repeatPassword) }}
          </div>
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm align-middle" role="status"
            aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.reset.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { showToastError, showToastInfo, showToastSuccess } from "@/components/Toast/utils/toastHandle";
import { useI18n } from "vue-i18n";
import { useApiServices } from "@/services/apiService";

const { t } = useI18n();
const router = useRouter();
const apiService = useApiServices();
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordInput = reactive({
  password: "",
  repeatPassword: "",
});

const passwordCriteria = reactive({
  length: false,
  uppercase: false,
  number: false,
  specialChar: false,
});

const errors = reactive({
  password: "",
  repeatPassword: "",
});

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validatePassword = () => {
  const password = passwordInput.password;
  passwordCriteria.length = /.{8,}/.test(password);
  passwordCriteria.uppercase = /[A-Z]/.test(password);
  passwordCriteria.number = /\d/.test(password);
  passwordCriteria.specialChar = /[@$!%*?&]/.test(password);
};

const validateForm = () => {
  let isValid = true;
  errors.repeatPassword = "";

  if (!passwordCriteria.length || !passwordCriteria.uppercase || !passwordCriteria.number || !passwordCriteria.specialChar) {
    errors.password = "Mật khẩu chưa đạt đủ các tiêu chí.";
    isValid = false;
  } else {
    errors.password = "";
  }

  if (!passwordInput.repeatPassword) {
    errors.repeatPassword = "Swal.reset.toast.error.text_confirm";
    isValid = false;
  } else if (passwordInput.password !== passwordInput.repeatPassword) {
    errors.repeatPassword = "Swal.reset.toast.error.text_confirm_password";
    isValid = false;
  }

  return isValid;
};

const handleResetPassword = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  const email = sessionStorage.getItem("email");
  try {
    await apiService.post(`forgot-password/change-password/${email}`, passwordInput);
    showToastSuccess(t("Swal.reset.toast.success.title"));
    setTimeout(() => {
      showToastInfo(t("Swal.reset.toast.info.title"), t("Swal.reset.toast.info.text"));
      setTimeout(() => {
        router.push("/login");
        sessionStorage.removeItem("email");
      }, 1000);
    }, 1000);
  } catch (error) {
    showToastError(t("Swal.reset.toast.error.text_confirm_password"));
    console.error("Error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-label {
  color: var(--label-color);
}

.fs {
  font-size: 0.875rem;
  font-weight: bold;
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

.btn-login.loading {
  background-color: var(--primary-color);
  color: var(--text-light-color);
}

@media screen and (max-width: 992.98px) {
  h2 {
    font-size: 37px;
  }

  h6 {
    font-size: 17px;
  }

  .fs {
    font-size: 1rem !important;
    font-weight: bold;
  }

  input {
    font-size: 1rem !important;
  }
}

.password-criteria {
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0;
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

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 90%;
  right: 15px;
  transform: translateY(-90%);
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

li {
  display: flex;
  align-items: center;
}

.box-shadow-sm {
  border-radius: 1rem;
  border: 1.5px solid var(--border-main-color);
  cursor: pointer;

  &:active {
    border: 1.5px solid var(--primary-color);
  }
}
</style>
