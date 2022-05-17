<template>
  <div v-if="auth.load" class="body">
    <Navbar v-if="auth.isLogin" />
    <RouterView />
  </div>
  <div v-else class="load">
    <img src="./assets/load.gif" alt="load" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Navbar from "./components/Navbar.vue";

const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.css";

.load {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
