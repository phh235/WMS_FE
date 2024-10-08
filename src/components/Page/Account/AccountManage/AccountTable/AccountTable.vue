<template>
  <div class="d-flex justify-content-end flex-wrap mb-2 mt-2">
    <div class="input-group mb-3">
      <div class="form-group has-search me-3 w-50">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input
          type="text"
          class="form-control"
          placeholder="Tìm người dùng"
          v-model="searchQuery"
        />
      </div>
      <select class="form-select" id="roleIdFilter" v-model="roleFilter">
        <option value="">All</option>
        <option value="1">Admin</option>
        <option value="2">User</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th class="table-col-id text-center">ID</th>
          <th class="table-col-username">Username</th>
          <th class="table-col-password">Password</th>
          <th class="table-col-email">Email</th>
          <th class="table-col-roleId">RoleId</th>
          <th class="table-col-actions text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredUsers.length === 0" style="text-align: center; font-style: italic">
          <td colspan="6">Not found</td>
        </tr>
        <tr v-for="user in filteredUsers" :key="user.id" style="cursor: pointer">
          <td class="table-col-id text-center">{{ user.id }}</td>
          <td class="table-col-username">{{ user.username }}</td>
          <td class="table-col-password">{{ user.password }}</td>
          <td class="table-col-email">{{ user.email }}</td>
          <td class="table-col-roleId">{{ user.roleId }}</td>
          <td class="table-col-actions text-center">
            <button class="btn btn-danger" @click="deleteUser(user.id)">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Dữ liệu ảo
const users = ref([
  { id: 1, username: "admin1", password: "admin123", email: "admin1@example.com", roleId: 1 },
  { id: 2, username: "user1", password: "user123", email: "user1@example.com", roleId: 2 },
  { id: 3, username: "admin2", password: "admin456", email: "admin2@example.com", roleId: 1 },
  { id: 4, username: "user2", password: "user456", email: "user2@example.com", roleId: 2 },
]);

// Biến cho lọc tìm kiếm và role
const searchQuery = ref("");
const roleFilter = ref("");

// Xóa người dùng
const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

// Lọc người dùng theo tìm kiếm và role
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearchQuery =
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = roleFilter.value === "" || user.roleId.toString() === roleFilter.value;
    return matchesSearchQuery && matchesRole;
  });
});
</script>

<style scoped>
td {
  font-size: 14px;
}
.table-col-id {
  width: 50px;
}
.table-col-username {
  width: 150px;
}
.table-col-password {
  width: 150px;
}
.table-col-email {
  width: 200px;
}
.table-col-roleId {
  width: 100px;
}
.table-col-actions {
  width: 100px;
  text-align: center;
}
</style>
