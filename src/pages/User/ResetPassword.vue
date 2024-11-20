<template>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;"> {{
        $t("LoginForgotForm.reset.title") }}</h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);"> {{ $t("LoginForgotForm.reset.small") }}
      </h6>
      <form style="width: 20rem; margin: auto" @submit.prevent="handleResetPassword">
        <div class="mb-3 password-container">
          <label class="form-label fs" for="repeatPassword">{{ $t("LoginForgotForm.reset.password") }}</label>
          <input id="repeatPassword" :type="showPassword ? 'text' : 'password'" class="form-control"
            v-model="passwordInput.password" />
          <span class="toggle-password" @click="toggleShowPassword">
            <span v-if="showPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
        </div>
        <div class="mb-3 password-container">
          <label class="form-label fs" for="repeatPassword">{{ $t("LoginForgotForm.reset.confirm") }}</label>
          <input id="repeatPassword" :type="showConfirmPassword ? 'text' : 'password'" class="form-control"
            v-model="passwordInput.repeatPassword" />
          <span class="toggle-password" @click="toggleShowConfirmPassword">
            <span v-if="showConfirmPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.reset.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { showToastError, showToastInfo, showToastLoading, showToastSuccess } from "@/components/Toast/utils/toastHandle";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import { useApiServices } from "@/services/apiService";

const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const apiService = useApiServices();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordInput = reactive({
  password: '',
  repeatPassword: ''
});

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleResetPassword = async () => {
  if (!passwordInput.password) {
    showToastError(i18n.global.t("Swal.reset.toast.error.text"));
    return;
  }

  const passwordPattern = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    number: /\d/,
    specialChar: /[@$!%*?&]/
  };

  if (!passwordPattern.length.test(passwordInput.password)) {
    showToastError("Mật khẩu phải có độ dài tối thiểu 8 ký tự.");
    return;
  }
  if (!passwordPattern.uppercase.test(passwordInput.password)) {
    showToastError("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.");
    return;
  }
  if (!passwordPattern.number.test(passwordInput.password)) {
    showToastError("Mật khẩu phải chứa ít nhất 1 số.");
    return;
  }
  if (!passwordPattern.specialChar.test(passwordInput.password)) {
    showToastError("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.");
    return;
  }

  if (!passwordInput.repeatPassword) {
    showToastError(i18n.global.t("Swal.reset.toast.error.text_confirm"));
    return;
  }

  // if (passwordInput.password !== passwordInput.repeatPassword) {
  //   return;
  // }

  loading.value = true
  const email = sessionStorage.getItem("email");
  try {
    const response = await apiService.post(`forgot-password/change-password/${email}`, passwordInput)
    showToastSuccess(i18n.global.t("Swal.reset.toast.success.title"))
    setTimeout(function () {
      showToastInfo(i18n.global.t("Swal.reset.toast.info.title"), i18n.global.t("Swal.reset.toast.info.text"));
      setTimeout(function () {
        router.push("/login");
        sessionStorage.removeItem("email");
      }, 1000);
    }, 1000);
  } catch (error) {
    if (error.response.status === 400) {
      showToastError(i18n.global.t("Swal.reset.toast.error.text_confirm_password"));
      console.log("Error:", error);
    }
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
  user-select: none;

  &:hover {
    color: var(--nav-link-color);
  }
}
</style>
