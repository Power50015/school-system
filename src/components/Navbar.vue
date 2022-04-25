<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand" v-if="!auth.isLogin"
        ><img src="@/assets/logo.png" alt="" srcset="" width="150"
      /></router-link>
      <router-link to="/dashbord" class="navbar-brand" v-if="auth.isLogin"
        ><img src="@/assets/logo.png" alt="" srcset="" width="150"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
          <li class="nav-item" v-if="!auth.isLogin">
            <router-link to="/" class="nav-link" aria-current="page"
              >الرئيسيه</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/admin-login"
              class="nav-link"
              aria-current="page"
              v-if="!auth.isLogin"
              >تسجيل الدخول شئون طلبه</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/doctor-login"
              class="nav-link"
              aria-current="page"
              v-if="!auth.isLogin"
              >تسجيل الدخول أستاذ</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/student-login"
              class="nav-link"
              aria-current="page"
              v-if="!auth.isLogin"
              >تسجيل الدخول طالب</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.isLogin">
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="auth.photo"
                  alt="mdo"
                  width="32"
                  height="32"
                  class="rounded-circle"
                />
                {{auth.name}}
              </a>
              <ul
                class="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
                style=""
              >
                <li>
                  <router-link class="dropdown-item" to="/"
                    >Home</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <span class="dropdown-item" @click="auth.logout"
                    >Sign out</span
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<style scoped>
.logout {
  cursor: pointer;
  color: #ff1d33 !important;
  font-weight: bold;
}
</style>
