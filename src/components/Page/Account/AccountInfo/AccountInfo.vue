<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4 box-shadow">
          <div class="card-body text-center">
            <div class="d-flex justify-content-center mb-3">
              <div style="width: 320px; height: 278px;">
                <img :src="avatarUrl" alt="Avatar" class="rounded-4 img-fluid mb-3" loading="lazy" @click="saveAvatar()"
                  style="object-fit: cover; object-position: center; width: 100%; height: 100%;" />
              </div>
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
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore';
import BasicInfo from './BasicInfo.vue';
import ChangePassword from './ChangePassword.vue';
import { useApiServices } from "@/services/apiService";
import { validateImage } from '@/utils/image';

const apiService = useApiServices();
const userStore = useUserStore();
const defaultAvatar = 'https://scontent-sin2-2.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHhpylGP-pRms_VZ8gahMcxWt9TLzuBU1Ba31MvO4FTUEPSj7eG2-liyHygiWo4_l0k3agXQGFkKlM5KXb6mLiO&_nc_ohc=nhHrY9pzliIQ7kNvgFT9LSh&_nc_zt=24&_nc_ht=scontent-sin2-2.xx&_nc_gid=ABYRsLogzm2p1zMr-TshowT&oh=00_AYBPq1EYWpZvdd3cAL6gv0wzJv-XEnAHsC1RhisNhbEKRA&oe=67776D7A';
const avatarUrl = ref(null);

onMounted(() => {
  userStore.user;
  // console.log("Mounted:", userStore.user);
  validateImage(userStore.user.hinhAnh, defaultAvatar, (url) => {
    avatarUrl.value = url;
  });
});

const userInfo = reactive({
  username: userStore.user.username,
  fullName: userStore.user.fullName,
  email: userStore.user.email,
  soDienThoai: userStore.user.soDienThoai,
  hinhAnh: '',
});

const saveAvatar = async () => {
  const response = await apiService.postImage('users/update-info',
    userStore.user
  );
  console.log(userStore.user);
}
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
