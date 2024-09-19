<template>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--main-text-color)">
        CHÀO MỪNG TRỞ LẠI
      </h2>
      <h6 class="text-center mb-5">Vui lòng đăng nhập để tiếp tục</h6>
      <form style="width: 23rem" @submit.prevent="handleLogin">
        <!-- Username input -->
        <div class="form-floating mb-2">
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="1"
            v-model="username"
          />
          <label class="form-label fs" for="username">Tên người dùng</label>
        </div>
        <!-- Password input -->
        <div class="form-floating mb-2">
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="1"
            autocomplete
            v-model="password"
          />
          <label class="form-label fs" for="password">Mật khẩu</label>
        </div>
        <div class="mb-2 text-end">
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
  text-decoration: none;
  transition: all 0.2s;
  font-weight: bold;
  &:hover {
    color: #489a78;
  }
}
.fs {
  font-size: 14px;
}
input {
  font-size: 15px;
  border-radius: 8px;
  border: 2px solid #dcdcdc;
  &:focus,
  &:active {
    box-shadow: none;
    border: 2px solid var(--primary-color-hover);
  }
}
.form-control:focus + .form-label {
  color: var(--main-text-color);
}
.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}
.btn-login.loading {
  background-color: var(--primary-color);
  color: #000;
}
</style>
