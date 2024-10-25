<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4 box-shadow">
          <div class="card-body text-center">
            <div class="d-flex justify-content-center">
              <img src="https://avatars.githubusercontent.com/u/121915529?v=4" alt="User Profile"
                class="rounded-4 img-fluid mb-3" width="150" loading="lazy" />
            </div>
            <h5 class="mt-1 fw-bold" style="color: var(--label-color);">Phan Huy Hoàng
            </h5>
            <div class="d-flex justify-content-center mb-2">
              <span class="badge bg-primary"
                style="background-color: var(--primary-color) !important; border-radius: 8px; color: var(--btn-primary-color) !important;">Admin</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4 box-shadow p-4">
          <div class="card-body">
            <h5 class="mb-4 fw-bold" style="color: var(--primary-color); font-size: 1.5rem">
              {{ $t("AccountInfo.title_info") }}
            </h5>
            <form @submit.prevent="updateBasicInfo">
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="fullname" class="form-label">{{ $t("AccountInfo.label.fullname") }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="fullname" v-model="basicInfo.fullname" type="text" class="form-control" />
                </div>
              </div>
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="username" class="form-label">{{ $t("AccountInfo.label.username") }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="username" v-model="basicInfo.username" type="text" class="form-control" />
                </div>
              </div>
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="email" class="form-label">Email</label>
                </div>
                <div class="col-sm-8">
                  <input id="email" v-model="basicInfo.email" type="email" class="form-control" />
                </div>
              </div>
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="phone" class="form-label">{{ $t("AccountInfo.label.phone") }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="phone" v-model="basicInfo.phone" type="tel" class="form-control" />
                </div>
              </div>
              <button type="submit" class="btn btn-primary d-flex align-items-center">
                <span class="material-symbols-outlined me-2">sync</span>
                {{ $t("AccountInfo.btn_update") }}
              </button>
            </form>
          </div>
        </div>
        <div class="card box-shadow p-4">
          <div class="card-body">
            <h5 class="mb-4 fw-bold" style="color: var(--primary-color); font-size: 1.5rem">{{
              $t("AccountInfo.title_password") }}</h5>
            <form @submit.prevent="changePassword">
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="oldPassword" class="form-label">{{ $t("AccountInfo.label.password.old") }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="oldPassword" v-model="passwordChange.oldPassword" type="password" class="form-control" />
                </div>
              </div>
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="newPassword" class="form-label">{{ $t("AccountInfo.label.password.new") }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="newPassword" v-model="passwordChange.newPassword" type="password" class="form-control" />
                </div>
              </div>
              <div class="row mb-3 d-flex align-items-center">
                <div class="col-sm-4">
                  <label for="confirmPassword" class="form-label">{{ $t("AccountInfo.label.password.confirm")
                    }}</label>
                </div>
                <div class="col-sm-8">
                  <input id="confirmPassword" v-model="passwordChange.confirmPassword" type="password"
                    class="form-control" />
                </div>
              </div>
              <button type="submit" class="btn btn-primary d-flex align-items-center">
                <span class="material-symbols-outlined me-2">sync</span>
                {{ $t("AccountInfo.btn_update") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const basicInfo = reactive({
  fullname: 'Phan Huy Hoàng',
  username: 'phh235',
  email: 'phanhuyhoang.dev@gmail.com',
  phone: '0559224553'
});

const passwordChange = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});
</script>

<style scoped>
.card {
  background-color: var(--background-color);
}

.form-label {
  font-weight: bold;
  color: var(--nav-link-color);
  font-size: 15px;
}

.card {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

@media screen and (max-width: 2000px) {
  .form-control {
    max-width: 300px;
  }

  .container {
    max-width: 1200px;
  }
}
</style>