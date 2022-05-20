<template>
  <div class="page">
    <div class="container my-5 p-5">
      <router-link to="/" class="w-100 text-center d-block"
        ><img
          src="../assets/School-System-logos_black.png"
          alt="logo"
          width="150"
      /></router-link>
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">تـسجيل الدخول طلاب</h2>
          <form @submit.prevent="studentLogin">
            <div class="form-group">
              <label class="form-control-label">البريد الإلكترونى</label>
              <input type="text" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label class="form-control-label">كلمه المرور</label>
              <input type="password" class="form-control" v-model="password" />
            </div>

            <div class="col-lg-12 loginbttm">
              <div class="col-lg-6 login-btm login-text">
                <!-- Error Message -->
              </div>
              <div class="col-lg-12 login-btm login-button">
                <button type="submit" class="btn btn-outline-primary">
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = useAuthStore();
const email = ref<string>("jhone@elkaber.com");
const password = ref<string>("jhone@elkaber.com");
function studentLogin() {
  auth.studentLogin(email.value, password.value);
  email.value = "";
  password.value = "";
  router.push("/");
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100%;
  display: flex;
}
.container {
  background-color: rgba(100, 100, 100, 0.3);
}
.image img {
  width: 750px;
  max-width: 100%;
}

.login-box {
  margin-top: 75px;
  height: auto;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 50px 15px 5px 15px;
}
.login-title {
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 15px;
  font-weight: bold;
}
.login-form {
  margin-top: 25px;
  text-align: left;
}
input {
  border: none;
  border-bottom: 2px solid #4550e3;
  border-top: 0px;
  border-radius: 0px;
  font-weight: bold;
  outline: 0;
  margin-bottom: 20px;
  padding-left: 0px;
  /* color: #ecf0f5; */
}
.form-group {
  margin-bottom: 40px;
  outline: 0px;
  text-align: right !important;
}
.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 2px solid #4550e3;
  outline: 0;
  /* color: #ecf0f5; */
}
input:focus {
  outline: none;
  box-shadow: 0 0 0;
}
label {
  margin-bottom: 0px;
}
.form-control-label {
  font-size: 10px;
  color: #000000;
  font-weight: bold;
  letter-spacing: 1px;
}
.btn-outline-primary {
  border-color: #101335;
  color: #101335;
  border-radius: 0px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  border-radius: 3px;
}
.btn-outline-primary:hover {
  background-color: #101335;
  color: #fff;
  right: 0px;
}
.login-btm {
  float: left;
}
.login-button {
  padding-right: 0px;
  text-align: right;
  margin-bottom: 25px;
}
.login-text {
  text-align: left;
  padding-left: 0px;
  color: #a2a4a4;
}
.loginbttm {
  padding: 0px;
}
</style>
