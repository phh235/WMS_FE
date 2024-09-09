<template>
  <div style="background-color: #fff !important">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/inventory/tong-quan" class="navbar-brand">
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
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="material-symbols-outlined">side_navigation</span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">Quản lý tồn kho</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style="box-shadow: none"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/inventory/tong-quan" class="nav-link">Tổng quan</router-link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hoạt động <span class="material-symbols-outlined ms-2">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link
                      to="/inventory/nhap"
                      class="dropdown-item d-flex align-items-center"
                    >
                      <span class="material-symbols-outlined me-2">download</span> Nhập kho
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/inventory/xuat"
                      class="dropdown-item d-flex align-items-center"
                    >
                      <span class="material-symbols-outlined me-2">upload</span> Xuất kho
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
              <li class="nav-item">
                <router-link to="/inventory/quan-ly-kho" class="nav-link">Quản lý kho</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/quan-ly-tai-khoan" class="nav-link"
                  >Quản lý tài khoản</router-link
                >
              </li>
            </ul>
            <div class="layout-end">
              <div class="d-flex align-items-center">
                <router-link
                  to="/inventory/thong-tin-tai-khoan"
                  class="nav-link d-flex align-items-center"
                  aria-expanded="false"
                >
                  <span class="text-dark me-2 fs">phh235</span>
                  <img
                    src="https://avatars.githubusercontent.com/u/121915529?v=4"
                    alt="Avatar"
                    class="rounded-circle"
                    width="30"
                  />
                </router-link>
                <router-link to="/" class="d-flex align-items-center btn-logout">
                  <span class="material-symbols-outlined">logout</span>
                  <span class="logout-text fs">Đăng xuất</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="sub-nav mt-2 px-1">
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
            <span class="mb-1" style="font-size: 14px">{{ headerTitle }}</span>
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
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchBar from "@components/Common/SearchBar/index.vue";

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
</script>

<style scoped>
.fs {
  font-size: 14px;
}
.sub-nav {
  box-shadow: inset 0 -1px rgba(0, 0, 0, 0.08);
  padding-bottom: 10px;
}
.navbar {
  padding: 10px !important;
}
.nav-link {
  font-size: 14px;
  color: #000 !important;
  border-radius: 6px;
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
  border-radius: 6px;
}
.dropdown-menu {
  padding: 8px;
}
.dropdown-item {
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.1s;
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
  border-radius: 6px;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--secondary-color);
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
.btn-logout {
  text-decoration: none;
  padding: 10px;
  /* background-color: var(--btn-logout-bg);
  color: #171717;
  border: 2px solid var(--btn-logout-border); */
  background-color: var(--btn-logout-bg-hover);
  border: 2px solid var(--btn-logout-border-hover);
  color: #171717;
  border-radius: 6px;
  /* transition: all 0.2s;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--btn-logout-bg-hover);
    border: 2px solid var(--btn-logout-border-hover);
    color: #171717;
  } */
}
.view-info {
  padding: 8px;
  margin-right: 7px;
  color: #000;
  border: none;
  border-radius: 6px;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--secondary-color);
    color: #000;
  }
}
@media (max-width: 991.98px) {
  .offcanvas {
    padding-right: 10px;
    width: 260px !important;
    transition: all 0.3s ease-in-out;
  }
  .offcanvas-body .nav-link {
    background-color: transparent;
  }
  .offcanvas-body .navbar-nav {
    align-items: flex-start;
    width: 100%;
  }
  .offcanvas-body {
    padding: 10px;
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
    background-color: var(--btn-logout-bg-hover);
    border: 2px solid var(--btn-logout-border-hover);
    color: #171717;
  }
  .logout-text {
    margin-left: 6px;
    display: inline;
  }
  .layout-end > .d-flex {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
  .nav-link {
    font-size: 15px;
  }
  .fs {
    font-size: 15px;
  }
}
</style>
