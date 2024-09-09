<template>
  <main class="container-fluid p-0">
    <div class="row align-items-center justify-content-center vh-100">
      <div class="col-12 col-md-6 text-black vh-100 d-none d-lg-block">
        <img
          src="https://res.cloudinary.com/dnfccnxew/image/upload/v1725710674/aepjhdbiizkukw60fhuf.png"
          alt="Logo WMS"
          class="w-100 h-100"
        />
      </div>
      <div
        class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-black"
      >
        <!-- Logo and Title -->
        <div class="text-center mb-4">
          <img
            src="https://res.cloudinary.com/dc1txyr7b/image/upload/v1724138470/th78gsygvjv2wm7zbwh7.png"
            alt="Logo"
            style="width: 60px; height: 60px"
          />
        </div>
        <!-- Form -->
        <div class="container d-flex justify-content-center">
          <div>
            <h2 class="text-center mb-1 fw-bold">QUÊN MẬT KHẨU</h2>
            <h6 class="text-center mb-5">Vui lòng nhập email</h6>
            <form style="width: 23rem">
              <!-- Username input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  id="email"
                  class="form-control"
                  placeholder="1"
                  required
                  v-model="email"
                />
                <label class="form-label" for="email" style="font-size: 14px">Email</label>
              </div>
              <!-- Submit button -->
              <button class="btn btn-login text-dark w-100 fw-bold" @click="forgotPassword">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");

const forgotPassword = async (event) => {
  event.preventDefault();

  if (email.value == "") {
    Swal.fire({
      icon: "error",
      title: "Gửi email thất bại",
      text: "Vui lòng không để trống email.",
    });
  } else {
    Swal.fire({
      title: "Gửi mail thành công.",
      text: "Vui lòng kiểm tra email để khôi phục mật khẩu.",
      icon: "success",
      timer: 2300,
      timerProgressBar: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    }).then(() => {
      setTimeout(function () {
        router.push("/dang-nhap");
      }, 500);
    });
  }
};
</script>

<style scoped>
.pattern {
  --color: #c09bd8;
  background-color: #9f84bd;
  width: 100%;
  height: 100%;
  position: relative;
}
.pattern::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.8;
  background: radial-gradient(circle, var(--color) 15%, transparent 15%),
    radial-gradient(circle, var(--color) 15%, transparent 15%) 6px -6px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 6px -1px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 10px 2px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 14px 5px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 18px 8px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 18px 12px,
    radial-gradient(circle, var(--color) 15%, transparent 15%) 23px 6px;
  background-size: 50px 50px;
}
.container-fluid {
  overflow: hidden;
}
.btn-login {
  border: 2px solid #16b674bf;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: #171717 !important;
  outline: none;
  transition: all 0.2s ease;
  &:hover,
  &:focus,
  &:active {
    border: 2px solid #097c4f;
    background-color: var(--primary-color-hover) !important;
  }
}
input {
  font-size: 15px;
  border-radius: 8px;
  border: 2px solid var(--secondary-color);
  &:focus,
  &:active {
    box-shadow: none;
    border: 2px solid var(--primary-color);
  }
}
.forgot {
  color: #171717;
  text-decoration: none;
  &:hover {
    border-bottom: 1.5px solid #171717;
  }
}
</style>
