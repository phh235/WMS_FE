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
      headerTitle: "Yêu cầu",
      searchConfig: {},
      storeConfig: {},
    },
    children: [
      {
        path: "inbound",
        name: "PurchaseRequestInbound",
        component: () =>
          import(
            "@/components/Page/PurchaseRequest/PurchaseRequestTable/PurchaseRequestInbound.vue"
          ),
        meta: {
          requiresAuth: true,
          headerTitle: "Yêu cầu nhập hàng",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "outbound",
        name: "PurchaseRequestOutbound",
        component: () =>
          import(
            "@/components/Page/PurchaseRequest/PurchaseRequestTable/PurchaseRequestOutbound.vue"
          ),
        meta: {
          requiresAuth: true,
          headerTitle: "Yêu cầu xuất hàng",
          searchConfig: {},
          storeConfig: {},
        },
      },
    ],
  },
  {
    path: "purchase-request/inbound/new",
    name: "purchase-request/inbound/new",
    component: () =>
      import(
        "@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestFormInbound.vue"
      ),
    meta: {
      requiresAuth: true,
      headerTitle: "Tạo yêu cầu nhập hàng",
      searchConfig: {},
      storeConfig: {},
      permissions: ["User"],
    },
  },
  {
    path: "purchase-request/inbound/edit/:id",
    name: "purchase-request/inbound/edit/:id",
    component: () =>
      import(
        "@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestFormInbound.vue"
      ),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa yêu cầu nhập hàng",
      searchConfig: {},
      storeConfig: {},
      permissions: ["User"],
    },
  },
  {
    path: "purchase-request/outbound/new",
    name: "purchase-request/outbound/new",
    component: () =>
      import(
        "@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestFormOutbound.vue"
      ),
    meta: {
      requiresAuth: true,
      headerTitle: "Tạo yêu cầu xuất hàng",
      searchConfig: {},
      storeConfig: {},
      permissions: ["User"],
    },
  },
  {
    path: "purchase-request/outbound/edit/:id",
    name: "purchase-request/outbound/edit/:id",
    component: () =>
      import(
        "@/components/Page/PurchaseRequest/PurchaseRequestForm/PurchaseRequestFormOutbound.vue"
      ),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa yêu cầu xuất hàng",
      searchConfig: {},
      storeConfig: {},
      permissions: ["User"],
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
    children: [
      {
        path: "inbound",
        name: "PurchaseOrderInbound",
        component: () =>
          import("@/components/Page/PurchaseOrder/PurchaseOrderTable/PurchaseOrderInbound.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Mua hàng - nhập",
          searchConfig: {},
          storeConfig: {},
        },
      },
      {
        path: "outbound",
        name: "PurchaseOrderOutbound",
        component: () =>
          import("@/components/Page/PurchaseOrder/PurchaseOrderTable/PurchaseOrderOutbound.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Mua hàng - xuất",
          searchConfig: {},
          storeConfig: {},
        },
      },
    ],
  },
  {
    path: "purchase-order/inbound/new",
    name: "purchase-order/inbound/new",
    component: () =>
      import("@/components/Page/PurchaseOrder/PurchaseOrderForm/PurchaseOrderFormInbound.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Tạo đơn đặt hàng - nhập hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-order/inbound/edit/:id",
    name: "purchase-order/inbound/edit/:id",
    component: () =>
      import("@/components/Page/PurchaseOrder/PurchaseOrderForm/PurchaseOrderFormInbound.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa đơn đặt hàng - nhập hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-order/outbound/new",
    name: "purchase-order/outbound/new",
    component: () =>
      import("@/components/Page/PurchaseOrder/PurchaseOrderForm/PurchaseOrderFormOutbound.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Tạo đơn đặt hàng - xuất hàng",
      searchConfig: {},
      storeConfig: {},
    },
  },
  {
    path: "purchase-order/outbound/edit/:id",
    name: "purchase-order/outbound/edit/:id",
    component: () =>
      import("@/components/Page/PurchaseOrder/PurchaseOrderForm/PurchaseOrderFormOutbound.vue"),
    meta: {
      requiresAuth: true,
      headerTitle: "Chỉnh sửa đơn đặt hàng - xuất hàng",
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
      permissions: ["Admin"],
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
          permissions: ["Admin"],
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
          permissions: ["Admin"],
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
          permissions: ["Admin"],
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
          permissions: ["Admin"],
        },
      },
      {
        path: "suppliers",
        name: "Suppiler",
        component: () => import("@components/Page/ConfigSettings/ConfigSupplier/Supplier.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình nhà cung cấp",
          searchConfig: {},
          storeConfig: {},
          permissions: ["Admin"],
        },
      },
      {
        path: "customers",
        name: "Customer",
        component: () => import("@components/Page/ConfigSettings/ConfigCustomer/Customer.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Cấu hình khách hàng",
          searchConfig: {},
          storeConfig: {},
          permissions: ["Admin"],
        },
      },
      {
        path: "account-management",
        name: "Account",
        component: () => import("@components/Page/ConfigSettings/ConfigAccount/Account.vue"),
        meta: {
          requiresAuth: true,
          headerTitle: "Quản lý tài khoản",
          searchConfig: {},
          storeConfig: {},
          permissions: ["Admin"],
        },
      },
    ],
  },
];
