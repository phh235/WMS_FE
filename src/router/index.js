import { createRouter, createWebHistory } from "vue-router";
import BlankLayout from "@layouts/BlankLayout.vue";
import MenuItems from "@components/Header/MenuBar/MenuItems.js";
import Login from "@pages/User/Login.vue";
import { useAuthStore } from "@/store/authStore";
import { showToastWarning, showToastLoading } from "@/components/Toast/utils/toastHandle";

export const routes = [
  {
    path: "/inventory",
    redirect: "/inventory/home",
    component: () => import("@layouts/DefaultLayout.vue"),
    requiresAuth: true,
    children: MenuItems,
  },
  {
    path: "/",
    redirect: "/login",
    component: BlankLayout,
    requiresAuth: false,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          requiresAuth: false,
          headerTitle: "Đăng nhập",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
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
  routes: routes,
});

// Chặn quay lại trang của trình duyệt
router.afterEach((to) => {
  if (to.path === "/login") {
    // Đẩy thêm một trạng thái mới để chặn việc quay lại
    window.history.pushState(null, "", "/login");
  }
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cập nhật title khi thay đổi component dựa trên headerTitle được cấu hình trong router(index.js)
  const title = to.meta.headerTitle || "Default Title";
  document.title = title;

  // Nếu trang yêu cầu xác thực
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = authStore.checkAuth(); // Gọi hàm kiểm tra xác thực

    // Nếu không xác thực (token đã hết hạn hoặc không có token)
    if (!isAuthenticated) {
      // Kiểm tra xem token có tồn tại không
      const token = localStorage.getItem("token");
      if (token) {
        // Nếu token tồn tại nhưng không hợp lệ, hiển thị thông báo "Phiên đăng nhập đã hết hạn"
        showToastLoading("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      } else {
        // Lưu URL hiện tại mà người dùng muốn truy cập
        localStorage.setItem("redirectPath", to.fullPath);
        // Nếu không có token, hiển thị thông báo "Vui lòng đăng nhập"
        showToastWarning("Vui lòng đăng nhập để sử dụng!");
        return next({ name: "login" }); // Chuyển hướng đến trang đăng nhập
      }
      return next({ name: "login" }); // Chuyển hướng đến trang đăng nhập
    }

    // Nếu đã xác thực
    next(); // Chuyển hướng bình thường
  } else {
    next(); // Chuyển hướng bình thường
  }
});

export default router;
