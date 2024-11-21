<template>
  <div class="d-flex align-items-center justify-content-center mb-4">
    <router-link to="/login" class="btn btn-secondary d-flex align-items-center justify-content-center">
      <span class="material-symbols-outlined me-2"> chevron_left </span>
      <span class="fw-bold"> {{ $t("LoginForgotForm.forgot.btn_login") }}</span>
    </router-link>
  </div>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;">
        {{ $t("LoginForgotForm.forgot.title") }}
      </h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);">
        {{ $t("LoginForgotForm.forgot.small") }}
      </h6>
      <form style="width: 20rem; margin: auto" @submit.prevent="handleForgotPassword">
        <div class="mb-3">
          <label class="form-label fs" for="email">Email</label>
          <input type="text" id="email" class="form-control" v-model="email" :class="{ 'is-invalid': emailError }" />
          <div v-if="emailError" class="invalid-feedback">
            {{ emailError }}
          </div>
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading: loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm align-middle" role="status"
            aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.forgot.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToastError, showToastInfo, showToastLoading, showToastSuccess } from "@/components/Toast/utils/toastHandle";
import i18n from "@/lang/i18n";
import { useI18n } from "vue-i18n";
import { useApiServices } from "@/services/apiService";

const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const email = ref("");
const emailError = ref("");  // Biến theo dõi lỗi email
const apiService = useApiServices();

const handleForgotPassword = async () => {
  emailError.value = ""; // Reset error trước khi kiểm tra lại

  if (!email.value) {
    emailError.value = t('Swal.forgot.toast.error.text'); // Thông báo lỗi khi bỏ trống
    return;
  }

  // Kiểm tra định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.value = t('AccountInfo.swal.error.email_check'); // Thông báo lỗi nếu email không hợp lệ
    return;
  }

  loading.value = true;
  try {
    showToastLoading(i18n.global.t('PurchaseRequest.table.swal.loading'), 10000);
    const response = await apiService.post(`forgot-password/verify-mail/${email.value}`)
    sessionStorage.setItem("email", email.value);
    if (response) {
      showToastSuccess(i18n.global.t("Swal.forgot.toast.success.title"), i18n.global.t("Swal.forgot.toast.success.text"))
      setTimeout(function () {
        router.push("/confirm-otp");
      }, 1000);
    }
  } catch (error) {
    if (error.response.status === 404) {
      showToastError("Email không tồn tại. Vui lòng kiểm tra lại.");
    } else if (error.response.status === 429) {
      showToastError("Chức năng gửi mail tạm thời vô hiệu hóa gửi mail. Vui lòng thử lại sau.");
    }
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

input {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

/* Bỏ transition chỉ cho input có is-invalid */
input.is-invalid {
  transition: none !important;
  border: 1.5px solid #dc3545 !important;
}
</style>
