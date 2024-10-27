import i18n from "@/lang/i18n";

export default [
  {
    path: "tong-quan",
    name: "tong-quan",
    component: () => import("@/components/Page/Home/Home.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: i18n.global.t("Home.headerTitle"),
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "quan-ly-kho",
    name: "quan-ly-kho",
    component: () => import("@/components/Page/WarehouseManagement/WarehouseManagement.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "thong-tin-tai-khoan",
    name: "thong-tin-tai-khoan",
    component: () => import("@/components/Page/Account/AccountInfo/AccountInfo.vue"),
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
    component: () => import("@/components/Page/Account/AccountManage/AccountManage.vue"),
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
    component: () => import("@components/Page/Product/Product.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham/them-moi",
    name: "san-pham/them-moi",
    component: () => import("@components/Page/Product/ProductForm/ProductForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "san-pham/chinh-sua/:id",
    name: "san-pham/chinh-sua/:id",
    component: () => import("@components/Page/Product/ProductForm/ProductForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "nhap",
    name: "nhap",
    component: () => import("@components/Page/Inbound/InboundTable/InboundTable.vue"),
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
    component: () => import("@components/Page/Inbound/InboundDetail/InboundDetail.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "xuat",
    name: "xuat",
    component: () => import("@components/Page/Outbound/OutboundTable/OutboundTable.vue"),
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
    component: () => import("@components/Page/Outbound/OutboundDetail/OutboundDetail.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "ton-kho-vat-ly",
    name: "ton-kho-vat-ly",
    component: () => import("@components/Page/PhysicalInventory/PhysicalInventory.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Hàng tồn kho vật lý",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "bao-cao",
    name: "bao-cao",
    component: () => import("@/components/Page/Report/Report.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Báo cáo",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "yeu-cau-mua-hang",
    name: "yeu-cau-mua-hang",
    component: () => import("@/components/Page/PurchaseRequest/PurchaseRequest.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Yêu cầu mua hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "yeu-cau-mua-hang/them-moi",
    name: "yeu-cau-mua-hang/them-moi",
    component: () =>
      import("@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm yêu cầu mua hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "yeu-cau-mua-hang/chinh-sua/:id",
    name: "yeu-cau-mua-hang/chinh-sua/:id",
    component: () =>
      import("@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa yêu cầu mua hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "dat-hang",
    name: "dat-hang",
    component: () => import("@/components/Page/PurchaseOrder/PurchaseOrder.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Đặt hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "dat-hang/tao-don-dat-hang",
    name: "dat-hang/tao-don-dat-hang",
    component: () =>
      import("@/components/Page/PurchaseOrder/PurchaseOrderForm/PurchaseOrderForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Tạo đơn đặt hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "quan-ly-lo-hang",
    name: "quan-ly-lo-hang",
    component: () => import("@/components/Page/LotsManagement/LotsManagement.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý lô hàng",
    },
    children: [
      {
        path: "lots-normal",
        name: "lots-normal",
        component: () => import("@/components/Page/LotsManagement/LotsNormal/LotsNormal.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho thường",
        },
      },
      {
        path: "lots-cold",
        name: "lots-cold",
        component: () => import("@/components/Page/LotsManagement/LotsCold/LotsCold.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho lạnh",
        },
      },
    ],
  },
  {
    path: "cau-hinh",
    name: "cau-hinh",
    component: () => import("@components/Page/ConfigSettings/ConfigSettings.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Danh mục sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
    children: [
      {
        path: "danh-muc",
        name: "danh-muc",
        component: () => import("@components/Page/ConfigSettings/ConfigCategory/Category.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình danh mục",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "kho-hang",
        name: "kho-hang",
        component: () => import("@components/Page/ConfigSettings/ConfigWarehouse/Warehouse.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình kho hàng",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "khu-vuc",
        name: "khu-vuc",
        component: () => import("@components/Page/ConfigSettings/ConfigZone/Zone.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình khu vực",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "chi-tiet-khu-vuc",
        name: "chi-tiet-khu-vuc",
        component: () => import("@components/Page/ConfigSettings/ConfigZoneDetail/ZoneDetail.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình chi tiết khu vực",
          searchConfig: {},
          storeConfig: {},
        },
      },
    ],
  },
];
