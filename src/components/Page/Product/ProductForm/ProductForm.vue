<template>thêm/chi tiết sản phẩm</template>

<!-- <template>
  <div class="container mt-4">
    <h1 class="mb-4">Create a New Product</h1>
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Product Image</h5>
            <div class="dropzone border rounded p-3 text-center">
              <p>Drop your image here, or<br>select Click to browse</p>
            </div>
            <small class="text-muted">You need at least 4 images. Pay attention to the quality of the pictures you add (important)</small>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Setting</h5>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="limitProduct" v-model="limitProduct">
              <label class="form-check-label" for="limitProduct">Limit product?</label>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Status</h5>
            <select class="form-select" v-model="status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Product Type</h5>
            <div class="row">
              <div class="col-3" v-for="type in productTypes" :key="type.name">
                <div class="card" :class="{ 'border-primary': selectedType === type.name }" @click="selectType(type.name)">
                  <div class="card-body text-center">
                    <i :class="type.icon"></i>
                    <p>{{ type.name }}</p>
                    <small>{{ type.items }} items</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Product Detail</h5>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="productName" v-model="productName" placeholder="Enter the name or model of">
              </div>
              <div class="col-md-6">
                <label for="brand" class="form-label">Brand</label>
                <select class="form-select" id="brand" v-model="brand">
                  <option value="">Select product brand</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="processor" class="form-label">Processor</label>
                <select class="form-select" id="processor" v-model="processor">
                  <option value="AMD">AMD</option>
                  <option value="Intel">Intel</option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="ram" class="form-label">RAM (Random Access Memory)</label>
                <input type="text" class="form-control" id="ram" v-model="ram" placeholder="Enter the RAM capacity in GB">
              </div>
              <div class="col-md-4">
                <label for="storage" class="form-label">Storage Capacity</label>
                <select class="form-select" id="storage" v-model="storage">
                  <option value="">Specify the storage capacity</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="screenSize" class="form-label">Screen Size</label>
                <input type="text" class="form-control" id="screenSize" v-model="screenSize" placeholder="Enter the size">
              </div>
              <div class="col-md-4">
                <label for="os" class="form-label">Operating System</label>
                <select class="form-select" id="os" v-model="os">
                  <option value="Windows">Windows</option>
                  <option value="MacOS">MacOS</option>
                  <option value="Linux">Linux</option>
                </select>
              </div>
              <div class="col-md-4">
                <label for="graphics" class="form-label">Graphics Card</label>
                <select class="form-select" id="graphics" v-model="graphics">
                  <option value="Nvidia">Nvidia</option>
                  <option value="AMD">AMD</option>
                  <option value="Intel">Intel</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Product Description</h5>
            <div class="mb-3">
              <textarea class="form-control" rows="5" v-model="description"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="addProduct">Add Product</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const productTypes = ref([
      { name: 'Mobile Phone', icon: 'bi bi-phone', items: 2120 },
      { name: 'Laptop and PC', icon: 'bi bi-laptop', items: 647 },
      { name: 'Smartwatches and Fitness', icon: 'bi bi-smartwatch', items: 164 },
      { name: 'Smart Speakers', icon: 'bi bi-speaker', items: 72 }
    ])
    const selectedType = ref('Laptop and PC')
    const limitProduct = ref(false)
    const status = ref('draft')
    const productName = ref('')
    const brand = ref('')
    const processor = ref('AMD')
    const ram = ref('')
    const storage = ref('')
    const screenSize = ref('')
    const os = ref('Windows')
    const graphics = ref('Nvidia')
    const description = ref('')

    const selectType = (type) => {
      selectedType.value = type
    }

    const addProduct = () => {
      // Implement product addition logic here
      console.log('Adding product:', {
        type: selectedType.value,
        name: productName.value,
        brand: brand.value,
        processor: processor.value,
        ram: ram.value,
        storage: storage.value,
        screenSize: screenSize.value,
        os: os.value,
        graphics: graphics.value,
        description: description.value,
        limitProduct: limitProduct.value,
        status: status.value
      })
    }

    return {
      productTypes,
      selectedType,
      limitProduct,
      status,
      productName,
      brand,
      processor,
      ram,
      storage,
      screenSize,
      os,
      graphics,
      description,
      selectType,
      addProduct
    }
  }
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style> -->
