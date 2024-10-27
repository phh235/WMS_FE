import i18n from "@/lang/i18n";

export default [
  {
    path: "home",
    name: "Home",
    component: () => import("@/components/Page/Home/Home.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: i18n.global.t("Home.headerTitle"),
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "warehouses-management",
    name: "WarehouseManagement",
    component: () => import("@/components/Page/WarehouseManagement/WarehouseManagement.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "account-info",
    name: "AccountInfo",
    component: () => import("@/components/Page/Account/AccountInfo/AccountInfo.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thông tin tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "account-management",
    name: "AccountManage",
    component: () => import("@/components/Page/Account/AccountManage/AccountManage.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý tài khoản",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "products",
    name: "Product",
    component: () => import("@components/Page/Product/Product.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "product/new",
    name: "ProductForm",
    component: () => import("@components/Page/Product/ProductForm/ProductForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Thêm sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "product/edit/:id",
    name: "product/edit/:id",
    component: () => import("@components/Page/Product/ProductForm/ProductForm.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "inbound",
    name: "InboundTable",
    component: () => import("@components/Page/Inbound/InboundTable/InboundTable.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "inbound/new",
    name: "InboundDetail",
    component: () => import("@components/Page/Inbound/InboundDetail/InboundDetail.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý nhập kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "outbound",
    name: "OutboundTable",
    component: () => import("@components/Page/Outbound/OutboundTable/OutboundTable.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "outbound/new",
    name: "OutboundDetail",
    component: () => import("@components/Page/Outbound/OutboundDetail/OutboundDetail.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý xuất kho",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "physical-warehouses",
    name: "PhysicalInventory",
    component: () => import("@components/Page/PhysicalInventory/PhysicalInventory.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Hàng tồn kho vật lý",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "report",
    name: "Report",
    component: () => import("@/components/Page/Report/Report.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Báo cáo",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-request",
    name: "PurchaseRequest",
    component: () => import("@/components/Page/PurchaseRequest/PurchaseRequest.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Yêu cầu mua hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-request/new",
    name: "PurchaseRequestForm",
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
    path: "purchase-request/edit/:id",
    name: "PurchaseRequestForm",
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
    path: "purchase-order",
    name: "PurchaseOrder",
    component: () => import("@/components/Page/PurchaseOrder/PurchaseOrder.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Đặt hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-order/new",
    name: "PurchaseOrderFormg",
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
    path: "lots-management",
    name: "LotsManagement",
    component: () => import("@/components/Page/LotsManagement/LotsManagement.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Quản lý lô hàng",
    },
    children: [
      {
        path: "lots-normal",
        name: "LotsNormal",
        component: () => import("@/components/Page/LotsManagement/LotsNormal/LotsNormal.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho thường",
        },
      },
      {
        path: "lots-normal/:id",
        name: "LotsNormal",
        component: () => import("@/components/Page/LotsManagement/LotsNormal/LotsNormal.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho thường",
        },
      },
      {
        path: "lots-cold",
        name: "LotsCold",
        component: () => import("@/components/Page/LotsManagement/LotsCold/LotsCold.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho lạnh",
        },
      },
      {
        path: "lots-cold/:id",
        name: "LotsCold",
        component: () => import("@/components/Page/LotsManagement/LotsCold/LotsCold.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Lô hàng kho lạnh",
        },
      },
    ],
  },
  {
    path: "config",
    name: "ConfigSettings",
    component: () => import("@components/Page/ConfigSettings/ConfigSettings.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Danh mục sản phẩm",
      searchConfig: {},
      storeConfig: {},
    },
    children: [
      {
        path: "categories",
        name: "Category",
        component: () => import("@components/Page/ConfigSettings/ConfigCategory/Category.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình danh mục",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "warehouses",
        name: "Warehouse",
        component: () => import("@components/Page/ConfigSettings/ConfigWarehouse/Warehouse.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình kho hàng",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "zones",
        name: "Zone",
        component: () => import("@components/Page/ConfigSettings/ConfigZone/Zone.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình khu vực",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "zone-detail",
        name: "ZoneDetail",
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
