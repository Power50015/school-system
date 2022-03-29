<template>
  <Navbar />
  <main class="container my-2">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.css";
main {
  background-color: #565656c4;
  min-height: 88vh;
  border-radius: 50px;
}
</style>
