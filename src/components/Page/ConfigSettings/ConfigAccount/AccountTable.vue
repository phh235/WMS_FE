<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th style="width: 70px;" @click="$emit('id', toggleSortById)">
            {{ $t('AccountManagement.no') }}
            <span class="material-symbols-outlined align-middle ms-2">swap_vert</span>
          </th>
          <th style="width: 200px;" @click="$emit('fullName', toggleSortByName)">
            {{ $t('AccountManagement.fullname') }}
            <span class="material-symbols-outlined align-middle ms-2">swap_vert</span>
          </th>
          <th style="width: 200px;" @click="$emit('username', toggleSortByUsername)">
            {{ $t('AccountManagement.username') }}
            <span class="material-symbols-outlined align-middle ms-2">swap_vert</span>
          </th>
          <th style="width: 250px;">Email</th>
          <th style="width: 150px;" @click="$emit('phone', toggleSortByPhone)">
            {{ $t('AccountManagement.phone') }}
            <span class="material-symbols-outlined align-middle ms-2">swap_vert</span>
          </th>
          <th style="width: 150px;"> {{ $t('AccountManagement.role') }}
          </th>
          <th style="width: 150px;"> {{ $t('AccountManagement.status') }}
          </th>
          <th scope="col" class="text-center" style="width: 150px;">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy người dùng</td>
        </tr>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ user.sysIdUser }}</td>
          <td>
            <div class="d-flex align-items-center">
              <img :src="user.hinhAnh || defaultAvatar" alt="User avatar" class="me-3 rounded-2" width="39" height="39"
                loading="lazy" style="object-fit: cover; object-position: center" />
              <div class="fw-bold" style="color: var(--nav-link-color);">{{ user.fullName }}</div>
            </div>
          </td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.soDienThoai }}</td>
          <td>{{ user.roles[0]?.moTa }}</td>
          <td>
            <span class="d-flex align-items-center" style="width: fit-content;"
              :class="['badge', getBadgeClass(user.active)]">
              <span class="material-symbols-outlined me-2">{{ statusIcon[user.active] }}</span>
              {{ getStatusLabel(user.active) }}
            </span>
          </td>
          <td class="d-flex text-center justify-content-center">
            <button class="btn btn-secondary d-flex me-2" @click="$emit('lock', user)"
              v-if="user.roles[0]?.moTa !== 'Quản trị hệ thống'">
              <div class="material-symbols-outlined">{{ lockIcon[user.active] }}</div>
            </button>
            <!-- <button class="btn btn-secondary d-flex me-2" @click="$emit('edit', user)">
              <div class="material-symbols-outlined">edit_square</div>
            </button> -->
            <button class="btn btn-danger d-flex" @click="$emit('delete', user.username)"
              v-if="user.roles[0]?.moTa !== 'Quản trị hệ thống'">
              <div class=" material-symbols-outlined">delete
              </div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination :current-page="currentPage" :total-pages="totalPages" :items-per-page="pageSize"
        @page-change="handlePageChange" @items-per-page-change="handleItemsPerPageChange" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted, onBeforeUpdate } from 'vue';
import Pagination from '@/components/Common/Pagination/Pagination.vue';
import { validateImage } from '@/utils/image';

const { t } = useI18n();
const defaultAvatar = 'https://scontent-sin2-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHhpylGP-pRms_VZ8gahMcxWt9TLzuBU1Ba31MvO4FTUEPSj7eG2-liyHygiWo4_l0k3agXQGFkKlM5KXb6mLiO&_nc_ohc=nhHrY9pzliIQ7kNvgFT9LSh&_nc_zt=24&_nc_ht=scontent-sin2-2.xx&_nc_gid=ABYRsLogzm2p1zMr-TshowT&oh=00_AYBPq1EYWpZvdd3cAL6gv0wzJv-XEnAHsC1RhisNhbEKRA&oe=67776D7A';
const avatarUrl = ref(null);

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  props.users.forEach(user => {
    validateImage(user.hinhAnh, defaultAvatar, (url) => {
      user.hinhAnh = url ? url : defaultAvatar; // Gán giá trị default avatar nếu user.hinhAnh không phải là một URL hợp lệ
    });
  });
});

// Thêm hàm này để cập nhật lại giá trị của user.hinhAnh sau khi tải lại trang
onBeforeUpdate(() => {
  props.users.forEach(user => {
    validateImage(user.hinhAnh, defaultAvatar, (url) => {
      user.hinhAnh = url ? url : defaultAvatar; // Gán giá trị default avatar nếu user.hinhAnh không phải là một URL hợp lệ
    });
  });
});


defineEmits(['id', 'fullName', 'username', 'phone', 'lock', 'edit', 'delete']);

const lockIcon = {
  true: 'lock_open',
  false: 'lock',
}

const statusIcon = {
  true: 'check_circle',
  false: 'cancel',
}

const getBadgeClass = (status) => {
  const statusMap = {
    true: "bg-success",
    false: "bg-danger",
  };

  return statusMap[status] || "bg-secondary";
};

const getStatusLabel = (status) => {
  const statusMap = {
    true: t('AccountManagement.active'),
    false: t('AccountManagement.inactive'),
  };

  return statusMap[status] || status;
};


const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(props.users.length / pageSize.value);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.users.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (itemsPerPage) => {
  pageSize.value = itemsPerPage;
  currentPage.value = 1;
};
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}

td {
  height: 60px;
}

.bg-success {
  font-size: 0.875rem;
  background-color: var(--bg-success) !important;
  color: var(--primary-color);
  border: 1.5px solid var(--primary-color);
}

.bg-danger {
  font-size: 0.875rem;
  background-color: var(--bg-danger) !important;
  color: #dc3545;
  border: 1.5px solid #dc3545;
}

.badge {
  padding: 6px 8px;
  border-radius: 12px;
  font-weight: 500;
}
</style>