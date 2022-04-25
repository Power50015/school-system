<template>
  <AdminDashbord v-if="auth.type == 'admins'"/>
  <DoctorDashbord v-if="auth.type == 'doctors'"/>

</template>

<script lang="ts" setup>
import AdminDashbord from "@/components/AdminDashbord.vue";
import DoctorDashbord from "@/components/DoctorDashbord.vue";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

</script>

<style>

</style>