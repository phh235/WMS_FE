<template>
  <div class="d-flex w-50" style="padding-bottom: 15px">
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">
        <span class="material-symbols-outlined">search</span>
      </span>
      <input
        type="text"
        class="form-control"
        placeholder="Tìm kiếm"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
      <button
        class="btn btn-outline dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  padding: 8px;
}
.dropdown-item {
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.1s;
  &:hover {
    background-color: var(--secondary-color);
    padding: 8px;
  }
  &:focus {
    color: #000;
  }
}
input {
  font-size: 14px;
  border: 1px solid #dee2e6;
  &:focus,
  &:active {
    box-shadow: none;
    border: 1px solid #dee2e6;
  }
}
.btn-outline {
  outline: none;
  border: 1px solid #dee2e6;
  &:hover {
    background-color: #ebebeb;
    border: 1px solid #dee2e6;
  }
  &:active,
  &:focus {
    border: 1px solid #dee2e6;
  }
}
</style>
