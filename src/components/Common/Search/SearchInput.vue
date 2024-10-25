<template>
  <div class="form-group fs has-search me-2">
    <span class="material-symbols-outlined form-control-feedback">search</span>
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
