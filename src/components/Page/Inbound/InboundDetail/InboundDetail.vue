<template>
  <div class="container mt-4">
    <h4 class="fw-bold">Phiếu nhập</h4>
    <div
      class="mb-3"
      style="
        padding: 1rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
        border: 1px solid #00000014;
      "
    >
      <div class="d-flex justify-content-between">
        <div class="row mb-3">
          <div class="col">
            <button class="btn btn-primary me-2">Đánh dấu việc cần làm</button>
            <button class="btn btn-secondary me-2">In nhãn</button>
            <button class="btn btn-logout" @click="btnCancel">Hủy</button>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <div class="btn-group" role="group">
              <button
                v-for="(label, key) in statusOptions"
                :key="key"
                :class="['btn', status === key ? 'btn-primary' : 'btn-secondary']"
                @click="status = key"
              >
                {{ label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Nhập từ</label>
          <select class="form-select">
            <option value="" selected>Chọn nơi nhập</option>
            <option v-for="from in froms" :key="from.id" :value="from.id">
              {{ from.name }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Ngày theo kế hoạch</label>
          <input type="date" class="form-control" />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Loại hoạt động</label>
          <input type="text" class="form-control" value="phh235: Phiếu nhập kho" />
        </div>
        <div class="col-md-4">
          <label class="form-label">Vị trí đích</label>
          <select class="form-select">
            <option value="" selected>Chọn kho</option>
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Vị trí đích</label>
          <select class="form-select">
            <option value="" selected>Chọn kho</option>
            <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>
      </div> -->
    </div>
    <div
      style="
        padding: 1rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
        border: 1px solid #00000014;
      "
    >
      <div class="row mb-3">
        <div class="col">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Hoạt động
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Thông tin bổ sung
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Ghi chú
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Ngày theo kế hoạch</th>
                    <th>Hạn chót</th>
                    <th>Nhu cầu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in products" :key="index">
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Thêm sản phẩm"
                        v-model="product.name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mô tả"
                        v-model="product.description"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Ngày theo kế hoạch"
                        v-model="product.plannedDate"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Hạn chót"
                        v-model="product.deadline"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nhu cầu"
                        v-model="product.requirement"
                      />
                    </td>
                  </tr>
                  <button class="btn btn-primary ms-2 mt-3" @click="addNewProduct">Thêm</button>
                </tbody>
              </table>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div class="mt-3">
                <h6 class="fw-bold">Thông tin khác</h6>
                <p>
                  Người phụ trách:
                  <span style="color: var(--main-text-color); font-weight: bold">phh235</span>
                </p>
              </div>
              <div class="mt-3"></div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div class="mt-3">
                <h6 for="note" class="fw-bold">Ghi chú</h6>
                <textarea
                  class="form-control"
                  id="note"
                  rows="5"
                  style="width: 100%"
                  placeholder="Ghi chú"
                  v-model="newProduct.note"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const inputFrom = ref("");
const status = ref("nhap");
const statusOptions = {
  nhap: "Nháp",
  "san-sang": "Sẵn sàng",
  "hoan-tat": "Hoàn tất",
};

const products = ref([
  {
    name: "",
    description: "",
    plannedDate: "",
    deadline: "",
    requirement: "",
  },
]);

const addNewProduct = () => {
  products.value.push({
    name: "",
    description: "",
    plannedDate: "",
    deadline: "",
    requirement: "",
  });
};

const newProduct = reactive({
  name: "",
  description: "",
  plannedDate: "",
  deadline: "",
  requirement: "",
});

const warehouses = ref([
  {
    id: 1,
    name: "phh235",
  },
  {
    id: 2,
    name: "trungnb",
  },
  {
    id: 3,
    name: "giangvth",
  },
]);
const froms = ref([
  {
    id: 1,
    name: "phh235",
  },
  {
    id: 2,
    name: "trungnb",
  },
  {
    id: 3,
    name: "giangvth",
  },
]);

const btnCancel = () => {
  window.history.back();
};
</script>

<style scoped>
input,
.form-select,
textarea {
  padding: 0.5rem;
  font-size: 15px;
  border-radius: 8px;
  /* border: 2px solid var(--secondary-color); */
  border: 2px solid #dcdcdc !important;
  transition: all 0.2s;
  &:focus,
  &:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
    border: 2px solid var(--border-input-color) !important;
  }
}
.nav-link {
  color: #000;
  border: 1px solid #d3d3d3;
  font-size: 14px;
}
.nav-link.active {
  color: #000;
  background-color: var(--primary-color);
}
.form-label {
  font-weight: bold;
}
.btn-logout {
  background-color: #fef2f2;
  color: #ef4444 !important;
  border: 1px solid #fef2f2;
  font-size: 14px;
  &:hover {
    border: 1px solid #c20000;
  }
}
</style>
