<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4 box-shadow">
          <div class="card-body text-center">
            <div class="d-flex justify-content-center">
              <img :src="userStore.user.hinhAnh" alt="avatar" class="rounded-4 img-fluid mb-3" width="278"
                loading="lazy" />
            </div>
            <h4 class="fw-bold" style="color: var(--label-color);">{{ userStore.user.fullName }}</h4>
            <div class="d-flex justify-content-center">
              <span class="badge p-2 box-shadow"
                style="background-color: var(--primary-color) !important; border-radius: 8px; color: var(--btn-primary-color) !important; font-size: 0.875rem !important">{{
                  userStore.user.role }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <BasicInfo />
        <ChangePassword />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
import BasicInfo from './BasicInfo.vue';
import ChangePassword from './ChangePassword.vue';

const userStore = useUserStore();
</script>

<style scoped>
.card {
  background-color: var(--background-color);
}

.card :deep(.form-label) {
  font-weight: bold;
  color: var(--nav-link-color);
  font-size: 15px;
}

.card {
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

@media screen and (max-width: 2000px) {
  .card :deep(.form-control) {
    max-width: 300px;
  }

  .container {
    max-width: 1200px;
  }
}
</style>
