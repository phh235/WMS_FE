<template>
  <div class="container-fluid p-0">
    <!-- <div class="row">
      <Card />
    </div> -->
    <div class="d-flex justify-content-center align-items-center mt-5">
      <div class="warehouse-block box-shadow">
        <div class="row">
          <div class="col-12 col-md-6 mb-3" v-for="warehouse in warehouses" :key="warehouse.type">
            <router-link :to="warehouse.link"
              class="warehouse-card box-shadow d-flex justify-content-center align-items-center">
              <h3 class="fw-bold">{{ warehouse.name }}</h3>
              <span class="material-symbols-outlined ms-5">{{ warehouse.icon }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const warehouses = ref([
  { type: "normal", name: "Kho thường", icon: "width_normal", link: "/inventory/normal-warehouse" },
  { type: "cold", name: "Kho lạnh", icon: "ac_unit", link: "/inventory/cold-warehouse" },
]);
</script>

<style scoped>
.warehouse-block {
  width: 80%;
  padding: 30px;
  background-color: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
  color: var(--nav-link-color);
}

.warehouse-card {
  display: block;
  padding: 140px;
  text-decoration: none;
  color: inherit;
  border-radius: 1rem;
  border: 3px solid var(--border-main-color);
  color: var(--nav-link-color);
  transition: none;

  &:hover {
    color: var(--text-select);
    background-image: url("https://res.cloudinary.com/dnfccnxew/image/upload/v1725710674/aepjhdbiizkukw60fhuf.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.material-symbols-outlined {
  font-size: 100px;
}
</style>
