<template>
  <h1 class="text-white text-center py-5">تسجيل للدخول للوحه التحكم</h1>
  <div class="row text-center text-white">
    <div class="col-12 col-md-4 p-2">
      <router-link class="card p-5 bg-success bg-gradient" to="/student-login">
        <h5>طالب</h5>
      </router-link>
    </div>
    <div class="col-12 col-md-4 p-2">
      <router-link class="card p-5 bg-danger bg-gradient"  to="/accounter-login">
        <h5>محاسب</h5>
      </router-link>
    </div>
    <div class="col-12 col-md-4 p-2">
      <router-link class="card p-5 bg-primary bg-gradient"  to="/student-affairs-login">
        <h5>شئون طلاب</h5>
      </router-link>
    </div>
    <div class="col-12 p-2 mt-5">
      <router-link class="card p-5 bg-secondary bg-gradient"  to="/teacher-login">
        <h4>مدرس</h4>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>
<style scoped>
.card{
  text-decoration: none;
  color: white;
}
</style>