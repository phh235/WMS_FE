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
            <h2 class="text-center mb-1 fw-bold">CHÀO MỪNG TRỞ LẠI</h2>
            <h6 class="text-center mb-5">Vui lòng đăng nhập để tiếp tục</h6>
            <form style="width: 23rem">
              <!-- Username input -->
              <div class="form-floating mb-2">
                <input type="text" id="username" class="form-control" placeholder="1" required />
                <label class="form-label" for="username" style="font-size: 14px"
                  >Tên người dùng</label
                >
              </div>
              <!-- Password input -->
              <div class="form-floating mb-2">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="1"
                  required
                />
                <label class="form-label" for="password" style="font-size: 14px">Mật khẩu</label>
              </div>
              <div class="mb-2 text-end">
                <router-link to="/quen-mat-khau" class="forgot"> Quên mật khẩu? </router-link>
              </div>
              <!-- Submit button -->
              <button class="btn btn-login text-dark w-100" @click="login">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const login = async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "123") {
    // Swal.fire({
    //   title: "Đăng nhập thành công",
    //   text: "Chào mừng quay trở lại 👋!",
    //   icon: "success",
    //   timer: 1600,
    //   timerProgressBar: true,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    router.push("/inventory/tong-quan");
    // }).then(() => {
    //   setTimeout(function () {
    //   }, 200);
    // });
  } else if (username === "" && password === "") {
    Swal.fire({
      title: "Đăng nhập thất bại!",
      text: "Tài khoản và mật khẩu không được để trống!",
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      title: "Đăng nhập thất bại!",
      text: "Tài khoản hoặc mật khẩu không đúng!",
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  // bỏ comment nếu call api login
  // try {
  //   const response = await axios.post("API_LOGIN_ENDPOINT", {
  //     username: username,
  //     password: password,
  //   });

  //   if (response.data.success) {
  //     Swal.fire({
  //       title: "Đăng nhập thành công!",
  //       text: "Chào mừng bạn đã đăng nhập thành công!",
  //       icon: "success",
  //       timer: 2000,
  //       allowOutsideClick: false,
  //     }).then(() => {
  //       router.push("/inventory/tong-quan");
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Đăng nhập thất bại!",
  //       text: response.data.message || "Tài khoản hoặc mật khẩu không đúng!",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // } catch (error) {
  //   Swal.fire({
  //     title: "Đăng nhập thất bại!",
  //     text: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!",
  //     icon: "error",
  //     confirmButtonText: "OK",
  //   });
  // }
};
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
}
.btn-login {
  border: 2px solid #16b674bf;
  font-weight: 500;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: #171717 !important;
  outline: none;
  transition: all 0.2s;
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
