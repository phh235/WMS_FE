<template>
 <div class="container-fluid mt-3 p-3">
    <div class="row">
      <div class="col-lg-5 col-md-6 col-sm-12">
        <form>
          <div class="mb-3 d-none">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="id"
                
                placeholder="ID"
              />
              <label for="id">ID</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="username"
               
                placeholder="Username"
              />
              <label for="username">Username</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                
                placeholder="Password"
              />
              <label for="password">Password</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="email"
                
                placeholder="Email"
              />
              <label for="email">Email</label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-floating">
              <select class="form-select" id="roleId" >
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
              <label for="roleId">RoleId</label>
            </div>
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-primary me-2" @click="">
              <span class="material-symbols-outlined"> add </span>
            </button>
            <button
              type="button"
              class="btn btn-upgrade me-2"
             
              @click=""
            >
              <span class="material-symbols-outlined"> upgrade </span>
            </button>
            <button type="button" class="btn btn-dark" @click="">
              <span class="material-symbols-outlined"> refresh </span>
            </button>
          </div>
        </form>
      </div>
    </div>
 </div>
</template>
<style scoped>
.table-col-id {
  width: 50px;
}
.table-col-username {
  width: 150px;
}
.table-col-password {
  width: 150px;
}
.table-col-email {
  width: 200px;
}
.table-col-roleId {
  width: 100px;
}
.table-col-actions {
  width: 100px;
  text-align: center;
}
.btn {
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 10px;
  color: #fff !important;
  outline: none;
  transition: all 0.2s;
  border: none;
}
.btn.btn-primary {
  background-color: #1f883d;
  &:hover,
  &:focus,
  &:active {
    background-color: #1c8139 !important;
  }
}
.btn.btn-upgrade {
  background-color: #3085d6;
  &:hover,
  &:focus,
  &:active {
    background-color: #2b77c0 !important;
  }
}
.btn.btn-danger {
  background-color: #d33;
  &:hover,
  &:focus,
  &:active {
    background-color: #c62e2e !important;
  }
}
.btn.btn-dark {
  background-color: #242424;
  &:hover,
  &:focus,
  &:active {
    background-color: #363636 !important;
  }
}
</style>
