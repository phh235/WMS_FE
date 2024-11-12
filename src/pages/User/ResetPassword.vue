<template>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;"> {{
        $t("LoginForgotForm.reset.title") }}</h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);"> {{ $t("LoginForgotForm.reset.small") }}
      </h6>
      <form style="width: 20rem; margin: auto" @submit.prevent="handleResetPassword">
        <div class="mb-3">
          <label class="form-label fs" for="password">{{ $t("LoginForgotForm.reset.password") }}</label>
          <input type="text" id="password" class="form-control" v-model="passwordInput.password" />
        </div>
        <div class="mb-3">
          <label class="form-label fs" for="confirmPassword">{{ $t("LoginForgotForm.reset.confirm") }}</label>
          <input type="text" id="confirmPassword" class="form-control" v-model="passwordInput.confirmPassword" />
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.reset.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { showToastError, showToastInfo, showToastSuccess } from "@/components/Toast/utils/toastHandle";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const loading = ref(false);

const passwordInput = reactive({
  password: '',
  confirmPassword: ''
});

const handleResetPassword = async () => {
  if (!passwordInput.password) {
    showToastError(i18n.global.t("Swal.reset.toast.error.text"));
    return;
  }
  if (!passwordInput.confirmPassword) {
    showToastError(i18n.global.t("Swal.reset.toast.error.text_confirm"));
    return;
  }

  if (passwordInput.password !== passwordInput.confirmPassword) {
    showToastError(i18n.global.t("Swal.reset.toast.error.text_confirm_password"));
    return;
  }

  loading.value = true;
  try {
    showToastSuccess(i18n.global.t("Swal.reset.toast.success.title"))
    setTimeout(function () {
      showToastInfo(i18n.global.t("Swal.reset.toast.info.title"), i18n.global.t("Swal.reset.toast.info.text"));
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
