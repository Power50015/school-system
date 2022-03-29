<template>
  <div class="row">
    <h1 class="text-white text-center py-5">الصفحه الشخصيه</h1>
   <div class="logo-section">
        <img
          :src="auth.img"
          width="200"
          height="200"
          class="rounded-circle"
        />
        <h3>{{auth.name}}</h3>
        <h3>{{auth.email}}</h3>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<style>
</style>