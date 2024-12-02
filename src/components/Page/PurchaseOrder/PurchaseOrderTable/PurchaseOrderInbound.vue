<template>
  <div class="d-flex justify-content-end align-items-center flex-column flex-md-row mb-3">
    <div class="d-flex flex-column flex-md-row align-items-center">
      <div class="d-flex mb-2 mb-md-0">
        <SearchInput v-model="searchQuery" :placeholder="$t('PurchaseOrder.search_input.search_id')" />
        <SearchInput v-model="searchQueryByPeople" :placeholder="$t('PurchaseOrder.search_input.search_name')" />
      </div>
      <div class="d-flex">
        <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortById">
          <span class="material-symbols-outlined">swap_vert</span>
        </button>
        <VueDatePicker v-model="date" range auto-apply :preset-dates="presetDates" :teleport="true"
          :auto-position="true" :enable-time-picker="false" style="max-width: 234px;" format="dd/MM/yyyy"
          placeholder="Tìm theo ngày">
          <template #preset-date-range-button="{ label, value, presetDate }">
            <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
              @keyup.space.prevent="presetDate(value)">
              {{ label }}
            </span>
          </template>
        </VueDatePicker>
        <router-link to="/inventory/purchase-order/inbound/new" class="btn btn-primary d-flex align-items-center ms-2">
          <span class="material-symbols-outlined me-2"> add </span>
          {{ $t('PurchaseOrder.btn_create') }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table mb-3">
      <thead>
        <tr>
          <th style="width: 200px;" class="sticky">{{ $t('PurchaseOrder.table.id') }}</th>
          <th style="width: 200px;">{{ $t('PurchaseOrder.table.id_pr') }}</th>
          <th style="width: 200px;">{{ $t('PurchaseOrder.table.name') }}</th>
          <th style="width: 200px;">{{ $t('PurchaseOrder.table.date_request') }}</th>
          <th style="width: 190px;" class="text-center">{{ $t('PurchaseOrder.table.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredRequests.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('PurchaseOrder.not_found') }}</td>
        </tr>
        <tr v-for="purchase in paginatedPurchases" :key="purchase.maPO">
          <td style="width: 200px;" class="sticky">{{ purchase.maPO }}</td>
          <td style="width: 200px;">{{ purchase.maPR ? purchase.maPR : 'Không có' }}</td>
          <td style="width: 200px;">{{ purchase.nguoiTao }}</td>
          <td style="width: 200px;">{{ formatDate(purchase.ngayTao) }}</td>
          <td style="width: 190px;" class="d-flex align-items-center ">
            <button v-if="purchase.isExistIb === false" class="btn btn-primary d-flex align-items-center me-2"
              @click="createInbound(purchase.maPO)"><span class="material-symbols-outlined me-2">add</span> Tạo phiếu
              nhập</button>
            <button class="btn btn-export d-flex align-items-center me-2" @click="exportToWord(purchase)"><span
                class="material-symbols-outlined me-2">upgrade</span> Xuất hóa đơn</button>
            <button class="btn btn-secondary d-flex align-items-center me-2" @click="showDetail(purchase)">
              <span class="material-symbols-outlined">visibility</span>
            </button>
            <!-- <router-link :to="{ name: 'purchase-order/inbound/edit/:id', params: { id: purchase.maPO } }"
              class="btn btn-secondary d-flex align-items-center">
              <span class="material-symbols-outlined">edit_square</span>
            </router-link> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center">
    <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
      @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
  </div>

  <!-- Modal để hiển thị chi tiết đơn hàng -->
  <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;"
    aria-labelledby="purchaseDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="purchaseDetailModalLabel">
            {{ $t('PurchaseOrder.table.detail.order_detail') }}
            <span style="color: var(--primary-color);">{{ selectedPurchaseOrder.maPO }}</span>
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="closeModal">close</span>
        </div>
        <div class="modal-body">
          <!-- Hiển thị thông tin chi tiết đơn hàng -->
          <div class="row">
            <div class="col-6 col-md-4">
              <label class="form-label">{{ $t('PurchaseOrder.table.id_pr') }}</label>
              <p class="fs">{{ selectedPurchaseOrder.maPR }}</p>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseOrder.table.name') }}
              </label>
              <p class="fs">{{ selectedPurchaseOrder.nguoiTao }}</p>
            </div>
            <div class="col-6 col-md-4">
              <label class="form-label">
                {{ $t('PurchaseOrder.table.date_request') }}
              </label>
              <p class="fs">{{ formatDate(selectedPurchaseOrder.ngayTao) }}</p>
            </div>
          </div>
          <hr />
          <h5 class="fw-bold"> {{ $t('PurchaseOrder.table.detail.product_detail.title') }}
          </h5>
          <div class="table-responsive">
            <table class="table ">
              <thead>
                <tr>
                  <th> {{ $t('PurchaseOrder.table.detail.product_detail.product_name') }}</th>
                  <th> {{ $t('PurchaseOrder.table.detail.product_detail.quantity') }}</th>
                  <th> {{ $t('PurchaseOrder.table.detail.product_detail.price') }}</th>
                  <th> {{ $t('PurchaseOrder.table.detail.product_detail.total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedPurchaseOrder.chiTietNhapHang" :key="item.maSanPham">
                  <td>{{ item.tenSanPham }}</td>
                  <td>{{ item.soLuong }} Kg</td>
                  <td>{{ parseFloat(item.gia).toLocaleString('vi-VN') }}
                    <span class="currency-symbol">&#8363;</span>
                  </td>
                  <td>{{ parseFloat(item.tongChiPhi).toLocaleString('vi-VN') }}
                    <span class="currency-symbol">&#8363;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex align-items-center justify-content-end">
            <!-- <button class="btn btn-primary d-flex align-items-center" @click="exportOrderToPDF">
              <span class="material-symbols-outlined me-2">upgrade</span> Xuất PDF
            </button> -->
            <h5 class="fw-bold mt-2"> {{ $t('PurchaseOrder.table.detail.product_detail.total_price') }}:
              <span style="color: var(--primary-color);">{{
                totalOrderValue.toLocaleString('vi-VN') }} <span class="currency-symbol">&#8363;</span></span>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="export-data" style="z-index: -9999;">
      <img src="https://res.cloudinary.com/dnfccnxew/image/upload/v1728803542/u8zl2zd4xhaxdjw543om.png" alt="Logo WMS"
        width="45" class="me-2 rounded-4" />
      <p class="h6 fw-bold mt-2" style="color: var(--nav-link-color);"> {{
        $t("LoginForgotForm.logo_title") }}
      </p>
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="purchaseDetailModalLabel">
              {{ $t('PurchaseOrder.table.detail.order_detail') }}
              <span style="color: var(--primary-color);">{{ selectedPurchaseOrder.maPO }}</span>
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6 col-md-4">
                <label class="form-label">{{ $t('PurchaseOrder.table.id_pr') }}</label>
                <p class="fs">{{ selectedPurchaseOrder.maPR ? selectedPurchaseOrder.maPR : 'Không có' }}</p>
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">
                  {{ $t('PurchaseOrder.table.name') }}
                </label>
                <p class="fs">{{ selectedPurchaseOrder.nguoiTao }}</p>
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">
                  {{ $t('PurchaseOrder.table.date_request') }}
                </label>
                <p class="fs">{{ formatDate(selectedPurchaseOrder.ngayTao) }}</p>
              </div>
            </div>
            <hr />
            <h5 class="fw-bold"> {{ $t('PurchaseOrder.table.detail.product_detail.title') }}
            </h5>
            <div class="table-responsive">
              <table class="table ">
                <thead>
                  <tr>
                    <th> {{ $t('PurchaseOrder.table.detail.product_detail.product_name') }}</th>
                    <th> {{ $t('PurchaseOrder.table.detail.product_detail.quantity') }}</th>
                    <th> {{ $t('PurchaseOrder.table.detail.product_detail.price') }}</th>
                    <th> {{ $t('PurchaseOrder.table.detail.product_detail.total') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedPurchaseOrder.chiTietNhapHang" :key="item.maSanPham">
                    <td>{{ item.tenSanPham }}</td>
                    <td>{{ item.soLuong }} Kg</td>
                    <td>{{ parseFloat(item.gia).toLocaleString('vi-VN') }}
                      <span class="currency-symbol">&#8363;</span>
                    </td>
                    <td>{{ parseFloat(item.tongChiPhi).toLocaleString('vi-VN') }}
                      <span class="currency-symbol">&#8363;</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <h5 class="fw-bold mt-2"> {{ $t('PurchaseOrder.table.detail.product_detail.total_price') }}:
                <span style="color: var(--primary-color);">{{
                  totalOrderValue.toLocaleString('vi-VN') }} <span class="currency-symbol">&#8363;</span></span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>

  <!-- Overlay khi modal mở -->
  <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useAuthStore } from "@/store/authStore.js";
import { useI18n } from "vue-i18n";
import i18n from "@/lang/i18n";
import Swal from "sweetalert2";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import html2pdf from "html2pdf.js";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import VueDatePicker from "@vuepic/vue-datepicker"
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, TableLayoutType } from 'docx';

// const date = ref([
//   new Date(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()),
//   new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
// ]);
const date = ref([]);

const presetDates = ref([
  {
    label: '7 ngày gần đây', value: [
      new Date(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()),
      new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
    ]
  },
  {
    label: '3 ngày gần đây', value: [
      new Date(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toDateString()),
      new Date(new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toDateString() + ' 23:59:59')
    ]
  },
  {
    label: 'Ngày hiện tại', value: [
      new Date(new Date().toDateString()),
      new Date(new Date().toDateString() + ' 23:59:59')
    ]
  },
]);
// Check permissions
const authStore = useAuthStore();
// Pagination
const currentPage = ref(1);
const pageSize = ref(10);
const { t } = useI18n();
const searchQuery = ref("");
const searchQueryByPeople = ref("");
const isModalVisible = ref(false);
const purchases = ref([]);
const apiService = useApiServices();
// Sort
const sortOption = ref("");

onMounted(async () => {
  await getPurchaseOrders();
})

const selectedPurchaseOrder = reactive({
  sysIdPO: "",
  maPO: "",
  maPR: "",
  ngayTao: "",
  sysIdUser: "",
  nguoiTao: "",
  chiTietNhapHang: []
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

// Tính tổng giá trị (số lượng * giá)
const totalOrderValue = computed(() => {
  return selectedPurchaseOrder.chiTietNhapHang.reduce((total, item) => {
    return total + (parseFloat(item.tongChiPhi) || 0);
  }, 0);
});

const getPurchaseOrders = async () => {
  try {
    const response = await apiService.get("purchase-orders");
    purchases.value = response.data;
  } catch (error) {
    console.error("Failed to fetch purchase requests:", error);
  }
};

const showDetail = (purchase) => {
  selectedPurchaseOrder.maPO = purchase.maPO;
  selectedPurchaseOrder.maPR = purchase.maPR;
  selectedPurchaseOrder.ngayTao = purchase.ngayTao;
  selectedPurchaseOrder.nguoiTao = purchase.nguoiTao;
  selectedPurchaseOrder.chiTietNhapHang = purchase.chiTietNhapHang;

  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Hàm chuyển đổi ký tự có dấu thành không dấu
const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const parseDate = (dateString) => {
  const [day, month, year, hour, minute, second] = dateString.split(/\/|\s|:/);
  return new Date(year, month - 1, day, hour, minute, second);
};

const filteredRequests = computed(() => {
  return purchases.value
    .filter(
      purchase =>
        !searchQuery.value ||
        [purchase.maPO, purchase.maPR].some(
          field => field.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    )
    .filter(purchase =>
      !searchQueryByPeople.value || removeAccents(purchase.nguoiTao.toLowerCase()).includes(removeAccents(searchQueryByPeople.value.toLowerCase()))
    )
    .filter(purchase => {
      if (date.value && date.value.length === 2) {
        const [startDate, endDate] = date.value;
        const purchaseDate = parseDate(purchase.ngayTao);
        return purchaseDate >= startDate && purchaseDate <= endDate;
      }
      return true;
    });
});

const paginatedPurchases = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredRequests.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRequests.value.length / pageSize.value);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (newItemsPerPage) => {
  pageSize.value = newItemsPerPage;
  currentPage.value = 1;
};

// Sort
const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  purchases.value.sort((a, b) => sortOption.value === "id-asc" ? a.maPR.localeCompare(b.maPR) : b.maPR.localeCompare(a.maPR));
  updateUrl();
};

/**
 * Cập nhật URL hiện tại
 */
const updateUrl = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (sortOption.value) {
    params.set("sort", sortOption.value);
  } else {
    params.delete("sort");
  }

  url.search = params.toString();
  window.history.replaceState({}, "", url.toString());
};

const createInbound = async (id) => {
  try {
    const response = await apiService.post("inbounds/create", {
      maPO: id,
      maKho: "KHO002",
      trangThai: "confirm",
      sysIdUser: JSON.parse(sessionStorage.getItem("user")).sysIdUser,
    });
    if (response.status) {
      showToastSuccess("Tạo phiếu nhập thành công");
      getPurchaseOrders();
    } else {
      showToastError("Tạo phiếu nhập thất bại");
    }
  } catch (error) {
    console.error("Failed to save inbound:", error);
  }
};

const exportOrderToPDF = () => {
  const date = new Date();
  const dateString = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
  const modalContent = document.querySelector('.export-data');
  html2pdf(modalContent, {
    margin: 1,
    filename: `purchase_order_${dateString}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
  });
}

const exportToWord = (purchase) => {
  // 1. Thêm "Mẫu số 06 - VT"
  const templateInfo = new Paragraph({
    children: [
      new TextRun({
        text: "Mẫu số 06 - VT",
        bold: true,
        size: 24, // Font size (24 = 12pt)
      }),
      new TextRun({
        text: "\n(Ban hành theo Thông tư số 200/2014/TT-BTC\nNgày 22/12/2014 của Bộ Tài chính)",
        size: 20,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  });

  // 2. Tạo tiêu đề
  const title = new Paragraph({
    children: [
      new TextRun({
        text: "BẢNG KÊ MUA HÀNG",
        bold: true,
        size: 28,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  });

  // 3. Thêm ngày tháng
  const date = new Paragraph({
    children: [
      new TextRun({
        text: `Ngày ${new Date(purchase.ngayTao).getDate()} tháng ${new Date(purchase.ngayTao).getMonth() + 1} năm ${new Date(purchase.ngayTao).getFullYear()}`,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  });

  // 4. Thông tin chung
  const info = [
    new Paragraph({
      children: [
        new TextRun({ text: `- Họ và tên người mua:  `, bold: true }),
        new TextRun({ text: `${purchase.nguoiTao}` }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "- " }),
        new TextRun({ text: "Bộ phận (phòng, ban):", bold: true }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({ text: "" }),
  ];

  // 5. Tạo bảng header
  const headerRow = new TableRow({
    children: [
      new TableCell({ children: [new Paragraph("STT")] }),
      new TableCell({ children: [new Paragraph("Tên sản phẩm")] }),
      new TableCell({ children: [new Paragraph("Địa chỉ mua hàng")] }),
      new TableCell({ children: [new Paragraph("Số lượng")] }),
      new TableCell({ children: [new Paragraph("Đơn vị tính")] }),
      new TableCell({ children: [new Paragraph("Đơn giá")] }),
      new TableCell({ children: [new Paragraph("Thành tiền")] }),
    ],
  });

  // 6. Dữ liệu sản phẩm
  const productRows = purchase.chiTietNhapHang.map((item, index) =>
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph((index + 1).toString())] }),
        new TableCell({ children: [new Paragraph(item.tenSanPham)] }),
        new TableCell({ children: [new Paragraph("Địa chỉ A")] }),
        new TableCell({ children: [new Paragraph(item.soLuong.toString())] }),
        new TableCell({ children: [new Paragraph("Kg")] }),
        new TableCell({ children: [new Paragraph(item.gia.toString())] }),
        new TableCell({ children: [new Paragraph(item.tongChiPhi.toString())] }),
      ],
    })
  );

  // 7. Tạo bảng hoàn chỉnh
  const table = new Table({
    rows: [headerRow, ...productRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, size: 1 },
    },
    alignment: AlignmentType.CENTER,
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });

  // 8. Phần chữ ký
  const signatures = [
    new Paragraph({
      children: [new TextRun("Ngày ..... tháng ..... năm .....")],
      alignment: AlignmentType.RIGHT,
      spacing: { before: 400 },
    }),
    new Paragraph({
      spacing: { before: 400 },
      children: [
        new TextRun({
          text: "Người lập phiếu",
          bold: true,
        }),
        new TextRun({
          text: " ".repeat(120), // Khoảng cách
        }),
        new TextRun({
          text: "Người duyệt",
          bold: true,
        }),
      ],
    }),
  ];

  // 9. Tạo tài liệu Word
  const doc = new Document({
    sections: [
      {
        children: [templateInfo, title, date, ...info, table, ...signatures],
      },
    ],
  });

  // 10. Xuất file Word
  Packer.toBlob(doc).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bang-ke-mua-hang-${purchase.maPO}.docx`;
    link.click();
  });
};
</script>

<style scoped>
.form-control {
  width: 220px;
}

.form-label {
  font-weight: bold;
}

.fs {
  font-size: 0.875rem;
}

.currency-symbol {
  font-size: 0.8em;
  vertical-align: super;
  line-height: 0;
}

@media screen and (max-width: 768px) {
  .block {
    padding: 15px 10px !important;
  }
}

.btn-secondary {
  padding: 10px;
}

.btn-secondary {
  background-color: var(--background-color) !important;
  border: 1.5px solid var(--border-main-color) !important;

  &:focus,
  &:active {
    background-color: var(--background-color) !important;
    border: 1.5px solid var(--border-main-color) !important;
  }
}
</style>
