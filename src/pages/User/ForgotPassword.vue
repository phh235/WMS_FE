<template>
  <div class="d-flex align-items-center justify-content-center mb-5">
    <router-link
      to="/dang-nhap"
      class="btn btn-secondary d-flex align-items-center justify-content-center"
    >
      <span class="material-symbols-outlined me-2"> chevron_left </span>
      <span class="fw-bold">Đăng nhập</span>
    </router-link>
  </div>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color)">QUÊN MẬT KHẨU</h2>
      <h6 class="text-center mb-5">Vui lòng nhập email</h6>
      <form style="width: 23rem">
        <!-- Username input -->
        <div class="mb-3">
          <label class="form-label fs" for="email">Email</label>
          <input type="text" id="email" class="form-control" required v-model="email" />
        </div>
        <!-- Submit button -->
        <button class="btn btn-login text-dark w-100" @click="forgotPassword">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
import Toast from "@components/Toast/toast.js";

const forgotPassword = async (event) => {
  event.preventDefault();

  if (email.value == "") {
    Toast.fire({
      icon: "error",
      title: "Gửi email thất bại",
      text: "Vui lòng không để trống email",
    });
  } else {
    Toast.fire({
      icon: "success",
      title: "Gửi mail thành công",
      text: "Vui lòng kiểm tra email để khôi phục mật khẩu",
    }).then(() => {
      Toast.fire({
        icon: "info",
        title: "Đang chuyển hướng về trang đăng nhập",
        timer: 2000,
      }).then(() => {
        setTimeout(function () {
          router.push("/dang-nhap");
        }, 0);
      });
    });
  }
};
</script>

<style scoped>
.forgot {
  color: #171717;
  text-decoration: none;
  &:hover {
    border-bottom: 1.5px solid #171717;
  }
}

.fs {
  font-size: 14px;
  font-weight: bold;
}
</style>
