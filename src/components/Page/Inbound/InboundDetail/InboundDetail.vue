<template>
  <div class="container mt-4">
    <h4 class="fw-bold" style="color: var(--primary-color);">Phiếu nhập</h4>
    <div class="mb-3 block box-shadow">
      <div class="d-flex justify-content-between">
        <div class="row mb-3">
          <div class="col">
            <button class="btn btn-primary me-2">Đánh dấu việc cần làm</button>
            <button class="btn btn-secondary me-2">In nhãn</button>
            <button class="btn btn-danger" @click="btnCancel">Hủy</button>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <div class="btn-group" role="group">
              <button v-for="(label, key) in statusOptions" :key="key"
                :class="['btn', status === key ? 'btn-primary' : 'btn-secondary']" @click="status = key">
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
    <div class="block box-shadow">
      <div class="row mb-3">
        <div class="col">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                Hoạt động
              </button>
              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                Thông tin bổ sung
              </button>
              <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Ghi chú
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
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
                      <input type="text" class="form-control" placeholder="Thêm sản phẩm" v-model="product.name" />
                    </td>
                    <td>
                      <input type="text" class="form-control" placeholder="Mô tả" v-model="product.description" />
                    </td>
                    <td>
                      <input type="text" class="form-control" placeholder="Ngày theo kế hoạch"
                        v-model="product.plannedDate" />
                    </td>
                    <td>
                      <input type="text" class="form-control" placeholder="Hạn chót" v-model="product.deadline" />
                    </td>
                    <td>
                      <input type="text" class="form-control" placeholder="Nhu cầu" v-model="product.requirement" />
                    </td>
                  </tr>
                  <button class="btn btn-primary ms-2 mt-3" @click="addNewProduct">Thêm</button>
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                  </button>
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div class="mt-3">
                <h6 class="fw-bold" style="color: var(--label-color);">Thông tin khác</h6>
                <p style="color: var(--label-color);">
                  Người phụ trách:
                  <span style="color: var(--primary-color); font-weight: bold">phh235</span>
                </p>
              </div>
              <div class="mt-3"></div>
            </div>
            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
              <div class="mt-3">
                <h6 for="note" class="fw-bold" style="color: var(--label-color);">Ghi chú</h6>
                <textarea class="form-control" id="note" rows="5" style="width: 100%" placeholder="Ghi chú"
                  v-model="newProduct.note"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import ProductForm from "../../Product/ProductForm/ProductForm.vue";

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
.block {
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--border-main-color);
}

.nav-link {
  color: var(--nav-link-color);
  border: 1px solid #d3d3d3;
  font-size: 0.875rem;
}

.nav-link.active {
  color: var(--nav-link-color);
  background-color: var(--primary-color);
}

.form-label {
  font-weight: bold;
  color: var(--label-color);
}

.btn-danger {
  padding: 8px 10px;
  font-size: 0.875rem;
}
</style>
