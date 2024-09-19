export default [
  {
    path: "tong-quan",
    name: "tong-quan",
    component: () => import("@/components/Page/Home/Home.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Tổng quan kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "thong-tin-tai-khoan",
    name: "thong-tin-tai-khoan",
    component: () => import("@/components/Page/Account/AccountInfo/AccountInfo.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Thông tin tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "quan-ly-tai-khoan",
    name: "quan-ly-tai-khoan",
    component: () => import("@/components/Page/Account/AccountManage/AccountManage.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Quản lý tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham",
    name: "san-pham",
    component: () => import("@components/Page/Product/ProductTab/ProductTab.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham/them-moi",
    name: "them-moi",
    component: () => import("@components/Page/Product/ProductForm/ProductForm.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Thêm sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "nhap",
    name: "nhap",
    component: () => import("@components/Page/Inbound/InboundTable/InboundTable.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "nhap/tao-phieu-nhap",
    name: "tao-phieu-nhap",
    component: () => import("@components/Page/Inbound/InboundDetail/InboundDetail.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Thêm nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "xuat",
    name: "xuat",
    component: () => import("@components/Page/Outbound/OutboundTable/OutboundTable.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "xuat/tao-phieu-xuat",
    name: "tao-phieu-xuat",
    component: () => import("@components/Page/Outbound/OutboundDetail/OutboundDetail.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Thêm xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "bao-cao",
    name: "bao-cao",
    component: () => import("@/components/Page/Report/Report.vue"),
    meta: {
      requiresAuth: false,
      headerTitle: "Báo cáo",
      searchConfig: {},
      storeConfig: {},
    },
  },
];
