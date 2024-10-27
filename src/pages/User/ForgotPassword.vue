<template>
  <div class="d-flex align-items-center justify-content-center mb-4">
    <router-link to="/login" class="btn btn-secondary d-flex align-items-center justify-content-center">
      <span class="material-symbols-outlined me-2"> chevron_left </span>
      <span class="fw-bold"> {{ $t("LoginForgotForm.forgot.btn_login") }}
      </span>
    </router-link>
  </div>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;"> {{
        $t("LoginForgotForm.forgot.title") }}</h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);"> {{ $t("LoginForgotForm.forgot.small") }}
      </h6>
      <form style="width: 20rem; margin: auto" @submit.prevent="handleForgotPassword">
        <div class="mb-3">
          <label class="form-label fs" for="email">Email</label>
          <input type="text" id="email" class="form-control" v-model="email" />
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.forgot.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToastError, showToastInfo, showToastSuccess } from "@/components/Toast/utils/toastHandle";
import i18n from "@/lang/i18n";

const router = useRouter();
const loading = ref(false);
const email = ref("");

const handleForgotPassword = async () => {
  if (!email.value) {
    showToastError(i18n.global.t("Swal.forgot.toast.error.title"), i18n.global.t("Swal.forgot.toast.error.text"));
    return;
  }
  loading.value = true;
  try {
    // call api thì dùng await để thực thi /disable - loading/ của button
    showToastSuccess(i18n.global.t("Swal.forgot.toast.success.title"), i18n.global.t("Swal.forgot.toast.success.text"))
    setTimeout(function () {
      showToastInfo(i18n.global.t("Swal.forgot.toast.info.title"), i18n.global.t("Swal.forgot.toast.info.text"));
      setTimeout(function () {
        router.push("/login");
      }, 2000);
    }, 2000);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-label {
  color: var(--label-color);
}

.fs {
  font-size: 0.875rem;
  font-weight: bold;
}

.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
}

.btn-login.loading {
  background-color: var(--primary-color);
  color: var(--text-light-color);
}

@media screen and (max-width: 992.98px) {
  h2 {
    font-size: 37px;
  }

  h6 {
    font-size: 17px;
  }

  .fs {
    font-size: 1rem !important;
    font-weight: bold;
  }

  input {
    font-size: 1rem !important;
  }
}
</style>
