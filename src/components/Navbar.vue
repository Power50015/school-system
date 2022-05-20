<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img src="../assets/logo.png" width="100"
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="auth.type == 'studentAffair'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="student"
              >الطلاب</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'studentAffair'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="accounter"
              >المحاسبون</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'studentAffair'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="studentAffair"
              >شئون طلاب</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'studentAffair'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="teacher"
              >الأساتذه</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'accounters'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="expense"
              >مصاريف الطلاب</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'accounters'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="bus-expense"
              >مصاريف الباصات</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'accounters'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="studen-pay-states"
              >المدفوعات</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'accounters'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="student"
              >مرتبات الأساتذه</router-link
            >
          </li>
          <li class="nav-item" v-if="auth.type == 'students'">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="student"
              >المصاريف الدراسيه</router-link
            >
          </li>
        </ul>
        <form class="d-flex mx-5">
          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="auth.photo"
                alt=""
                width="50"
                height="50"
                class="rounded-circle"
              />
              {{ auth.name }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/"
                  >الصفحه الشخصيه</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li @click="logout()" class="text-center dropdown-item btn">
                تسجيل الخروج
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/");
}
</script>

<style></style>
