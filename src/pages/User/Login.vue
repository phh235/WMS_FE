<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;">
        {{ $t("LoginForgotForm.login.title") }}
      </h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);">{{ $t("LoginForgotForm.login.small") }}</h6>
      <form style="width: 20rem; margin: auto;" @submit.prevent="handleLogin">
        <!-- Username input -->
        <div class="mb-2">
          <label class="form-label fs" for="username">{{ $t("LoginForgotForm.login.label_username") }}</label>
          <input type="text" id="username" class="form-control" v-model="username" />
        </div>
        <!-- Password input -->
        <div class="mb-2 password-container">
          <label class="form-label fs" for="password">{{ $t("LoginForgotForm.login.label_password") }}</label>
          <input class="form-control" :type="showPassword ? 'text' : 'password'" id="password" autocomplete
            v-model="password" />
          <span class="toggle-password" @click="toggleShowPassword">
            <span v-if="showPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
        </div>
        <div class="mb-2 text-end">
          <router-link to="/quen-mat-khau" class="forgot fs"> {{ $t("LoginForgotForm.login.forgot_text") }}?
          </router-link>
        </div>
        <!-- Submit button -->
        <button class="btn btn-login w-100 d-flex align-items-center justify-content-center fw-bold" type="submit"
          :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> {{
            $t("LoginForgotForm.login.btn_login") }}
          <!-- <span v-if="!loading"></span> -->
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore.js";
import i18n from "@/lang/i18n";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

const authStore = useAuthStore();
const loading = ref(false);
const username = ref("");
const password = ref("");
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (!username.value) {
    showToastError(i18n.global.t("Swal.login.toast.error.title"), i18n.global.t("Swal.login.toast.error.username_text"));
    return;
  }
  if (!password.value) {
    showToastError(i18n.global.t("Swal.login.toast.error.title"), i18n.global.t("Swal.login.toast.error.password_text"));
    return;
  }
  loading.value = true;
  try {
    await authStore.login({ username: username.value, password: password.value });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.forgot {
  color: var(--label-color);
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
  }
}

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

@media screen and (max-width: 992.98px) {
  h2 {
    font-size: 34px;
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
</style>
