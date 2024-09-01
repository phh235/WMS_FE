import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@pages/NotFound.vue";
import Error from "@pages/Error.vue";
import BlankLayout from "@layouts/BlankLayout.vue";
import MainLayout from "@layouts/DefaultLayout.vue";
import MenuItems from "@components/Header/MenuBar/MenuItems";
import Login from "@pages/Login/Login.vue";

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
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: NotFound,
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async () => {
  // check auth
});

export default router;
