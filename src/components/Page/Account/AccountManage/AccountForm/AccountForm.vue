<template>
  <div class="p-3">
    <form>
      <div class="mb-2 d-none">
        <label for="id">ID</label>
        <input type="text" class="form-control" id="id" />
      </div>
      <div class="mb-2">
        <label for="username">Tên người dùng</label>
        <input type="text" class="form-control" id="username" />
      </div>
      <div class="mb-2">
        <label for="password">Mật khẩu</label>
        <input type="password" class="form-control" id="password" />
      </div>
      <div class="mb-2">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" />
      </div>
      <div class="mb-2">
        <label for="roleId">Vai trò</label>
        <select class="form-select" id="roleId">
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
      </div>
      <div class="mb-2">
        <button type="button" class="btn btn-primary me-2" @click="">
          <span class="material-symbols-outlined"> add </span>
        </button>
        <button type="button" class="btn btn-secondary me-2" @click="">
          <span class="material-symbols-outlined"> upgrade </span>
        </button>
        <button type="button" class="btn btn-dark" @click="">
          <span class="material-symbols-outlined"> refresh </span>
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
label {
  font-size: 14px;
  font-weight: bold;
}
</style>
