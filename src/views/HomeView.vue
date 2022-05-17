<template>
  <ProfileView v-if="auth.type == 'studentAffair'" />
  <HomePage v-else />
</template>

<script lang="ts" setup>
import HomePage from "@/components/HomePage.vue";
import ProfileView from "@/components/ProfileView.vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<style></style>
