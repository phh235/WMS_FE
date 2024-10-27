<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('ConfigSettings.no') }}</th>
          <th scope="col" class="sticky">{{ $t('ConfigSettings.categories.category_name') }}</th>
          <th scope="col">{{ $t('ConfigSettings.categories.category_desc') }}</th>
          <th scope="col" class="text-center">{{ $t('ConfigSettings.btn_action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="categories.length === 0" style="text-align: center; font-style: italic">
          <td colspan="10">{{ $t('ConfigSettings.categories.not_found') }}</td>
        </tr>
        <tr v-for="category in categories" :key="category.sysIdDanhMuc">
          <td scope="row">{{ category.sysIdDanhMuc }}</td>
          <td class="sticky">{{ category.tenDanhMuc }}</td>
          <td>{{ category.moTa }}</td>
          <td class="text-center">
            <button class="btn btn-secondary me-2" @click="$emit('edit', category)">
              <span class="material-symbols-outlined d-flex align-items-center">edit_square</span>
            </button>
            <button class="btn btn-danger" @click="$emit('delete', category.sysIdDanhMuc)">
              <span class="material-symbols-outlined d-flex align-items-center">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  categories: {
    type: Array,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.btn-danger,
.btn-secondary {
  padding: 10px 10px;
}
</style>