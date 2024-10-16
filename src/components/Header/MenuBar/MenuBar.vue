<template>
  <div style="background-color: #fff !important">
    <nav class="navbar navbar-expand-xxl">
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
                    <ul class="dropdown-menu box-shadow dropdown-menu-lg-end mt-2" aria-labelledby="dropdownMenuButton">
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
                    class="material-symbols-outlined me-2">home</span>{{ $t('Navbar.menu_item.home') }}</router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/yeu-cau-mua-hang" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> request_page </span> {{ $t('Navbar.menu_item.pr') }}
                </router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/dat-hang" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">shopping_cart </span> {{ $t('Navbar.menu_item.po') }}
                </router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">history</span>
                  {{ $t('Navbar.menu_item.activity.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">
                    {{ $t('Navbar.menu_item.activity.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/nhap"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.activity.sub_items.inbound') }}
                      </span>
                      <span class="material-symbols-outlined">input</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/xuat"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.activity.sub_items.outbound') }}
                      </span>
                      <span class="material-symbols-outlined">output</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: 12px">
                    {{ $t('Navbar.menu_item.activity.sub_items.small_2') }}
                  </small>
                  <li>
                    <router-link to="/inventory/ton-kho-vat-ly"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.activity.sub_items.physical_warehouses') }}
                      </span>
                      <span class="material-symbols-outlined">inventory_2</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/san-pham" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> nutrition </span>
                  {{ $t('Navbar.menu_item.product') }}
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/inventory/quan-ly-kho" class="nav-link">Quản lý kho</router-link>
              </li> -->
              <li class="nav-item">
                <router-link to="/inventory/quan-ly-tai-khoan" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> manage_accounts </span>
                  {{ $t('Navbar.menu_item.account_management') }}
                </router-link>
              </li>
              <!-- multi dropdown menu | kho - khu vuc  -->
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">holiday_village</span>
                  {{ $t('Navbar.menu_item.warehouses_management.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">
                    {{ $t('Navbar.menu_item.warehouses_management.small') }}
                  </small>
                  <li>
                    <router-link to="/inventory/quan-ly-kho"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.warehouses_management.sub_items.normal') }}
                      </span>
                      <span class="material-symbols-outlined">width_normal</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/kho-lanh"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.warehouses_management.sub_items.cold') }}
                      </span>
                      <span class="material-symbols-outlined">ac_unit</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/bao-cao" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> flag </span>
                  {{ $t('Navbar.menu_item.report') }}
                </router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2"> manufacturing </span>
                  {{ $t('Navbar.menu_item.config.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: 12px">
                    {{ $t('Navbar.menu_item.config.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/cau-hinh/kho-hang"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="text-dark fs">
                        {{ $t('Navbar.menu_item.config.sub_items.warehouses') }}
                      </span>
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
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.zones') }}
                      </span>
                      <span class="material-symbols-outlined">pin_drop</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: 12px">
                    {{ $t('Navbar.menu_item.config.sub_items.small_2') }}
                  </small>
                  <li>
                    <router-link to="/inventory/cau-hinh/danh-muc"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="text-dark fs">
                        {{ $t('Navbar.menu_item.config.sub_items.categories') }}
                      </span>
                      <span class="material-symbols-outlined">category</span>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="d-flex align-items-center justify-content-center me-2">
              <div class="tab-container">
                <button v-for="tab in tabs" :key="tab" @click="changeLanguage(tab)"
                  :class="['tab-button', { active: activeTab === tab }]">
                  {{ tab }}
                </button>
              </div>
            </div>
            <div class="layout-end">
              <div class="d-flex align-items-center">
                <div class="dropdown">
                  <button class="nav-link d-flex align-items-center" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://avatars.githubusercontent.com/u/121915529?v=4" alt="Avatar"
                      style="border-radius: 5px" width="30" />
                    <span class="material-symbols-outlined ms-2">unfold_more</span>
                  </button>
                  <ul class="dropdown-menu box-shadow dropdown-menu-lg-end mt-2" aria-labelledby="dropdownMenuButton"
                    style="min-width: 170px !important">
                    <small class="p-2 fw-bold" style="font-size: 12px">
                      {{ $t('Navbar.menu_item.account.sub_items.small_1') }}
                    </small>
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
                        <span style="font-size: 14px">
                          {{ $t('Navbar.menu_item.account.sub_items.logout') }}
                        </span>
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
    <div class="sub-nav d-flex justify-content-center">
      <span style="font-size: 16px; font-weight: bold">{{ headerTitle }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n()
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const tabs = ["VI", "EN"];
const activeTab = ref("VI");

const changeLanguage = (tab) => {
  activeTab.value = tab;
  locale.value = tab === "VI" ? "vi" : "en";
  localStorage.setItem("language", tab);
  authStore.setLanguage(tab);
};

onMounted(() => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  }
})

// Sử dụng computed để lấy giá trị headerTitle từ meta của route hiện tại
const headerTitle = computed(() => route.meta.headerTitle || "Default Title");

// Theo dõi sự thay đổi của route và cập nhật tiêu đề trang
watchEffect(() => {
  document.title = headerTitle.value;
});

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
  min-height: 35px !important;
  max-height: 35px !important;
  box-shadow: inset 0 -1px rgba(228, 228, 231, 1);
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
  min-width: 190px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
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

@media screen and (max-width: 1400px) {
  .offcanvas {
    width: 300px !important;
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
    font-size: 15px;
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

  .tab-button {
    padding: 6px 50px !important;
    max-width: fit-content;
  }
}

.nav-item .material-symbols-outlined {
  color: #94a3b8;
}

.tab-container {
  background-color: #f4f4f5;
  border-radius: 12px;
  padding: 4px;
  max-width: fit-content;
}

.tab-button {
  padding: 4px 10px;
  border: none;
  background-color: transparent;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  font-size: 14px;
}

.tab-button.active {
  background-color: white;
  color: #000;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);

  &:hover {
    background-color: white;
  }
}
</style>
