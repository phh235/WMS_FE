<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-6">
        <AccountForm />
      </div>
      <div class="col-6">
        <AccountTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import AccountForm from "@components/Page/Account/AccountManage/AccountForm/AccountForm.vue";
import AccountTable from "@components/Page/Account/AccountManage/AccountTable/AccountTable.vue";
</script>
