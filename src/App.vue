<template>
  <Loading v-if="!auth.load" />
  <div v-if="auth.load">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Loading from "./components/loading.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.css";
</style>
