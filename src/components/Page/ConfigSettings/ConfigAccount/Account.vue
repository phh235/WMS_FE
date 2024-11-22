<template>
  <div class="mb-3 d-flex justify-content-end align-items-center">
    <div class="form-group fs has-search d-flex align-items-center me-2">
      <span class="material-symbols-outlined form-control-feedback">search</span>
      <input type="search" class="form-control" :placeholder="$t('AccountManagement.search_input')"
        v-model="searchQuery" />
    </div>
    <button type="button" class="btn btn-primary d-flex align-items-center" ref="addUserBtn" data-bs-toggle="modal"
      data-bs-target="#accountModal">
      <span class="material-symbols-outlined me-2"> add </span>
      {{ $t('AccountManagement.btn_account') }}
    </button>
  </div>
  <AccountTable :users="filteredUsers" @delete="deleteUser" />
  <div class="modal fade" id="accountModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">
            {{ $t('AccountManagement.add_account_text') }}
          </h5>
          <span class="material-symbols-outlined custom-close" data-bs-dismiss="modal" aria-label="Close"
            @click="btnResetForm">close</span>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="fullName" class="form-label"> {{ $t('AccountManagement.fullname') }}
                  </label>
                  <input type="text" class="form-control" id="fullName" v-model="selectedUser.fullName" />
                </div>
                <div class="col-6">
                  <label for="username" class="form-label"> {{ $t('AccountManagement.username') }}
                  </label>
                  <input type="text" class="form-control" id="username" v-model="selectedUser.username" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="phone" class="form-label"> {{ $t('AccountManagement.phone') }}
                  </label>
                  <input type="text" class="form-control" id="phone" v-model="selectedUser.soDienThoai" />
                </div>
                <div class="col-6">
                  <label for="password" class="form-label"> {{ $t('AccountManagement.password') }}
                  </label>
                  <input type="password" class="form-control" id="password" v-model="selectedUser.password" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <div class="col-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="selectedUser.email" />
                </div>
                <div class="col-6">
                  <label for="roleId" class="form-label"> {{ $t('AccountManagement.role') }}</label>
                  <select class="form-select" id="roleId" v-model="selectedUser.sysIdRole">
                    <option value="">{{ $t('AccountManagement.choose_role') }}</option>
                    <option v-for="role in roleStore.roles" :key="role.sysIdRole" :value="role.sysIdRole">{{
                      role.roleName }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-logout d-flex align-items-center" data-bs-dismiss="modal"
            @click="btnResetForm">
            <span class="material-symbols-outlined me-2">close</span> Hủy
          </button>
          <button type="button" class="btn btn-primary d-flex align-items-center" @click="saveAccount">
            <span class="material-symbols-outlined me-2">check</span> Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRoleStore } from "@/store/roleStore";
import AccountTable from "./AccountTable.vue";
import Swal from "sweetalert2";
import i18n from "@/lang/i18n";
import { useApiServices } from "@/services/apiService";
import { showToastError, showToastSuccess } from "@/utils/Toast/toastHandle";

const userStore = useUserStore();
const roleStore = useRoleStore();
const addUserBtn = ref(null);
const searchQuery = ref("");
const apiService = useApiServices();

onMounted(async () => {
  await userStore.getUsers();
  await roleStore.getRole();
})

const selectedUser = reactive({
  fullName: "",
  username: "",
  email: "",
  soDienThoai: "",
  password: "",
  sysIdRole: "",
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

const saveAccount = async () => {
  if (!selectedUser.fullName) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.fullname"));
    return;
  }

  if (!selectedUser.username) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.username"));
    return;
  }

  if (!selectedUser.soDienThoai) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.phone"));
    return;
  }

  if (!selectedUser.password) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.password"));
    return;
  }

  if (!selectedUser.email) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.email"));
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(selectedUser.email)) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.email_check"));
    return;
  }

  if (!selectedUser.sysIdRole) {
    showToastError(i18n.global.t("AccountManagement.swal.validate.role"));
    return;
  }

  try {
    const accountData = {
      fullName: selectedUser.fullName,
      username: selectedUser.username,
      email: selectedUser.email,
      password: selectedUser.password,
      soDienThoai: selectedUser.soDienThoai,
      sysIdRole: selectedUser.sysIdRole,
    };

    const response = await apiService.post("account", accountData);

    if (response) {
      userStore.getUsers();
      btnResetForm();
      addUserBtn.value.click();
      showToastSuccess(i18n.global.t("AccountManagement.swal.success"));
    }
  } catch (error) {
    console.error("Error while saving account:", error);
  }
}

const deleteUser = async (username) => {
  const swalConfirm = await Swal.fire({
    title: i18n.global.t("AccountManagement.swal.delete.title"),
    text: i18n.global.t("AccountManagement.swal.delete.text"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonText: i18n.global.t("AccountManagement.swal.delete.cancel"),
    cancelButtonColor: "#dc3545",
    confirmButtonText: i18n.global.t("AccountManagement.swal.delete.confirm"),
  });

  if (swalConfirm.isConfirmed) {
    try {
      await apiService.delete(`account/${username}`);
      userStore.getUsers();
      showToastSuccess(i18n.global.t("AccountManagement.swal.delete.success"));
    } catch (error) {
      console.error("Error while deleting account:", error);
      showToastError("Xóa tài khoản thất bại. Vui lòng thử lại");
    }
  }
}

const btnResetForm = () => {
  Object.assign(selectedUser, {
    sysIdUser: "",
    username: "",
    fullName: "",
    password: "",
    email: "",
    soDienThoai: "",
  });
};
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
