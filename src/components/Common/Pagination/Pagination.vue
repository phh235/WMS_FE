<template>
  <div class="d-flex align-items-center flex-wrap">
    <nav aria-label="Page navigation" class="flex-grow-1">
      <ul class="pagination mb-2 mb-md-0 justify-content-center justify-content-md-start">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(1)" aria-label="First page">
            <span class="material-symbols-outlined">
              keyboard_double_arrow_left
            </span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" aria-label="Previous page">
            <span class="material-symbols-outlined">
              keyboard_arrow_left
            </span>
          </a>
        </li>
        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page === '...' ? page : page.toString() }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" aria-label="Next page">
            <span class="material-symbols-outlined">
              keyboard_arrow_right
            </span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)" aria-label="Last page">
            <span class="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="select-wrapper ms-0 ms-md-2">
      <select id="itemsPerPage" v-model="itemsPerPage" class="form-select" style="width: auto;" @change="changeItemsPerPage">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change', 'items-per-page-change']);

const itemsPerPage = ref(props.itemsPerPage);

const visiblePages = computed(() => {
  const delta = 2;
  const range = [];
  for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.totalPages - 1, props.currentPage + delta); i++) {
    range.push(i);
  }

  if (props.currentPage - delta > 2) {
    range.unshift("...");
  }
  if (props.currentPage + delta < props.totalPages - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (props.totalPages !== 1) {
    range.push(props.totalPages);
  }

  return range;
});

const changePage = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('page-change', page);
  }
};

const changeItemsPerPage = () => {
  emit('items-per-page-change', parseInt(itemsPerPage.value));
};
</script>

<style scoped>
.page-item {
  margin: 0 3px;
}

.page-link {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04) !important;
  border-radius: calc(.875rem - 1px);
  width: 40px;
  height: 40px;
  color: var(--nav-link-color);
  background-color: var(--background-color);
  border: 1.5px solid var(--border-main-color);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-item:first-child .page-link,
.page-item:last-child .page-link {
  border-radius: calc(.875rem - 1px);
}

.page-item.active .page-link {
  color: var(--text-select);
  background-color: #28a745;
  border-color: #28a745;
}

.page-item:not(.active) .page-link:hover {
  background-color: var(--secondary-color-hover);
  border-color: var(--border-main-color);
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: not-allowed;
  background-color: var(--background-color);
  border-color: var(--border-main-color);
}

label {
  margin-bottom: 0;
  color: var(--nav-link-color);
}

@media (max-width: 768px) {
  .pagination {
    flex-wrap: wrap;
  }
  .select-wrapper {
    width: 100%;
    margin-top: 10px;
  }
}
</style>

