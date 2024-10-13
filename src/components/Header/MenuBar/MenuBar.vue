<template>
  <div style="background-color: #fff !important">
    <nav class="navbar navbar-expand-xl">
      <div class="container-fluid p-0">
        <router-link to="/inventory/tong-quan" class="navbar-brand">
          <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" width="40"
            alt="" class="ms-2 rounded-4" />
          <!-- <span class="ms-1 fw-bold" style="font-size: 17px">Inventory</span> -->
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop" aria-expanded="false" aria-label="Toggle navigation">
          <span class="material-symbols-outlined">side_navigation</span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fw-bold" id="staticBackdropLabel">Quản lý tồn kho</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
              style="box-shadow: none"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <div class="mobile-layout-end">
                <div class="d-flex align-items-center">
                  <div class="dropdown">
                    <button class="nav-link d-flex align-items-center" type="button" id="dropdownMenuButton"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://avatars.githubusercontent.com/u/121915529?v=4" alt="Avatar"
                        style="border-radius: 5px" width="30" />
                      <span class="ms-2 text-dark fw-bold">Phan Huy Hoàng</span>
                      <span class="material-symbols-outlined ms-2">unfold_more</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-lg-end mt-2" aria-labelledby="dropdownMenuButton">
                      <small class="p-2 fw-bold" style="font-size: 12px">Tài khoản</small>
                      <li>
                        <router-link to="/inventory/thong-tin-tai-khoan"
                          class="dropdown-item d-flex align-items-center mb-1" aria-expanded="false">
                          <div class="d-flex flex-column">
                            <span class="text-dark fs mb-1 fw-bold">Phan Huy Hoàng
                              <span class="badge ms-1 float-end box-shadow" style="
                                  background-color: var(--primary-color) !important;
                                  color: #fff !important;
                                  font-size: 13px;
                                  border-radius: 8px;
                                ">Admin</span></span>
                            <span class="fs-sm">phanhuyhoang.dev@gmail.com</span>
                          </div>
                        </router-link>
                      </li>
                      <!-- <li>
                        <router-link
                          to="/inventory/ngon-ngu"
                          class="dropdown-item d-flex align-items-center justify-content-between"
                          aria-expanded="false"
                        >
                          <span class="text-dark fs">Ngôn ngữ</span>
                          <span class="material-symbols-outlined">language</span>
                        </router-link>
                      </li> -->
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <router-link to="/" class="btn btn-logout d-flex align-items-center justify-content-between"
                          href="#" @click.prevent="handleLogout">
                          <span style="font-size: 14px"> Đăng xuất </span>
                          <span class="material-symbols-outlined float-end" style="color: #ef4444">logout</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/tong-quan" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">home</span>Tổng quan</router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/yeu-cau-mua-hang" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">request_page </span>Mua
                  hàng</router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/dat-hang" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">shopping_cart </span>Đặt
                  hàng</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">history</span>
                  Hoạt động
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">Điều chuyển</small>
                  <li>
                    <router-link to="/inventory/nhap"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Nhập kho</span>
                      <span class="material-symbols-outlined">input</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/xuat"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Xuất kho</span>
                      <span class="material-symbols-outlined">output</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: 12px">Điều chỉnh</small>
                  <li>
                    <router-link to="/inventory/ton-kho-vat-ly"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Tồn kho vật lý</span>
                      <span class="material-symbols-outlined">inventory_2</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/san-pham" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> nutrition </span>Sản
                  phẩm</router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/inventory/quan-ly-kho" class="nav-link">Quản lý kho</router-link>
              </li> -->
              <li class="nav-item">
                <router-link to="/inventory/quan-ly-tai-khoan" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> manage_accounts </span>Quản lý tài
                  khoản</router-link>
              </li>
              <!-- multi dropdown menu | kho - khu vuc  -->
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">holiday_village</span>
                  Quản lý kho
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">Kho theo khu vực</small>
                  <li>
                    <router-link to="/inventory/quan-ly-kho"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Kho thường</span>
                      <span class="material-symbols-outlined">width_normal</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/kho-lanh"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Kho lạnh</span>
                      <span class="material-symbols-outlined">ac_unit</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/bao-cao" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> flag </span>Báo cáo</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2"> manufacturing </span>
                  Cấu hình
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">Quản lý kho hàng</small>
                  <li>
                    <router-link to="/inventory/cau-hinh/kho-hang"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="text-dark fs">Kho hàng</span>
                      <span class="material-symbols-outlined">warehouse</span>
                    </router-link>
                  </li>
                  <!-- <li>
                    <router-link
                      to="/inventory/cau-hinh/loai-kho"
                      class="dropdown-item d-flex align-items-center justify-content-between"
                      aria-expanded="false"
                    >
                      <span class="text-dark fs">Loại kho</span>
                      <span class="material-symbols-outlined">format_list_bulleted</span>
                    </router-link>
                  </li> -->
                  <li>
                    <router-link to="/inventory/cau-hinh/khu-vuc"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">Khu vực</span>
                      <span class="material-symbols-outlined">pin_drop</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: 12px">Sản phẩm</small>
                  <li>
                    <router-link to="/inventory/cau-hinh/danh-muc"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="text-dark fs">Danh mục</span>
                      <span class="material-symbols-outlined">category</span>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="layout-end">
              <div class="d-flex align-items-center">
                <div class="dropdown">
                  <button class="nav-link d-flex align-items-center" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://avatars.githubusercontent.com/u/121915529?v=4" alt="Avatar"
                      style="border-radius: 5px" width="30" />
                    <span class="material-symbols-outlined ms-2">unfold_more</span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-lg-end mt-2" aria-labelledby="dropdownMenuButton"
                    style="min-width: 170px !important">
                    <small class="p-2 fw-bold" style="font-size: 12px">Tài khoản</small>
                    <li>
                      <router-link to="/inventory/thong-tin-tai-khoan"
                        class="dropdown-item d-flex align-items-center mb-1" aria-expanded="false">
                        <div class="d-flex flex-column">
                          <span class="text-dark fs mb-1 fw-bold">Phan Huy Hoàng
                            <span class="badge ms-1 float-end box-shadow" style="
                                background-color: var(--primary-color) !important;
                                color: #fff !important;
                                font-size: 11px;
                                border-radius: 8px;
                              ">Admin</span></span>
                          <span class="fs-sm">phanhuyhoang.dev@gmail.com</span>
                        </div>
                      </router-link>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <router-link to="/" class="btn btn-logout d-flex align-items-center justify-content-between"
                        href="#" @click.prevent="handleLogout">
                        <span style="font-size: 14px"> Đăng xuất </span>
                        <span class="material-symbols-outlined float-end" style="color: #ef4444">logout</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="sub-nav px-3 d-flex position-relative" style="overflow-x: hidden">
      <button class="btn btn-primary text-light d-flex align-items-center justify-content-center"
        :class="{ 'd-none': !isVisible }" @click="handleNewClick" style="z-index: 999">
        <span class="material-symbols-outlined me-2">add</span> Mới
      </button>
      <div class="position-absolute w-100 d-flex justify-content-center mt-2" style="max-width: 95%">
        <span style="font-size: 16px; font-weight: bold">{{ headerTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

// Sử dụng computed để lấy giá trị headerTitle từ meta của route hiện tại
const headerTitle = computed(() => route.meta.headerTitle || "Default Title");

// Theo dõi sự thay đổi của route và cập nhật tiêu đề trang
watchEffect(() => {
  document.title = headerTitle.value;
});

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

const handleLogout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.fs {
  font-size: 14px;
}

.sub-nav {
  min-height: 65px !important;
  max-height: 65px !important;
  box-shadow: inset 0 -1px rgba(0, 0, 0, 0.08);
  padding: 12px;
}

.navbar {
  padding: 10px !important;
}

.nav-link {
  font-size: 14px;
  color: #000;
  border-radius: calc(.75rem - 2px);
  margin-right: 5px;
  transition: all 0.1s;
  padding: 8px !important;
  line-height: 24px;
}

.navbar-brand,
.layout-end .nav-link {
  display: flex;
  align-items: center;
  height: 40px;
}

.nav-link:hover {
  background-color: var(--secondary-color);
}

.dropdown-menu {
  padding: 8px;
  border-radius: 16px;
  border: 1.5px solid #e6e6e6;
}

.dropdown-item {
  font-size: 14px;
  padding: 8px;
  border-radius: calc(.75rem - 2px);
  transition: all 0.1s;

  &:hover {
    background-color: var(--secondary-color);
  }

  &:focus {
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

.logout-text {
  display: none;
}

.mobile-layout-end {
  display: none;
}

@media (max-width: 1200.98px) {
  .offcanvas {
    width: 260px !important;
    transition: all 0.3s ease-in-out;
  }

  .btn-close {
    padding-right: 10px !important;
  }

  .offcanvas-body .nav-link {
    background-color: transparent;
  }

  .offcanvas-body .navbar-nav {
    align-items: flex-start;
    width: 100%;
  }

  .offcanvas-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn-logout {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    background-color: #fef2f2;
    /* border: 2px solid var(--btn-logout-border-hover); */
    color: #ef4444;
  }

  .logout-text {
    margin-left: 6px;
    display: inline;
  }

  .layout-end {
    display: none;
  }

  .mobile-layout-end {
    display: unset;
  }

  .nav-link {
    font-size: 16px;
  }

  .material-symbols-outlined {
    font-size: 20px;
  }

  .fs {
    font-size: 14px;
  }

  .dropdown-menu {
    margin-bottom: 10px !important;
  }
}

.nav-item .material-symbols-outlined {
  color: #94a3b8;
}
</style>
