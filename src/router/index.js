import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@pages/NotFound.vue";
import Error from "@pages/Error.vue";
import BlankLayout from "@layouts/BlankLayout.vue";
import MainLayout from "@layouts/DefaultLayout.vue";
import MenuItems from "@components/Header/MenuBar/MenuItems";
import Login from "@pages/User/Login.vue";
import ForgotPassword from "@/pages/User/ForgotPassword.vue";

export const routes = [
  {
    path: "/inventory",
    redirect: "/inventory/tong-quan",
    component: MainLayout,
    requiresAuth: true,
    children: MenuItems,
  },
  {
    path: "/",
    redirect: "/dang-nhap",
    component: BlankLayout,
    requiresAuth: false,
    children: [
      {
        path: "dang-nhap",
        name: "dang-nhap",
        component: Login,
        meta: {
          requiresAuth: false,
          headerTitle: "Đăng nhập",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "quen-mat-khau",
        name: "quen-mat-khau",
        component: ForgotPassword,
        meta: {
          requiresAuth: false,
          headerTitle: "Quên mật khẩu",
          searchConfig: {},
          storeConfig: {},
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: NotFound,
    meta: {
      headerTitle: "404",
    },
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      headerTitle: "Error",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  // Cập nhật tiêu đề trang ngay khi điều hướng
  document.title = to.meta.headerTitle || "Default Title";
});

export default router;
