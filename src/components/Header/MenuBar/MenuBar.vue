<template>
  <div style="background-color: var(--background-color)!important">
    <nav class="navbar navbar-expand-xxl">
      <div class="container-fluid p-0">
        <router-link to="/inventory/home" class="navbar-brand">
          <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" width="40"
            alt="" class="ms-2 rounded-4" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop" aria-expanded="false" aria-label="Toggle navigation">
          <span class="material-symbols-outlined" style="transform: rotate(180deg); color:
            var(--nav-link-color);">side_navigation</span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fw-bold" id="staticBackdropLabel" style="color: var(--nav-link-color);">{{
              $t('Offcanvas') }}</h5>
            <!-- <button type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
            <span class="material-symbols-outlined text-muted custom-close" data-bs-dismiss="offcanvas"
              aria-label="Close" style="transform: rotate(180deg);">side_navigation</span>
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
                      <span class="ms-2 fw-bold" style="color: var(--nav-link-color);">{{ userStore.user.fullName
                        }}</span>
                      <span class="material-symbols-outlined ms-2">unfold_more</span>
                    </button>
                    <ul class="dropdown-menu box-shadow dropdown-menu-lg-end mt-2" aria-labelledby="dropdownMenuButton">
                      <small class="p-2 fw-bold" style="font-size: .75rem">Tài khoản</small>
                      <li>
                        <router-link to="/inventory/account-info" class="dropdown-item d-flex align-items-center mb-1"
                          aria-expanded="false">
                          <div class="d-flex flex-column">
                            <span class="fs mb-1 fw-bold">{{ userStore.user.fullName }}
                              <span class="badge ms-1 float-end box-shadow" style="
                                  background-color: var(--primary-color) !important;
                                  color: var(--btn-primary-color) !important;
                                  font-size: 13px;
                                  border-radius: 8px;
                                ">{{ userStore.user.role }}</span></span>
                            <span class="fs-sm">{{ userStore.user.email }}</span>
                          </div>
                        </router-link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                      </li>
                      <li>
                        <router-link to="/" class="btn btn-logout d-flex align-items-center justify-content-between"
                          href="#" @click.prevent="handleLogout">
                          <span style="font-size: 0.875rem"> Đăng xuất </span>
                          <span class="material-symbols-outlined float-end" style="color: #ef4444">logout</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <li class="nav-item d-flex align-items-center">
                <router-link to="/inventory/home" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">home</span>{{ $t('Navbar.menu_item.home') }}</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">request_page</span>
                  {{ $t('Navbar.menu_item.pr.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.pr.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/purchase-request/inbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.pr.sub_items.inbound') }}
                      </span>
                      <span class="material-symbols-outlined">input</span>
                    </router-link>
                  </li>
                  <li v-if="authStore.checkPermissions(['Admin', 'User'])">
                    <router-link to="/inventory/purchase-request/outbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.pr.sub_items.outbound') }}
                      </span>
                      <span class="material-symbols-outlined">output</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">shopping_cart</span>
                  {{ $t('Navbar.menu_item.po.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.po.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/purchase-order/inbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.po.sub_items.inbound') }}
                      </span>
                      <span class="material-symbols-outlined">input</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/purchase-order/outbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.po.sub_items.outbound') }}
                      </span>
                      <span class="material-symbols-outlined">output</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">history</span>
                  {{ $t('Navbar.menu_item.activity.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.activity.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/inbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.activity.sub_items.inbound') }}
                      </span>
                      <span class="material-symbols-outlined">input</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/outbound"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.activity.sub_items.outbound') }}
                      </span>
                      <span class="material-symbols-outlined">output</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.activity.sub_items.small_2') }}
                  </small>
                  <li>
                    <router-link to="/inventory/physical-warehouses"
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
                <router-link to="/inventory/products" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> grocery </span>
                  {{ $t('Navbar.menu_item.product') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/warehouses-management" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2">holiday_village</span>{{
                      $t('Navbar.menu_item.warehouses_management') }}</router-link>
              </li>
              <!-- multi dropdown menu | kho - khu vuc  -->
              <!-- <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2">holiday_village</span>
                  {{ $t('Navbar.menu_item.warehouses_management.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown">
                  <small class="p-2 fw-bold" style="font-size: .75rem">
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
              </li> -->
              <li class="nav-item">
                <router-link to="/inventory/lots-management" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> dataset </span>
                  {{ $t('Navbar.menu_item.lots') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/inventory/report" class="nav-link d-flex align-items-center"><span
                    class="material-symbols-outlined me-2"> flag </span>
                  {{ $t('Navbar.menu_item.report') }}
                </router-link>
              </li>
              <li class="nav-item dropdown" v-if="authStore.checkPermissions(['Admin'])">
                <a class="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-symbols-outlined me-2"> manufacturing </span>
                  {{ $t('Navbar.menu_item.config.label') }}
                  <span class="material-symbols-outlined ms-1">keyboard_arrow_down</span>
                </a>
                <ul class="dropdown-menu box-shadow" aria-labelledby="navbarDropdown"
                  style="max-height: 300px; overflow-y: auto;">
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.small_1') }}
                  </small>
                  <li>
                    <router-link to="/inventory/config/warehouses"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.warehouses') }}
                      </span>
                      <span class="material-symbols-outlined">warehouse</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.small_3') }}
                  </small>
                  <li>
                    <router-link to="/inventory/config/zones"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.zones') }}
                      </span>
                      <span class="material-symbols-outlined">pin_drop</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/config/zone-detail"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.zoneDetail') }}
                      </span>
                      <span class="material-symbols-outlined">activity_zone</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.small_5') }}
                  </small>
                  <li class="nav-item">
                    <router-link to="/inventory/config/lots-management"
                      class="nav-link d-flex align-items-center justify-content-between">
                      {{ $t('Navbar.menu_item.lots') }} <span class="material-symbols-outlined"> dataset </span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.small_2') }}
                  </small>
                  <li>
                    <router-link to="/inventory/config/categories"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.categories') }}
                      </span>
                      <span class="material-symbols-outlined">category</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.partner') }}
                  </small>
                  <li>
                    <router-link to="/inventory/config/customers"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.customer') }}
                      </span>
                      <span class="material-symbols-outlined">partner_exchange</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/inventory/config/suppliers"
                      class="dropdown-item d-flex align-items-center justify-content-between" aria-expanded="false">
                      <span class="fs">
                        {{ $t('Navbar.menu_item.config.sub_items.suppliers') }}
                      </span>
                      <span class="material-symbols-outlined">conveyor_belt</span>
                    </router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                  </li>
                  <small class="p-2 fw-bold" style="font-size: .75rem">
                    {{ $t('Navbar.menu_item.config.sub_items.small_4') }}
                  </small>
                  <li>
                    <router-link to="/inventory/config/account-management"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      {{ $t('Navbar.menu_item.config.sub_items.account') }}
                      <span class="material-symbols-outlined">
                        manage_accounts </span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item notification mt-2">
                <div class="dropdown">
                  <button class="btn btn-secondary d-flex align-items-center me-2  position-relative" type="button"
                    id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"
                    style="padding: 8px; transition: all 0.2s ease;">
                    <span class="material-symbols-outlined">
                      notifications
                    </span>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      6
                    </span>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end p-0" aria-labelledby="dropdownMenuButton"
                    style="width: 260px;">
                    <div class="card box-shadow">
                      <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                          <li v-for="notification in notifications" :key="notification.id"
                            class="list-group-item d-flex align-items-center px-3">
                            <span :class="['material-symbols-outlined me-3', getStatusClass(notification.status)]">
                              {{ getStatusIcon(notification.status) }}
                            </span>
                            <div>
                              <div class="fw-bold">{{ notification.title }}</div>
                              <small>{{ notification.time }}</small>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="d-flex align-items-center justify-content-center me-2">
              <div class="dropdown notifications">
                <button class="btn btn-secondary d-flex align-items-center me-2 position-relative" type="button"
                  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"
                  style="padding: 9px; transition: all 0.2s ease;">
                  <span class="material-symbols-outlined">
                    notifications
                  </span>
                  <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                    6
                  </span>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-0" aria-labelledby="dropdownMenuButton"
                  style="width: 350px;">
                  <div class="card box-shadow">
                    <div class="card-body p-0">
                      <ul class="list-group list-group-flush">
                        <li v-for="notification in notifications" :key="notification.id"
                          class="list-group-item d-flex align-items-center px-3">
                          <span :class="['material-symbols-outlined me-3', getStatusClass(notification.status)]">
                            {{ getStatusIcon(notification.status) }}
                          </span>
                          <div>
                            <div class="fw-bold">{{ notification.title }}</div>
                            <small>{{ notification.time }}</small>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-secondary d-flex align-items-center me-2"
                style="padding: 8px; transition: all 0.2s ease;" @click="toggleLightDarkMode">
                <span class="material-symbols-outlined">
                  {{ isLightMode ? 'light_mode' : 'dark_mode' }}
                </span>
              </button>
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
                    style="min-width: 220px !important">
                    <small class="p-2 fw-bold" style="font-size: .75rem">
                      {{ $t('Navbar.menu_item.account.sub_items.small_1') }}
                    </small>
                    <li>
                      <router-link to="/inventory/account-info" class="dropdown-item d-flex align-items-center mb-1"
                        aria-expanded="false">
                        <div class="d-flex flex-column">
                          <span class="fs mb-1 fw-bold">{{ userStore.user.fullName }}
                            <span class="badge ms-1 float-end box-shadow" style="
                                background-color: var(--primary-color) !important;
                                color: var(--btn-primary-color) !important;
                                font-size: 11px;
                                border-radius: 8px;
                              ">{{ userStore.user.role }}
                            </span>
                          </span>
                          <span class="fs-sm">{{ userStore.user.email }}</span>
                        </div>
                      </router-link>
                    </li>
                    <li>
                      <hr class="dropdown-divider" style="border-color: var(--border-main-color) !important;" />
                    </li>
                    <li>
                      <router-link to="/" class="btn btn-logout d-flex align-items-center justify-content-between"
                        href="#" @click.prevent="handleLogout">
                        <span style="font-size: 0.875rem">
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
      <span style="font-size: 1rem; font-weight: bold; color: var(--nav-link-color)">{{ headerTitle }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore.js";
import { useI18n } from "vue-i18n";
import { useLocalStorage } from "@vueuse/core";
import { updateTheme } from "@/theme/themeManager";
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const { t, locale } = useI18n()
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const isLightMode = useLocalStorage('isLightMode', true);

const tabs = ["VI", "EN"];
const activeTab = ref("VI");

const activeTabNoti = ref('Inbox');

const notifications = ref([
  { id: 1, title: "PO đã xác nhận yêu cầu của bạn", time: "1 giờ trước", status: "success" },
  { id: 2, title: "Có yêu cầu của PR cần xác nhận", time: "1 giờ trước", status: "warning" },
  { id: 3, title: "PO đã xác nhận yêu cầu của bạn", time: "2 giờ trước", status: "success" },
  { id: 4, title: "PO yêu cầu bạn chỉnh sửa lại yêu cầu", time: "2 giờ trước", status: "warning" },
  { id: 5, title: "PO đã hủy yêu cầu của bạn", time: "3 giờ trước", status: "cancel" },
  { id: 6, title: "PO đã hủy yêu cầu của bạn", time: "4 giờ trước", status: "cancel" },
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'success':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'cancel':
      return 'text-danger';
    default:
      return 'text-secondary';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return 'check_circle';
    case 'warning':
      return 'warning';
    case 'cancel':
      return 'cancel';
    default:
      return 'info';
  }
};

const changeLanguage = (tab) => {
  activeTab.value = tab;
  locale.value = tab === "VI" ? "vi" : "en";
  localStorage.setItem("language", tab);
  authStore.setLanguage(tab);
};

onMounted(() => {
  userStore.loadUserFromSession();
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

watch(isLightMode, (newValue) => {
  updateTheme(newValue)
}, { immediate: true })

const toggleLightDarkMode = () => {
  isLightMode.value = !isLightMode.value;
  updateTheme(isLightMode.value);
}
</script>

<style scoped>
.fs {
  font-size: 0.875rem;
}

.sub-nav {
  min-height: 30px !important;
  border-bottom: 1px solid var(--border-main-color);
}

.navbar {
  padding: 10px !important;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--nav-link-color) !important;
  border-radius: 0.625rem;
  transition: all 0.2s ease;
  padding: 8px !important;
  line-height: 24px;

  &:hover {
    color: var(--nav-link-color);
    background-color: var(--nav-link-hover);
  }

  &:focus,
  &:active {
    color: var(--nav-link-color);
  }
}

.navbar-brand,
.layout-end .nav-link {
  display: flex;
  align-items: center;
  height: 40px;
}

.dropdown-menu {
  min-width: 180px;
  padding: 8px;
  border-radius: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--border-main-color);
}

.dropdown-item {
  font-size: 0.875rem;
  padding: 8px;
  border-radius: 0.625rem;
  transition: all 0.2s ease;
  color: var(--nav-link-color);

  &:hover {
    background-color: var(--secondary-color);
    color: var(--nav-link-color);
  }

  &:focus,
  &:active {
    background-color: var(--secondary-color);
    color: var(--nav-link-color);
  }
}

.navbar-toggler {
  border: none;

  &:focus,
  &:active {
    box-shadow: none;
  }
}

.logout-text {
  display: none;
}

.mobile-layout-end {
  display: none;
}

.notification {
  display: none;
}

@media screen and (max-width: 1400px) {
  .offcanvas {
    margin: 8px;
    border-radius: 12px;
    width: 300px !important;
    background-color: var(--background-color);
    transition: all 0.2s ease;
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
    color: var(--btn-logout-color);
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

  .notification {
    display: unset;
  }

  .notifications {
    display: none;
  }

  .nav-link {
    font-size: 15px;
  }

  .material-symbols-outlined {
    font-size: 20px;
  }

  .fs {
    font-size: 0.875rem;
  }

  .dropdown-menu {
    margin-bottom: 10px !important;
  }

  .tab-button {
    padding: 6px 40px !important;
    max-width: fit-content;
  }
}

.nav-item .material-symbols-outlined {
  color: #94a3b8;
  transition: all 0.2s ease;
}

.custom-close {
  position: absolute;
  color: var(--nav-link-color) !important;
  right: 1rem;
  cursor: pointer;
  border: none;

  &:hover,
  &:focus,
  &:active {
    border: none;
  }
}

.btn-secondary {
  background-color: var(--background-color) !important;
  border: 1.5px solid var(--border-main-color) !important;

  &:focus,
  &:active {
    background-color: var(--background-color) !important;
    border: 1.5px solid var(--border-main-color) !important;
  }
}

.card {
  border: none;
  outline: none;
}

.card,
.list-group {
  border-radius: 1rem;
}

.card,
.list-group-item {
  background-color: var(--background-color);
  color: var(--nav-link-color);
}

.list-group-item {
  border-color: var(--border-main-color);

  &:hover {
    background-color: var(--secondary-color);
    cursor: pointer;
  }
}
</style>
