export default [
  {
    path: "tong-quan",
    name: "tong-quan",
    component: () => import("@components/Page/Home/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Tổng quan kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "thong-tin-tai-khoan",
    name: "thong-tin-tai-khoan",
    component: () => import("@components/Page/Account/AccountInfo/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thông tin tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "thong-tin-tai-khoan",
    name: "thong-tin-tai-khoan",
    component: () => import("@components/Page/Account/AccountInfo/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thông tin tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "quan-ly-tai-khoan",
    name: "quan-ly-tai-khoan",
    component: () => import("@components/Page/Account/AccountManage/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham",
    name: "san-pham",
    component: () => import("@components/Page/Product/ProductTab/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham/them-moi",
    name: "them-moi",
    component: () => import("@components/Page/Product/ProductForm/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "nhap",
    name: "nhap",
    component: () => import("@components/Page/Inbound/InboundTable/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "nhap/tao-phieu-nhap",
    name: "tao-phieu-nhap",
    component: () => import("@components/Page/Inbound/InboundDetail/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "xuat",
    name: "xuat",
    component: () => import("@components/Page/Outbound/OutboundTable/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "xuat/tao-phieu-xuat",
    name: "tao-phieu-xuat",
    component: () => import("@components/Page/Outbound/OutboundDetail/index.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
];
