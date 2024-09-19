<template><div class="col-lg-7 col-md-6 col-sm-12">
    <div class="d-flex justify-content-end flex-wrap mb-2">
      <div class="input-group mb-3">
        <span class="input-group-text"
          ><span class="material-symbols-outlined"> search </span></span
        >
        <input
          type="text"
          class="form-control"
          id="search"
          placeholder="Search"
        
        />
        <select class="form-select" id="roleIdFilter" >
          <option value="">All</option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th class="table-col-id text-center">ID</th>
            <th class="table-col-username">Username</th>
            <th class="table-col-password">Password</th>
            <th class="table-col-email">Email</th>
            <th class="table-col-roleId">RoleId</th>
            <th class="table-col-actions text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr  style="text-align: center; font-style: italic">
            <td colspan="6">Not found</td>
          </tr>
          <tr
            
            style="cursor: pointer"
          >
            <td class="table-col-id text-center"></td>
            <td class="table-col-username"></td>
            <td class="table-col-password"></td>
            <td class="table-col-email"></td>
            <td class="table-coroleIdid"></td>
            <td class="table-col-actions text-center">
              <button class="btn btn-danger" @click="">
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div></template>
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

