<template>
  <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <h2 class="d-flex justify-content-center align-items-center gap-2">
              <span class="display-1 fw-bold text-change">4</span>
              <span class="material-symbols-outlined text-danger display-1"> error </span>
              <span class="display-1 fw-bold text-change">4</span>
            </h2>
            <h3 class="mb-5 text-change">Trang bạn tìm kiếm không tồn tại.</h3>
            <router-link class="btn bsb-btn-5xl btn-dark l px-5 fs-6 m-0" to="/inventory/home" role="button">Trở về
              trang chủ
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-change {
  color: var(--nav-link-color);
  color: var(--nav-link-color);
}

.btn-dark {
  background-color: var(--nav-link-color);
  color: var(--text-select);
}

.bsb-btn-xl {
  --bs-btn-padding-y: 0.625rem;
  --bs-btn-padding-x: 1.25rem;
  --bs-btn-font-size: calc(1.26rem + 0.12vw);
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}

@media (min-width: 1200px) {
  .bsb-btn-xl {
    --bs-btn-font-size: 1.35rem;
  }
}

.bsb-btn-2xl {
  --bs-btn-padding-y: 0.75rem;
  --bs-btn-padding-x: 1.5rem;
  --bs-btn-font-size: calc(1.27rem + 0.24vw);
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}

@media (min-width: 1200px) {
  .bsb-btn-2xl {
    --bs-btn-font-size: 1.45rem;
  }
}

.bsb-btn-3xl {
  --bs-btn-padding-y: 0.875rem;
  --bs-btn-padding-x: 1.75rem;
  --bs-btn-font-size: calc(1.28rem + 0.36vw);
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}

@media (min-width: 1200px) {
  .bsb-btn-3xl {
    --bs-btn-font-size: 1.55rem;
  }
}

.bsb-btn-4xl {
  --bs-btn-padding-y: 1rem;
  --bs-btn-padding-x: 2rem;
  --bs-btn-font-size: calc(1.29rem + 0.48vw);
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}

@media (min-width: 1200px) {
  .bsb-btn-4xl {
    --bs-btn-font-size: 1.65rem;
  }
}

.bsb-btn-5xl {
  --bs-btn-padding-y: 1.125rem;
  --bs-btn-padding-x: 2.25rem;
  --bs-btn-font-size: calc(1.3rem + 0.6vw);
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}

@media (min-width: 1200px) {
  .bsb-btn-5xl {
    --bs-btn-font-size: 1.75rem;
  }
}

.bsb-flip {
  transform: scale(-1);
}

.bsb-flip-v {
  transform: scaleY(-1);
}
</style>
