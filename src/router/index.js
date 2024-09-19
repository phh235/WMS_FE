import { createRouter, createWebHistory } from "vue-router";
import BlankLayout from "@layouts/BlankLayout.vue";
import MenuItems from "@components/Header/MenuBar/MenuItems.js";
import Login from "@pages/User/Login.vue";
import { useAuthStore } from "@/store/auth";
import { showToastWarning } from "@components/Toast/utils/toastHandle.js";

export const routes = [
  {
    path: "/inventory",
    redirect: "/inventory/tong-quan",
    component: () => import("@layouts/DefaultLayout.vue"),
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
        component: () => import("@pages/User/ForgotPassword.vue"),
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
    component: () => import("@pages/NotFound.vue"),
    meta: {
      headerTitle: "404",
    },
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@pages/Error.vue"),
    meta: {
      headerTitle: "Error",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Update title when render component
  const title = to.meta.headerTitle || "Default Title";
  document.title = title;

  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn) {
      next({ name: "dang-nhap" });
      showToastWarning("Vui lòng đăng nhập");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
