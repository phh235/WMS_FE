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
      headerTitle: "Nhập hàng",
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
      headerTitle: "Xuất hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
];
