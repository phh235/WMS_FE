<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-6">
        <AccountManage />
      </div>
      <div class="col-6">
        <AccountTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import AccountManage from "@components/Page/Account/AccountManage/AccountForm/index.vue";
import AccountTable from "@components/Page/Account/AccountManage/AccountTable/index.vue";
</script>
