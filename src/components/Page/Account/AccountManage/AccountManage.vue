<template>
  <div class="container p-4 box-shadow">
    <div class="mb-3 d-flex justify-content-end align-items-center">
      <div class="form-group fs has-search d-flex align-items-center me-2">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input type="search" class="form-control" :placeholder="$t('AccountManagement.search_input')"
          v-model="searchQuery" />
      </div>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addCategoryBtn"
        data-bs-toggle="modal" data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('AccountManagement.btn_account') }}
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover" @click="handleRowClick">
        <thead>
          <tr>
            <th class="table-col-id">
              {{ $t('AccountManagement.no') }}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0" style="text-align: center; font-style: italic">
            <td colspan="10">Không tìm thấy người dùng</td>
          </tr>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td class="d-none">{{ user.password }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.roleId }}</td>
            <td>
              <button class="btn btn-danger d-flex">
                <div class="material-symbols-outlined">delete</div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="categoryModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              <!-- {{ sy.sysIdDanhMuc ? "Chỉnh sửa người dùng" : "Thêm người dùng" }} -->
              Cấp tài khoản
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-2 d-none">
                <label for="id">ID</label>
                <input type="text" class="form-control" id="id" />
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="username">Tên người dùng</label>
                    <input type="text" class="form-control" id="username" />
                  </div>
                  <div class="col-6">
                    <label for="password">Mật khẩu</label>
                    <input type="password" class="form-control" id="password" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" />
                  </div>
                  <div class="col-6">
                    <label for="roleId">Vai trò</label>
                    <select class="form-select" id="roleId">
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-logout" data-bs-dismiss="modal" @click="btnResetForm_Click">
              Hủy
            </button>
            <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveCategory">
              <span class="material-symbols-outlined me-2">check</span> Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Dữ liệu ảo
const users = ref([
  {
    id: 1,
    username: "admin1",
    password: "admin123",
    email: "admin1@example.com",
    phoneNumber: "0123456789",
    roleId: 1,
  },
  {
    id: 2,
    username: "user1",
    password: "user123",
    email: "user1@example.com",
    phoneNumber: "0123456789",
    roleId: 2,
  },
  {
    id: 3,
    username: "admin2",
    password: "admin456",
    email: "admin2@example.com",
    phoneNumber: "0123456789",
    roleId: 1,
  },
  {
    id: 4,
    username: "user2",
    password: "user456",
    email: "user2@example.com",
    phoneNumber: "0123456789",
    roleId: 2,
  },
]);

// Biến cho lọc tìm kiếm và role
const searchQuery = ref("");
const roleFilter = ref("");

// Lọc người dùng theo tìm kiếm và role
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return users.value.filter((user) => {
    const matchesSearchQuery =
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phoneNumber.toString().includes(query);
    const matchesRole = roleFilter.value === "" || user.roleId.toString() === roleFilter.value;
    return matchesSearchQuery && matchesRole;
  });
});
</script>

<style scoped>
.container {
  width: 70%;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

td {
  font-size: 0.875rem;
  cursor: pointer;
  vertical-align: middle;
}

.btn-danger {
  padding: 6px 6px;
}

label {
  font-weight: bold;
  font-size: 0.875rem;
}
</style>
