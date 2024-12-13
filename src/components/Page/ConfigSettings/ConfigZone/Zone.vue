<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="justify-content-start mb-3 mb-md-0">
      <select class="form-select me-2" id="warehouse" v-model="selectedWarehouse" aria-label="Warehouse">
        <option value="" selected>{{ $t('ConfigSettings.categories.tabs.all') }}</option>
        <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho" :value="warehouse.maKho">
          {{ warehouse.tenKho }}
        </option>
      </select>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.zones.search_input')" />
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addZoneBtn" data-bs-toggle="modal"
        data-bs-target="#warehouseZoneModal">
        <span class=" material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.zones.title_save') }}
      </button>
    </div>
  </div>
  <ZoneTable :zones="filteredZones" @edit="editZone" @delete="deleteZone" @id="toggleSortById"
    @name="toggleSortByName" />
  <div class="modal fade" id="warehouseZoneModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedZone.sysIdKhuVuc ? $t("ConfigSettings.zones.title_edit")
              : $t("ConfigSettings.zones.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-12 col-md-6 mb-md-0 mb-3">
                  <label for="maKhuVuc" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.zone_id') }}</label>
                  <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="maKhuVuc" aria-describedby="maKhuVucHelp"
                    v-model="selectedZone.maKhuVuc" />
                </div>
                <div class="col-12 col-md-6">
                  <label for="tenKhuVuc" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.zone_name')
                    }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="tenKhuVuc" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedZone.tenKhuVuc" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="maKho" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.warehouse_id') }}</label>
              <span class="text-danger">*</span>
              <select class="form-select" id="maKho" v-model="selectedZone.maKho">
                <option value="" disabled>{{ $t('ConfigSettings.zones.choose_warehouse') }}</option>
                <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.maKho" :value="warehouse.maKho">
                  {{ warehouse.maKho }} - {{ warehouse.tenKho }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="warehouseZoneDescription" class="form-label fs fw-bold">{{
                $t('ConfigSettings.zones.zone_desc') }}</label>
              <textarea class="form-control" id="warehouseZoneDescription" rows="4"
                aria-describedby="warehouseZoneDescriptionHelp" v-model="selectedZone.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
            @click="btnResetForm">
            <span class="material-symbols-outlined me-2">close</span>
            {{ $t("ConfigSettings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouseZone">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedZone.sysIdKhuVuc ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService";
import { useWarehouseStore } from "@/store/warehouseStore";
import { useZoneStore } from "@/store/zoneStore";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import { useRouter } from "vue-router";
import ZoneTable from "./ZoneTable.vue";
const { t } = useI18n();

const router = useRouter();
const apiService = useApiServices();
const warehouseStore = useWarehouseStore();
const selectedWarehouse = ref("");
const zoneStore = useZoneStore();
const addZoneBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedZone = reactive({
  sysIdKhuVuc: "",
  maKhuVuc: "",
  tenKhuVuc: "",
  moTa: "",
  maKho: "",
});

onMounted(async () => {
  await zoneStore.getZones();
  await warehouseStore.getWarehouses();
});

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredZones = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = zoneStore.zones.filter(category => category.maKho === selectedWarehouse.value || !selectedWarehouse.value)
    .filter(zone =>
      removeAccents(zone.maKhuVuc.toLowerCase()).includes(query) ||
      removeAccents(zone.tenKhuVuc.toLowerCase()).includes(query) ||
      removeAccents(zone.moTa.toLowerCase()).includes(query) ||
      zone.maKho.toLowerCase().includes(query)
    );

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenKhuVuc.localeCompare(b.tenKhuVuc)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenKhuVuc.localeCompare(a.tenKhuVuc)); // Z-A
  } else if (sortOption.value === "id-asc") {
    filtered.sort((a, b) => a.maKhuVuc.localeCompare(b.maKhuVuc)); // A-Z
  } else if (sortOption.value === "id-desc") {
    filtered.sort((a, b) => b.maKhuVuc.localeCompare(a.maKhuVuc)); // Z-A
  }

  return filtered;
});

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

const toggleSortById = () => {
  sortOption.value = sortOption.value === "id-asc" ? "id-desc" : "id-asc";
  updateUrl();
};

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

const saveWarehouseZone = async () => {
  if (!selectedZone.maKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.zone_id"));
    return;
  }

  if (!selectedZone.tenKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.zone_name"));
    return;
  }

  if (!selectedZone.maKho) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.warehouse_id"));
    return;
  }

  try {
    const zoneData = {
      maKhuVuc: selectedZone.maKhuVuc,
      tenKhuVuc: selectedZone.tenKhuVuc,
      moTa: selectedZone.moTa,
      maKho: selectedZone.maKho,
    };

    const response = selectedZone.sysIdKhuVuc
      ? await apiService.post("zones", { ...zoneData, sysIdKhuVuc: selectedZone.sysIdKhuVuc })
      : await apiService.post("zones", zoneData);

    if (response) {
      await zoneStore.getZones();
      btnResetForm();
      addZoneBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.zones.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

const editZone = (zone) => {
  Object.assign(selectedZone, zone);
  addZoneBtn.value.click();
};

const deleteZone = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.zones.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.zones.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.zones.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.zones.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`zones/${id}`);
      await zoneStore.getZones();
      showToastSuccess(i18n.global.t("ConfigSettings.zones.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

const btnResetForm = () => {
  Object.assign(selectedZone, {
    sysIdKhuVuc: "",
    maKhuVuc: "",
    tenKhuVuc: "",
    moTa: "",
    maKho: "",
  });
};

const showZoneDetail = (id) => {
  router.push({ path: `/config-settings/config-warehouse-zone/zone-detail/${id}` })
  // router.push({ path: '/inventory/lots-management/lots-normal' })
}
</script>
