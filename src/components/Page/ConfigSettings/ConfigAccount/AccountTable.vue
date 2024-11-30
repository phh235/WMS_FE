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
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.sysIdUser }}</td>
          <td>{{ user.fullName }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.soDienThoai }}</td>
          <td>{{ user.roles[0]?.roleName }}</td>
          <td>
            <span class="d-flex align-items-center" style="width: fit-content;"
              :class="['badge', getBadgeClass(user.active)]">
              <span class="material-symbols-outlined me-2">{{ statusIcon[user.active] }}</span>
              {{ getStatusLabel(user.active) }}
            </span>
          </td>
          <td class="d-flex text-center justify-content-center">
            <button class="btn btn-secondary d-flex me-2" @click="$emit('lock', user)">
              <div class="material-symbols-outlined">{{ lockIcon[user.active] }}</div>
            </button>
            <!-- <button class="btn btn-secondary d-flex me-2" @click="$emit('edit', user)">
              <div class="material-symbols-outlined">edit_square</div>
            </button> -->
            <button class="btn btn-danger d-flex" @click="$emit('delete', user.username)">
              <div class="material-symbols-outlined">delete</div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  users: {
    type: Array,
    required: true
  }
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
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
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
