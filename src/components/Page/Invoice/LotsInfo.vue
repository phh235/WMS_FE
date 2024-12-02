<template>
  <div class="container-fluid">
    <h4 class="fw-bold text-center mb-3" style="color: var(--nav-link-color) !important;">
      Thông tin lô hàng: <span style="color: var(--primary-color);">{{ orderId }}</span>
    </h4>
    <div class="row">
      <div class="col-12 col-md-2">
        <div class="mb-3 mb-md-0">
          <img :src="consignmentInfo?.hinhAnh" alt="Consignment Image" class="img-fluid" style="border-radius: 16px;"
            v-if="consignmentInfo?.hinhAnh" />
        </div>
      </div>
      <div class="col-12 col-md-10">
        <div class=" box-shadow p-3">
          <ul class="list-group">
            <div class="row">
              <div class="col-12 col-md-6 table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="side-col side-col-radius-st col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.po')
                          }}</span></td>
                      <td>{{ consignmentInfo?.maPO }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.pr') }}</span></td>
                      <td>{{ consignmentInfo?.maPR }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.inbound') }}</span></td>
                      <td>{{ consignmentInfo?.maInbound }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{
                        $t('ConsignmentsInfo.supplier') }}</span></td>
                      <td>{{ consignmentInfo?.tenNhaCungCap }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.customer') }}</span></td>
                      <td>{{ consignmentInfo?.tenKhachHang }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.price') }}</span></td>
                      <td>{{ parseFloat(consignmentInfo?.gia).toLocaleString('vi-VN', {
                        style: 'currency', currency:
                          'VND'
                      }) }}</td>
                    </tr>
                    <tr>
                      <td class="side-col side-col-radius-nd col-3" style="border-bottom: none !important"><span
                          class="fw-bold">{{
                            $t('ConsignmentsInfo.total_price') }}</span>
                      </td>
                      <td style="border-bottom: none !important">{{
                        parseFloat(consignmentInfo?.tongChiPhi).toLocaleString('vi-VN', {
                          style: 'currency', currency:
                            'VND'
                        }) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 col-md-6 table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="side-col side-col-radius-st col-3"><span class="fw-bold">{{
                        $t('ConsignmentsInfo.product_name') }}</span>
                      </td>
                      <td>{{ consignmentInfo?.tenSanPham }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.date') }}</span></td>
                      <td>
                        {{ consignmentInfo?.ngaySanXuat ? new
                          Date(consignmentInfo?.ngaySanXuat).toLocaleDateString('en-GB') : '' }}
                      </td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.date_exp') }}</span></td>
                      <td>
                        {{ consignmentInfo?.hanSuDung ? new Date(consignmentInfo?.hanSuDung).toLocaleDateString('en-GB')
                          : '' }}
                      </td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.warehouse_name')
                          }}</span></td>
                      <td>{{ consignmentInfo?.tenKho }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{
                        $t('ConsignmentsInfo.date_inbound') }}</span>
                      </td>
                      <td>{{ consignmentInfo?.ngayNhap ? new Date(consignmentInfo?.ngayNhap).toLocaleDateString('en-GB')
                        : '' }}</td>
                    </tr>
                    <tr>
                      <td class="side-col col-3"><span class="fw-bold">{{ $t('ConsignmentsInfo.quantity_inbound')
                          }}</span>
                      </td>
                      <td>{{ consignmentInfo?.soLuongNhap }}</td>
                    </tr>
                    <tr>
                      <td class="side-col side-col-radius-nd col-3" style="border-bottom: none !important"><span
                          class="fw-bold">{{
                            $t('ConsignmentsInfo.quantity') }}</span></td>
                      <td style="border-bottom: none !important">{{ consignmentInfo?.soLuongTonKho }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApiServices } from '@/services/apiService'

const router = useRouter();
const orderId = ref('');
const apiService = useApiServices();
const consignmentInfo = ref({});

onMounted(async () => {
  orderId.value = router.currentRoute.value.params.id;
  await getConsignmentInfo();
});

const getConsignmentInfo = async () => {
  try {
    const response = await apiService.get(`consignment/get-info-lo-hang/${orderId.value}`);
    consignmentInfo.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.box-shadow {
  border-radius: 16px !important;
  border: 1px solid var(--border-main-color) !important;
}

.side-col {
  border-right: 1px solid var(--border-main-color) !important;
  border-bottom: 1px solid var(--border-main-color) !important;
}

.side-col-radius-st {
  border-top-left-radius: 10px;
}

.side-col-radius-nd {
  border-bottom-left-radius: 10px;
}

@media screen and (max-width: 768px) {
  .img-fluid {
    width: 100%;
  }
}
</style>
