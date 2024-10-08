<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color)">
        CHÀO MỪNG TRỞ LẠI
      </h2>
      <h6 class="text-center mb-5">Vui lòng đăng nhập để tiếp tục</h6>
      <form style="width: 23rem" @submit.prevent="handleLogin">
        <!-- Username input -->
        <div class="mb-2">
          <label class="form-label fs" for="username">Tên người dùng</label>
          <input type="text" id="username" class="form-control" v-model="username" />
        </div>
        <!-- Password input -->
        <div class="mb-2 password-container">
          <label class="form-label fs" for="password">Mật khẩu</label>
          <input
            class="form-control"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            autocomplete
            v-model="password"
          />
          <span class="toggle-password" @click="toggleShowPassword">
            <span v-if="showPassword" class="material-symbols-outlined"> visibility_off </span>
            <span v-else class="material-symbols-outlined"> visibility </span>
          </span>
        </div>
        <div class="mb-3 text-end">
          <router-link to="/quen-mat-khau" class="forgot fs"> Quên mật khẩu? </router-link>
        </div>
        <!-- Submit button -->
        <button
          class="btn btn-login text-dark w-100"
          type="submit"
          :disabled="loading"
          :class="{ loading: loading }"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-if="!loading">Đăng nhập</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";
import { showToastError } from "@components/Toast/utils/toastHandle.js";

const router = useRouter();
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
    showToastError("Đăng nhập thất bại!", "Tài khoản không được để trống");
    return;
  }
  if (!password.value) {
    showToastError("Đăng nhập thất bại!", "Mật khẩu không được để trống");
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
  color: #171717;
  font-weight: bold;
  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
}
.fs {
  font-size: 14px;
  font-weight: bold;
}
.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

.btn-login {
  border-radius: calc(0.75rem - 2px);
}

.btn-login.loading {
  background-color: var(--primary-color);
  color: #000;
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

.toggle-password:hover {
  color: #000;
}
</style>
