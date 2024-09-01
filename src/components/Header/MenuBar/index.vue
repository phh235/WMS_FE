<template>
  <div style="background-color: #fff !important">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/inventory/tong-quan">
          <img
            src="https://res.cloudinary.com/dc1txyr7b/image/upload/v1724138470/th78gsygvjv2wm7zbwh7.png"
            width="30"
            alt=""
            class="me-2"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="material-symbols-outlined"> view_cozy </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-lg-0">
            <li class="nav-item">
              <router-link to="/inventory/tong-quan" class="nav-link">Tổng quan</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link
                to="/inventory/nhap"
                class="nav-link d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hoạt động <span class="material-symbols-outlined ms-2"> keyboard_arrow_down </span>
              </router-link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link to="/inventory/nhap" class="dropdown-item d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> download </span> Nhập kho
                  </router-link>
                </li>
                <li>
                  <router-link to="/inventory/xuat" class="dropdown-item d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> upload </span> Xuất kho
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/inventory/san-pham" class="nav-link">Sản phẩm</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Báo cáo</a>
            </li>
            <li class="nav-item dropdown">
              <router-link
                to="/inventory/nhap"
                class="nav-link d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Quản lý tài khoản
                <span class="material-symbols-outlined ms-2"> keyboard_arrow_down </span>
              </router-link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link to="/inventory/nhap" class="dropdown-item d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> download </span> Cấp tài khoản
                  </router-link>
                </li>
                <li>
                  <router-link to="/inventory/xuat" class="dropdown-item d-flex align-items-center">
                    <span class="material-symbols-outlined me-2"> upload </span> aaa
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <div class="dropdown">
              <button
                class="btn btn-dropdown d-flex align-items-center ms-2"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="text-dark me-2" style="font-size: 14px">phh235</span>
                <img
                  src="https://avatars.githubusercontent.com/u/121915529?v=4"
                  alt="Avatar"
                  class="rounded-circle"
                  width="32"
                  height="32"
                />
              </button>
              <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <span class="material-symbols-outlined me-2">person</span>
                    Thông tin
                  </a>
                </li>
                <li>
                  <router-link to="/" class="dropdown-item d-flex align-items-center" href="#">
                    <span class="material-symbols-outlined me-2">logout</span> Đăng
                    xuất</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="sub-nav mt-2">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-primary text-light d-flex align-items-center me-2"
            :class="{ 'd-none': !isVisible }"
            @click="handleNewClick"
          >
            <span class="material-symbols-outlined me-2">add</span> Mới
          </button>
          <div class="d-flex flex-column">
            <span class="mb-1" style="font-size: 14px">Tổng quan tồn kho</span>
            <!-- <span class="text-sm">phh235</span> -->
          </div>
        </div>
        <SearchBar />
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchBar from "@components/Common/SearchBar/index.vue";

const route = useRoute();
const router = useRouter();

const isVisible = computed(() => {
  return (
    route.path === "/inventory/nhap" ||
    route.path === "/inventory/xuat" ||
    route.path === "/inventory/san-pham"
  );
});

const handleNewClick = () => {
  if (route.path === "/inventory/nhap") {
    router.push("/inventory/nhap/tao-phieu-nhap");
  } else if (route.path === "/inventory/xuat") {
    router.push("/inventory/xuat/tao-phieu-xuat");
  } else if (route.path === "/inventory/san-pham") {
    router.push("/inventory/san-pham/them-moi");
  }
};
</script>

<style scoped>
.sub-nav {
  box-shadow: inset 0 -1px rgba(0, 0, 0, 0.08);
  padding-bottom: 15px;
}
.navbar {
  padding: 10px !important;
}
.navbar-brand {
  font-weight: bold;
  color: #41b883 !important;
}
.nav-link {
  font-size: 14px;
  color: #000 !important;
  border-radius: 6px;
  margin-right: 5px;
  transition: all 0.1s ease;
  padding: 8px 10px !important;
}
.nav-link:hover {
  background-color: var(--secondary-color);
  border-radius: 6px;
}
.dropdown-menu {
  padding: 8px;
}
.dropdown-item {
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.1s ease;
  &:hover {
    background-color: var(--secondary-color);
    padding: 8px;
  }
  &:focus {
    color: #000;
  }
}
.btn-dropdown {
  color: #000;
  border: none;
  &:hover,
  &:focus,
  &:active {
    color: #000;
  }
}
.navbar-toggler {
  border: none;
  &:focus,
  &:active {
    box-shadow: none;
  }
}
input {
  font-size: 14px;
  border: 1px solid #dee2e6;
  &:focus,
  &:active {
    box-shadow: none;
    border: 1px solid #dee2e6;
  }
}
</style>
