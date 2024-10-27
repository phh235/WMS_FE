<template>
  <div class="container p-4 box-shadow">
    <div class="mb-3 d-flex justify-content-end align-items-center">
      <div class="form-group fs has-search d-flex align-items-center me-2">
        <span class="material-symbols-outlined form-control-feedback">search</span>
        <input type="search" class="form-control" :placeholder="$t('AccountManagement.search_input')"
          v-model="searchQuery" />
      </div>
      <button type="button" class="btn btn-primary d-flex align-items-center" ref="addUserBtn" data-bs-toggle="modal"
        data-bs-target="#categoryModal">
        <span class="material-symbols-outlined me-2"> add </span>
        {{ $t('AccountManagement.btn_account') }}
      </button>
    </div>
    <AccountTable :users="filteredUsers" @edit="editUser" @delete="deleteUser" />
    <div class="modal fade" id="categoryModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">
              <!-- {{ sy.sysIdDanhMuc ? "Chỉnh sửa người dùng" : "Thêm người dùng" }} -->
              Cấp tài khoản
            </h5>
            <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close">close</span>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <label for="username">Tên người dùng</label>
                    <input type="text" class="form-control" id="username" v-model="selectedUser.username" />
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
import { ref, computed, onMounted, reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import AccountTable from "./AccountTable.vue";

const userStore = useUserStore();
const addUserBtn = ref(null);
const searchQuery = ref("");

onMounted(async () => {
  await userStore.getUsers();
})

const selectedUser = reactive({
  username: "",
  email: "",
  fullName: "",
  soDienThoai: "",
  roles: [],
});

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return userStore.users.filter((user) => {
    const matchesSearchQuery =
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.soDienThoai.includes(query);
    return matchesSearchQuery;
  });
});

const editUser = (user) => {
  Object.assign(selectedUser, user);
  addUserBtn.value.click();
}

const deleteUser = (username) => {

}
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

label {
  font-weight: bold;
  font-size: 0.875rem;
}
</style>
