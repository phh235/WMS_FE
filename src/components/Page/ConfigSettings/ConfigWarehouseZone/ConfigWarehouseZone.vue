<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-3">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="search" class="form-control" :placeholder="$t('Config_settings.zones.search_input')"
        v-model="searchQuery" />
    </div>
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseZoneBtn"
      data-bs-toggle="modal" data-bs-target="#warehouseZoneModal">
      <span class="material-symbols-outlined me-2"> add </span>
      {{ $t('Config_settings.zones.title_save') }}
    </button>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col">{{ $t('Config_settings.zones.zone_id') }}</th>
          <th scope="col">{{ $t('Config_settings.zones.zone_name') }}</th>
          <th scope="col">{{ $t('Config_settings.zones.zone_desc') }}</th>
          <th scope="col">{{ $t('Config_settings.zones.warehouse_id') }}</th>
          <th scope="col" class="text-center">{{ $t('Config_settings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredZones.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy khu vực</td>
        </tr>
        <tr v-for="zone in filteredZones" :key="zone.sysIdKhuVuc" :data-id="zone.sysIdKhuVuc">
          <td scope="row" class="d-none">{{ zone.sysIdKhuVuc }}</td>
          <td>{{ zone.maKhuVuc }}</td>
          <td>{{ zone.tenKhuVuc }}</td>
          <td>{{ zone.moTa }}</td>
          <td>{{ zone.maKho }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="handleRowClick">
              <span class="material-symbols-outlined d-flex align-items-center"> edit </span>
            </button>
            <button class="btn btn-danger" @click="deleteWarehouseZone(zone.maKhuVuc, $event)">
              <span class="material-symbols-outlined d-flex align-items-center"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="warehouseZoneModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedWarehouseZone.sysIdKhuVuc ? $t("Config_settings.zones.title_edit")
              : $t("Config_settings.zones.title_save") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm_Click"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="maKhuVuc" class="form-label fs fw-bold">{{ $t('Config_settings.zones.zone_id') }}</label>
                  <input type="text" class="form-control" id="maKhuVuc" aria-describedby="maKhuVucHelp"
                    v-model="selectedWarehouseZone.maKhuVuc" />
                </div>
                <div class="col-6">
                  <label for="tenKhuVuc" class="form-label fs fw-bold">{{ $t('Config_settings.zones.zone_name')
                    }}</label>
                  <input type="text" class="form-control" id="tenKhuVuc" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedWarehouseZone.tenKhuVuc" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="maKho" class="form-label fs fw-bold">{{ $t('Config_settings.zones.warehouse_id') }}</label>
              <select class="form-select" id="maKho" v-model="selectedWarehouseZone.maKho">
                <option value="" disabled>{{ $t('Config_settings.zones.choose_warehouse') }}</option>
                <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho" :value="warehouse.maKho">
                  {{ warehouse.maKho }} - {{ warehouse.tenKho }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="warehouseZoneDescription" class="form-label fs fw-bold">{{
                $t('Config_settings.zones.zone_desc') }}</label>
              <textarea class="form-control" id="warehouseZoneDescription" rows="4"
                aria-describedby="warehouseZoneDescriptionHelp" v-model="selectedWarehouseZone.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
            {{ $t("Config_settings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouseZone">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouseZone.sysIdKhuVuc ? $t("Config_settings.btn_update") : $t("Config_settings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useApiStore } from "@/store/apiStore.js";
import { useWarehouseStore } from "@/store/warehouseStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";

const apiStore = useApiStore();
const zones = ref([]);
const warehouseStore = useWarehouseStore();
const addWarehouseZoneBtn = ref(null);
const searchQuery = ref("");
const selectedWarehouseZone = reactive({
  sysIdKhuVuc: "",
  maKhuVuc: "",
  tenKhuVuc: "",
  moTa: "",
  maKho: "",
});
// pagination
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getWarehouseZone();
  fetchWarehouses();
});

const fetchWarehouses = async () => {
  await warehouseStore.getWarehouses();
};

const getWarehouseZone = async () => {
  try {
    const response = await apiStore.get(`zones?page=${currentPage.value}&size=${pageSize.value}`);
    zones.value = response.data.list;
    totalPages.value = Math.ceil(response.total / pageSize.value);
  } catch (error) {
    console.error("Failed to fetch zones:", error);
  }
};

const filteredZones = computed(() => {
  return zones.value.filter(
    (zone) =>
      zone.maKhuVuc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.tenKhuVuc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.moTa.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      zone.maKho.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const saveWarehouseZone = async () => {
  if (!selectedWarehouseZone.maKhuVuc.trim()) {
    showToastError(i18n.global.t("Config_settings.zones.swal.validate.zone_id"));
    return;
  }
  if (!selectedWarehouseZone.tenKhuVuc.trim()) {
    showToastError(i18n.global.t("Config_settings.zones.swal.validate.zone_name"));
    return;
  }
  // if (!selectedWarehouseZone.moTa.trim()) {
  //   showToastError("Mô tả khu vực không được để trống!");
  //   return;
  // }
  if (!selectedWarehouseZone.maKho) {
    showToastError(i18n.global.t("Config_settings.zones.swal.validate.warehouse_id"));
    return;
  }

  try {
    let response;
    if (selectedWarehouseZone.sysIdKhuVuc) {
      response = await apiStore.post("zones", {
        sysIdKhuVuc: selectedWarehouseZone.sysIdKhuVuc,
        maKhuVuc: selectedWarehouseZone.maKhuVuc,
        tenKhuVuc: selectedWarehouseZone.tenKhuVuc,
        moTa: selectedWarehouseZone.moTa,
        maKho: selectedWarehouseZone.maKho,
      });
    } else {
      response = await apiStore.post("zones", {
        maKhuVuc: selectedWarehouseZone.maKhuVuc,
        tenKhuVuc: selectedWarehouseZone.tenKhuVuc,
        moTa: selectedWarehouseZone.moTa,
        maKho: selectedWarehouseZone.maKho,
      });
    }

    if (response) {
      await getWarehouseZone();
      btnResetForm_Click();
      addWarehouseZoneBtn.value.click();
      showToastSuccess(i18n.global.t("Config_settings.zones.swal.success"));
    } else {
      if (response && response.error) {
        console.error("Error details:", response.error);
      }
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

const handleRowClick = (event) => {
  const row = event.target.closest("tr");
  const id = row.getAttribute("data-id");
  const selectedWarehouseZoneValue = zones.value.find((zone) => zone.sysIdKhuVuc == id);
  if (selectedWarehouseZoneValue) {
    Object.assign(selectedWarehouseZone, selectedWarehouseZoneValue);
    addWarehouseZoneBtn.value.click();
  }
};

const deleteWarehouseZone = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("Config_settings.zones.swal.delete.title"),
    text: i18n.global.t("Config_settings.zones.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("Config_settings.zones.swal.delete.cancel"),
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("Config_settings.zones.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`zones/${id}`);
      await getWarehouseZone();
      showToastSuccess(i18n.global.t("Config_settings.zones.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

const btnResetForm_Click = () => {
  Object.assign(selectedWarehouseZone, {
    sysIdKhuVuc: "",
    maKhuVuc: "",
    tenKhuVuc: "",
    moTa: "",
    maKho: "",
  });
};
</script>

<style scoped>
tr,
td {
  border-bottom: 1px solid #dfdfdf;
}

td {
  font-size: 14px;
  vertical-align: middle;
}

.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}

.btn-close {
  box-shadow: none;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.1s;

  &:hover,
  &:active {
    background-color: var(--secondary-color);
    padding: 8px;
  }
}
</style>
