<template>
  <div class="form-group fs has-search me-2">
    <span class="material-symbols-outlined form-control-feedback" style="color: #959595 !important;">search</span>
    <input type="search" class="form-control" :placeholder="placeholder" v-model="model" />
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';

// Nhận props từ component cha
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
});

// Sử dụng `toRefs` để tách `modelValue`
const { modelValue, placeholder } = toRefs(props);

// Sử dụng emit để phát ra sự kiện 'update:modelValue'
const emit = defineEmits(['update:modelValue']);

// Đồng bộ giá trị của input với `v-model`
const model = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
});
</script>

<style scoped>
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--search-input-color) !important;
  /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--search-input-color) !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--search-input-color) !important;
}

input[type='search']::-webkit-search-cancel-button {
  filter: grayscale(1);
}
</style>
