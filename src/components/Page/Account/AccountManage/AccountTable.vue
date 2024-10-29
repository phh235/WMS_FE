<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="table-col-id">
            {{ $t('AccountManagement.no') }}
          </th>
          <th class="table-col-username">
            {{ $t('AccountManagement.fullname') }}
          </th>
          <th class="table-col-username">
            {{ $t('AccountManagement.username') }}
          </th>
          <th class="table-col-password d-none">Mật khẩu</th>
          <th class="table-col-email">Email</th>
          <th class="table-col-email">
            {{ $t('AccountManagement.phone') }}
          </th>
          <th class="table-col-roleId"> {{ $t('AccountManagement.role') }}
          </th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">Không tìm thấy người dùng</td>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.fullName }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.soDienThoai }}</td>
          <td>{{ user.roles[0]?.roleName }}</td>
          <td class="d-flex text-center justify-content-center">
            <button class="btn btn-secondary d-flex me-2" @click="$emit('lock', user)">
              <div class="material-symbols-outlined">lock</div>
            </button>
            <button class="btn btn-secondary d-flex me-2" @click="$emit('edit', user)">
              <div class="material-symbols-outlined">edit_square</div>
            </button>
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

defineEmits(['lock', 'edit', 'delete']);
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>