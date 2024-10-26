<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="tab-container justify-content-start mb-3 mb-md-0 col-12">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]">
        {{ tab }}
      </button>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.zones.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addWarehouseZoneBtn"
        data-bs-toggle="modal" data-bs-target="#warehouseZoneModal">
        <span class=" material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.zones.title_save') }}
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="d-none">ID</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.zones.zone_id') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zones.zone_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.zones.zone_desc') }}</th>
          <th scope="col" class="d-none">{{ $t('ConfigSettings.zones.warehouse_id') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredZones.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.zones.not_found') }}</td>
        </tr>
        <tr v-for="zone in filteredZones" :key="zone.sysIdKhuVuc" :data-id="zone.sysIdKhuVuc"
          @dblclick="showZoneDetail(zone.maKhuVuc)">
          <td scope="row" class="d-none">{{ zone.sysIdKhuVuc }}</td>
          <td class="sticky">{{ zone.maKhuVuc }}</td>
          <td>{{ zone.tenKhuVuc }}</td>
          <td>{{ zone.moTa }}</td>
          <td class="d-none">{{ zone.maKho }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="handleRowClick">
              <span class="material-symbols-outlined d-flex align-items-center"> edit_square </span>
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
            {{ selectedWarehouseZone.sysIdKhuVuc ? $t("ConfigSettings.zones.title_edit")
              : $t("ConfigSettings.zones.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="maKhuVuc" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.zone_id') }}</label>
                  <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="maKhuVuc" aria-describedby="maKhuVucHelp"
                    v-model="selectedWarehouseZone.maKhuVuc" />
                </div>
                <div class="col-6">
                  <label for="tenKhuVuc" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.zone_name')
                    }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="tenKhuVuc" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedWarehouseZone.tenKhuVuc" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="maKho" class="form-label fs fw-bold">{{ $t('ConfigSettings.zones.warehouse_id') }}</label>
              <span class="text-danger">*</span>
              <select class="form-select" id="maKho" v-model="selectedWarehouseZone.maKho">
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
                aria-describedby="warehouseZoneDescriptionHelp" v-model="selectedWarehouseZone.moTa"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm">
            {{ $t("ConfigSettings.btn_cancel") }}
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveWarehouseZone">
            <span class="material-symbols-outlined me-2">check</span>
            {{ selectedWarehouseZone.sysIdKhuVuc ? $t("ConfigSettings.btn_update") : $t("ConfigSettings.btn_save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useWarehouseStore } from "@/store/warehouseStore.js";
import { showToastSuccess, showToastError } from "@components/Toast/utils/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import { useRouter } from "vue-router";
const { t } = useI18n();

const router = useRouter();
const apiStore = useApiServices();
const zones = ref([]);
const warehouseStore = useWarehouseStore();
const addWarehouseZoneBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");
// Tab
const tabs = computed(() => [t('ConfigSettings.categories.tabs.all'), t('ConfigSettings.categories.tabs.normal'), t('ConfigSettings.categories.tabs.cold')]);
const activeTab = ref(t('ConfigSettings.categories.tabs.all'));

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
  updateTabs();
});

watch(tabs, (newTabs) => {
  activeTab.value = newTabs[0]; // Cập nhật activeTab khi tabs thay đổi
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

const getStatusValue = (status) =>
  ({ [t("ConfigSettings.zones.tabs.normal")]: "KHO001", [t("ConfigSettings.zones.tabs.cold")]: "KHO002" }[status] || status);

// Cập nhật danh sách tab dựa trên mã kho có trong danh mục
const updateTabs = () => {
  const uniqueWarehouses = [...new Set(zones.value.map(zone => zone.maKho))];
  tabs.value = [t('ConfigSettings.zones.tabs.all'), ...uniqueWarehouses];
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filteredZones = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = zones.value.filter(zone => zone.maKho === getStatusValue(activeTab.value) || activeTab.value === t('ConfigSettings.zones.tabs.all'))
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
  }

  return filtered;
});

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
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
  if (!selectedWarehouseZone.maKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.zone_id"));
    return;
  }

  if (!selectedWarehouseZone.tenKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.zone_name"));
    return;
  }

  if (!selectedWarehouseZone.maKho) {
    showToastError(i18n.global.t("ConfigSettings.zones.swal.validate.warehouse_id"));
    return;
  }

  try {
    const zoneData = {
      maKhuVuc: selectedWarehouseZone.maKhuVuc,
      tenKhuVuc: selectedWarehouseZone.tenKhuVuc,
      moTa: selectedWarehouseZone.moTa,
      maKho: selectedWarehouseZone.maKho,
    };

    const response = selectedWarehouseZone.sysIdKhuVuc
      ? await apiStore.post("zones", { ...zoneData, sysIdKhuVuc: selectedWarehouseZone.sysIdKhuVuc })
      : await apiStore.post("zones", zoneData);

    if (response) {
      await getWarehouseZone();
      btnResetForm();
      addWarehouseZoneBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.zones.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

const handleRowClick = (event) => {
  const row = event.target.closest("tr");
  const id = row.getAttribute("data-id");

  const selectedWarehouseZoneValue = zones.value.find(
    (zone) => zone.sysIdKhuVuc == id
  );

  if (selectedWarehouseZoneValue) {
    Object.assign(selectedWarehouseZone, selectedWarehouseZoneValue);
    addWarehouseZoneBtn.value.click();
  }
};

const deleteWarehouseZone = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.zones.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.zones.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.zones.swal.delete.cancel"),
    cancelButtonColor: "#ef4444",
    confirmButtonText: i18n.global.t("ConfigSettings.zones.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiStore.delete(`zones/${id}`);
      await getWarehouseZone();
      showToastSuccess(i18n.global.t("ConfigSettings.zones.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

const btnResetForm = () => {
  Object.assign(selectedWarehouseZone, {
    sysIdKhuVuc: "",
    maKhuVuc: "",
    tenKhuVuc: "",
    moTa: "",
    maKho: "",
  });
};

const showZoneDetail = (id) => {
  console.log(id);
  router.push({ path: `/config-settings/config-warehouse-zone/zone-detail/${id}` })
  // router.push({ path: '/inventory/quan-ly-lo-hang/lots-normal' })
}
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>
