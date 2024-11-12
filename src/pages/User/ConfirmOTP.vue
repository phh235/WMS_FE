<template>
  <div class="container d-flex justify-content-center">
    <div>
      <h2 class="text-center mb-1 fw-bold" style="color: var(--primary-color); font-family: Bricolage Grotesque;">
        {{ $t("LoginForgotForm.otp.title") }}
      </h2>
      <h6 class="text-center mb-5" style="color: var(--nav-link-color);">
        {{ $t("LoginForgotForm.otp.small") }}
      </h6>
      <!-- Add the countdown message here -->
      <form style="width: 20rem; margin: auto" @submit.prevent="handleConfirmOTP">
        <div class="mb-3">
          <div class="otp-input-container">
            <input v-for="index in 6" :key="index" :id="index === 1 ? 'otp-input' : ''" ref="inputs"
              v-model="otpDigits[index - 1]" type="text" maxlength="1" class="otp-input" @input="handleInput(index - 1)"
              @keydown="handleKeydown($event, index - 1)" @paste="handlePaste" />
          </div>
        </div>
        <div class="text-center mb-4">
          <p class="countdown-text fw-bold">
            {{ $t("LoginForgotForm.otp.didnt") }}
            <span class="resend-text" @click="handleResendOTP" :class="{ 'disabled': countdown !== 0 }"
              style="color: var(--primary-color) !important; cursor: pointer;">
              {{ $t("LoginForgotForm.otp.resend") }}
            </span>
            <span v-if="countdown !== 0" style="color: var(--primary-color) !important; cursor: pointer;">{{
              $t("LoginForgotForm.otp.in")
            }} {{ countdown }}s</span>
          </p>
        </div>
        <button type="submit" class="btn btn-login w-100 fw-bold" :disabled="loading" :class="{ loading }">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-if="!loading">{{ $t("LoginForgotForm.otp.btn_confirm") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToastError, showToastSuccess } from '@/components/Toast/utils/toastHandle'
import { useI18n } from 'vue-i18n'
import i18n from '@/lang/i18n'

const { t } = useI18n()
const router = useRouter()
const loading = ref(false)
const inputs = ref([])
const otpDigits = ref(['', '', '', '', '', ''])
const countdown = ref(60)

const otp = computed(() => otpDigits.value.join(''))

onMounted(() => {
  if (inputs.value[0]) {
    inputs.value[0].focus()
  }
  countdownTimer()
})

const handleInput = (index) => {
  otpDigits.value[index] = otpDigits.value[index].replace(/[^0-9]/g, '')

  if (otpDigits.value[index] && index < 5) {
    inputs.value[index + 1].focus()
  }
}

const handleKeydown = (event, index) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpDigits.value[index - 1] = ''
    inputs.value[index - 1].focus()
  }
  else if (event.key === 'ArrowLeft' && index > 0) {
    inputs.value[index - 1].focus()
  }
  else if (event.key === 'ArrowRight' && index < 5) {
    inputs.value[index + 1].focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text')
  const numbers = pastedData.replace(/[^0-9]/g, '').split('').slice(0, 6)
  numbers.forEach((num, index) => {
    if (index < 6) {
      otpDigits.value[index] = num
    }
  })
  const focusIndex = Math.min(numbers.length, 5)
  inputs.value[focusIndex].focus()
}

const handleConfirmOTP = async () => {
  if (!otp.value || otp.value.length !== 6) {
    showToastError(i18n.global.t('Swal.otp.toast.error.text'))
    return
  }

  loading.value = true
  try {
    showToastSuccess("Xác thực OTP thành công");
    setTimeout(function () {
      router.push('/reset-password')
    }, 2000);
  } catch (error) {
    console.log('Error:', error)
  } finally {
    loading.value = false
    resetCountdown()
  }
}

const resetCountdown = () => {
  countdown.value = 60
}

const countdownTimer = () => {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

const handleResendOTP = () => {
  resetCountdown()
  countdownTimer()
}
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

.otp-input-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.otp-input {
  width: 2.9rem;
  height: 3.2rem;
  padding: 0;
  font-size: 1.2rem !important;
  text-align: center;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
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

  .otp-input {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }
}
</style>
