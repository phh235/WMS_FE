<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card" >
    <!-- Image preview or default image -->
    <img alt="product img front" class="object-cover w-full h-full rounded-md lazyLoad isLoaded" data-v-bff8a75e="" src="https://image.cocoonvietnam.com/uploads/Avatar_Website_Nuoc_duong_toc_tinh_dau_buoi_140ml_Cai_tien_moi_240629_7819f9ba98.jpg">
    <div class="card-body">
      <h5 class="card-title">cocoonvietnam</h5>
      <p class="card-text">
        Sản phẩm treatment dành cho tóc, phù hợp với tình trạng tóc rụng, tóc yếu, tóc thưa mỏng.
         Sản phẩm có thành phần từ tinh dầu bưởi Việt Nam truyền thống, Xylishine, Vitamin B5, Baicapil và Bisabolol.
      </p>
    </div>
  </div>
    </div>
    <div class="col-md-9">
      <!-- Navigation Tabs -->
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link text-dark"
            id="active-tab"
            data-bs-toggle="tab"
            data-bs-target="#active"
            type="button"
            role="tab"
            aria-controls="active"
            aria-selected="true"
          >
            Thông Tin Sản Phẩm
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link text-dark"
            id="link-tab"
            data-bs-toggle="tab"
            data-bs-target="#link1"
            type="button"
            role="tab"
            aria-controls="link1"
            aria-selected="false"
          >
            Tồn Kho
          </button>
        </li>
      </ul>
      <!-- Tab Content -->
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="active"
          role="tabpanel"
          aria-labelledby="active-tab"
        >
          <div class="card">
            <!-- Header -->
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>Danh Mục Sản Phẩm</span>
            </div>
            <!-- Card body with 4 small boxes -->
            <div class="card-body">
              <div class="row">
                <!-- First box -->
                <div class="col-6 col-md-3">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                      <span class="material-symbols-outlined me-2">
                        phone_iphone
                      </span>
                      Điện Thoại
                    </a>
                  </div>
                </div>
                <!-- Second box -->
                <div class="col-6 col-md-3">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                      <span class="material-symbols-outlined me-2">
                        apparel
                      </span>
                      Quần Áo
                    </a>
                  </div>
                </div>
                <!-- Third box -->
                <div class="col-6 col-md-3">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                      <span class="material-symbols-outlined me-2">
                        chair
                      </span>
                      Gia Dụng
                    </a>
                  </div>
                </div>
                <!-- Fourth box -->
                <div class="col-6 col-md-3">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                      <span class="material-symbols-outlined me-2">
dinner_dining
</span>                
                    Thực Phẩm
                    </a>
                  </div>
                </div>
                <div class="col-6 col-md-3 mt-2">
                  <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                      <span class="material-symbols-outlined me-2">
cable
</span>
                      Điện Tử
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- product-details -->
          <div class="card mt-3">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>Chi Tiết Sản Phẩm</span>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Product Name -->
                <div class="col-6 col-md-6">
                  <div class="form-group">
                    <label for="tenSanPham" class="form-label">Tên Sản Phẩm</label>
                    <input
                      type="text"
                      class="form-control"
                      id="tenSanPham"
                    />
                  </div>
                </div>
                <!-- Product Branch -->
                <div class="col-6 col-md-6">
                  <div class="form-group">
                    <label for="maSku" class="form-label">Mã Sku</label>
                    <input type="text" class="form-control" id="maSku" />
                  </div>
                </div>
                <!-- Product Branch -->
                <div class="col-6 col-md-4 mt-3">
                  <div class="form-group">
                    <label for="soLuongHienCo" class="form-label">Số Lượng Hiện Có</label>
                    <input
                      type="text"
                      class="form-control"
                      id="soLuongHienCo"
                    />
                  </div>
                </div>
                <!-- Product Branch -->
                <div class="col-6 col-md-4 mt-3">
                  <div class="form-group">
                    <label for="chiPhi" class="form-label">Chi Phí</label>
                    <input
                      type="text"
                      class="form-control"
                      id="chiPhi"
                    />
                  </div>
                </div>
                <div class="col-6 col-md-4 mt-3">
                  <div class="form-group">
                    <label for="giaBan" class="form-label">Giá Bán</label>
                    <input
                      type="text"
                      class="form-control"
                      id="giaBan"
                    />
                  </div>
                </div>
                <div class="col-6 col-md-4 mt-3">
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1" class="form-label">Mô Tả</label>
                    <textarea class="form-control" id="moTa" rows="3"></textarea>
                  </div>
                </div>
                <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-primary ms-auto" type="submit">
          <span class="material-symbols-outlined">
save
</span>
          Lưu</button>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="link1" role="tabpanel" aria-labelledby="link-tab">
        <h3>Link 1 Content</h3>
        <p>
          This is the content of the first link. It could be a description or detailed information
          about the topic in this tab.
        </p>
      </div>
      <div class="tab-pane fade" id="link2" role="tabpanel" aria-labelledby="link-tab-2">
        <h3>Link 2 Content</h3>
        <p>
          This tab contains another set of information. You can customize the content here as per
          your requirement.
        </p>
      </div>
      <div class="tab-pane fade" id="disabled" role="tabpanel" aria-labelledby="disabled-tab">
        <h3>Disabled Tab</h3>
        <p>This tab is disabled and cannot be clicked.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'Product',
}
</script>

<style scoped>
.card-header {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #97bec6; /* Optional: For better visibility */
}

.card-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-body {
  text-align: center;
}

.card-title {
  margin-top: 10px;
}
.form-group {
  text-align: left;
}
.border {
  transition: background-color 0.3s ease;
}
.list-group-item{
  color: black;
}
.list-group-item:hover {
  color: #a62514;

}
</style>
