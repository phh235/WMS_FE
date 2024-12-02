<template>
  <div class="mb-4 d-flex justify-content-between align-items-center">
    <div class="justify-content-start mb-3 mb-md-0">
      <select class="form-select me-2" id="zone" v-model="selectedZone" aria-label="Warehouse">
        <option value="" selected>{{ $t('ConfigSettings.categories.tabs.all') }}</option>
        <option v-for="zone in zoneStore.zones" :key="zone.maKhuVuc" :value="zone.maKhuVuc">
          {{ zone.tenKhuVuc }}
        </option>
      </select>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <SearchInput v-model="searchQuery" :placeholder="$t('ConfigSettings.zone-detail.search_input')" />
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByAreaVolume">
        <span class="material-symbols-outlined">swap_vert</span>
      </button>
      <button class="btn btn-secondary d-flex align-items-center me-2" @click="toggleSortByName">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addZoneDetailBtn"
        data-bs-toggle="modal" data-bs-target="#warehouseZoneModal">
        <span class=" material-symbols-outlined me-2"> add </span>
        {{ $t('ConfigSettings.zone-detail.title_save') }}
      </button>
    </div>
  </div>
  <ZoneDetailTable :zoneDetail="filteredZoneDetail" @detail="showZoneDetail" @edit="editZoneDetail"
    @delete="deleteZoneDetail" />
  <div class="modal fade" id="warehouseZoneModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedZoneDetail.sysIdChiTietKhuVuc ? $t("ConfigSettings.zone-detail.title_edit")
              : $t("ConfigSettings.zone-detail.title_save") }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-12 col-md-6 mb-md-0 mb-3">
                  <label for="maChiTietKhuVuc" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.zone-detail.zone_detail_id') }}</label>
                  <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="maChiTietKhuVuc" aria-describedby="maChiTietKhuVucHelp"
                    v-model="selectedZoneDetail.maChiTietKhuVuc" />
                </div>
                <div class="col-12 col-md-6">
                  <label for="tenChiTietKhuVuc" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.zone-detail.zone_detail_name')
                  }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="tenChiTietKhuVuc" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedZoneDetail.tenChiTietKhuVuc" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="areaStorage" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.zone-detail.area_storage') }}</label>
                  <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="areaStorage" aria-describedby="maChiTietKhuVucHelp"
                    v-model="selectedZoneDetail.theTichLuuTru" />
                </div>
                <div class="col-6">
                  <label for="areaAvailable" class="form-label fs fw-bold">{{
                    $t('ConfigSettings.zone-detail.area_available')
                  }}</label> <span class="text-danger">*</span>
                  <input type="text" class="form-control" id="areaAvailable" aria-moTa="warehouseZoneNameHelp"
                    v-model="selectedZoneDetail.theTichKhaDung" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="maKhuVuc" class="form-label fs fw-bold">{{ $t('ConfigSettings.zone-detail.zone_id')
                }}</label>
              <span class="text-danger">*</span>
              <select class="form-select" id="maKhuVuc" v-model="selectedZoneDetail.maKhuVuc">
                <option value="" disabled>{{ $t('ConfigSettings.zone-detail.choose_zone') }}</option>
                <option v-for="zoneDetail in zoneStore.zones" :key="zoneDetail.maKhuVuc" :value="zoneDetail.maKhuVuc">
                  {{ zoneDetail.maKhuVuc }} - {{ zoneDetail.tenKhuVuc }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="warehouseZoneDescription" class="form-label fs fw-bold">{{
                $t('ConfigSettings.zone-detail.zone_detail_desc') }}</label>
              <textarea class="form-control" id="warehouseZoneDescription" rows="4"
                aria-describedby="warehouseZoneDescriptionHelp" v-model="selectedZoneDetail.moTa"></textarea>
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
            {{ selectedZoneDetail.sysIdChiTietKhuVuc ? $t("ConfigSettings.btn_update") :
              $t("ConfigSettings.btn_save")
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useApiServices } from "@/services/apiService.js";
import { useZoneStore } from "@/store/zoneStore.js";
import { showToastSuccess, showToastError } from "@/utils/Toast/toastHandle.js";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import SearchInput from "@/components/Common/Search/SearchInput.vue";
import { useRouter } from "vue-router";
import ZoneDetailTable from "./ZoneDetailTable.vue";
const { t } = useI18n();

const router = useRouter();
const apiService = useApiServices();
const zoneDetail = ref([]);
const zoneStore = useZoneStore();
const selectedZone = ref("");
const addZoneDetailBtn = ref(null);
// Search
const searchQuery = ref("");
// Sort
const sortOption = ref("");

const selectedZoneDetail = reactive({
  sysIdChiTietKhuVuc: "",
  maChiTietKhuVuc: "",
  tenChiTietKhuVuc: "",
  moTa: "",
  theTichLuuTru: "",
  theTichKhaDung: "",
  maKhuVuc: "",
});

onMounted(async () => {
  await getZoneDetail();
  await zoneStore.getZones();
});


const getZoneDetail = async () => {
  try {
    const response = await apiService.get("zone-details");
    zoneDetail.value = response.data;
  } catch (error) {
    console.error("Failed to fetch zone detail:", error);
  }
};

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredZoneDetail = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let filtered = zoneDetail.value.
    filter(zone => zone.maKhuVuc === selectedZone.value || !selectedZone.value)
    .filter(zone =>
      removeAccents(zone.maChiTietKhuVuc.toLowerCase()).includes(query) ||
      removeAccents(zone.tenChiTietKhuVuc.toLowerCase()).includes(query) ||
      removeAccents(zone.moTa.toLowerCase()).includes(query) ||
      zone.moTa.toLowerCase().includes(query) ||
      zone.maKhuVuc.toLowerCase().includes(query) ||
      zone.theTichLuuTru.toString().includes(query) ||
      zone.theTichKhaDung.toString().includes(query)
    );

  if (sortOption.value === "name-asc") {
    filtered.sort((a, b) => a.tenChiTietKhuVuc.localeCompare(b.tenChiTietKhuVuc)); // A-Z
  } else if (sortOption.value === "name-desc") {
    filtered.sort((a, b) => b.tenChiTietKhuVuc.localeCompare(a.tenChiTietKhuVuc)); // Z-A
  } else if (sortOption.value === "area-volume-asc") {
    filtered.sort((a, b) => a.theTichLuuTru - b.theTichLuuTru);
  } else if (sortOption.value === "area-volume-desc") {
    filtered.sort((a, b) => b.theTichLuuTru - a.theTichLuuTru);
  }

  return filtered;
});

const toggleSortByName = () => {
  sortOption.value = sortOption.value === "name-asc" ? "name-desc" : "name-asc";
  updateUrl();
};

const toggleSortByAreaVolume = () => {
  sortOption.value = sortOption.value === "area-volume-asc" ? "area-volume-desc" : "area-volume-asc";
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
  if (!selectedZoneDetail.maChiTietKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zone-detail.swal.validate.zone_detail_id"));
    return;
  }

  if (!selectedZoneDetail.tenChiTietKhuVuc.trim()) {
    showToastError(i18n.global.t("ConfigSettings.zone-detail.swal.validate.zone_detail_name"));
    return;
  }

  if (!selectedZoneDetail.theTichLuuTru) {
    showToastError(i18n.global.t("ConfigSettings.zone-detail.swal.validate.area_storage"));
    return;
  }

  if (!selectedZoneDetail.theTichKhaDung) {
    showToastError(i18n.global.t("ConfigSettings.zone-detail.swal.validate.area_available"));
    return;
  }

  if (!selectedZoneDetail.maKhuVuc) {
    showToastError(i18n.global.t("ConfigSettings.zone-detail.swal.validate.zone_id"));
    return;
  }

  try {
    const zoneData = {
      maChiTietKhuVuc: selectedZoneDetail.maChiTietKhuVuc,
      tenChiTietKhuVuc: selectedZoneDetail.tenChiTietKhuVuc,
      moTa: selectedZoneDetail.moTa,
      theTichLuuTru: selectedZoneDetail.theTichLuuTru,
      theTichKhaDung: selectedZoneDetail.theTichKhaDung,
      maKhuVuc: selectedZoneDetail.maKhuVuc,
    };

    const response = selectedZoneDetail.sysIdChiTietKhuVuc
      ? await apiService.post("zone-details", { ...zoneData, sysIdChiTietKhuVuc: selectedZoneDetail.sysIdChiTietKhuVuc })
      : await apiService.post("zone-details", zoneData);

    if (response) {
      await getZoneDetail();
      btnResetForm();
      addZoneDetailBtn.value.click();
      showToastSuccess(i18n.global.t("ConfigSettings.zone-detail.swal.success"));
    } else if (response?.error) {
      console.error("Error details:", response.error);
    }
  } catch (error) {
    console.error("Error while saving zone:", error);
  }
};

const editZoneDetail = (zoneDetail) => {
  Object.assign(selectedZoneDetail, zoneDetail);
  addZoneDetailBtn.value.click();
};

const deleteZoneDetail = async (id) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("ConfigSettings.zone-detail.swal.delete.title"),
    text: i18n.global.t("ConfigSettings.zone-detail.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("ConfigSettings.zone-detail.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("ConfigSettings.zone-detail.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`zone-details/${id}`);
      await getZoneDetail();
      showToastSuccess(i18n.global.t("ConfigSettings.zone-detail.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting zone:", error);
      showToastError("Xóa khu vực thất bại. Vui lòng thử lại");
    }
  }
};

const btnResetForm = () => {
  Object.assign(selectedZoneDetail, {
    sysIdChiTietKhuVuc: "",
    maChiTietKhuVuc: "",
    tenChiTietKhuVuc: "",
    moTa: "",
    theTichLuuTru: "",
    theTichKhaDung: "",
    maKhuVuc: "",
  });
};

const showZoneDetail = (id) => {
  router.push({ path: `/inventory/lots-management/lots-normal/${id}` })
}
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>
