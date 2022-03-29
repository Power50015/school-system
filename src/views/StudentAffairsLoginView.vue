<template>
  <div class="row">
    <h1 class="text-white text-center py-5">تسجيل الدخول للطالب</h1>
    <form @submit.prevent="studentAffairLogin()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">البريد الإلكترونى</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="userEmail"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">كلمه المرور</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="userPassword"
        />
      </div>
      <button type="submit" class="btn bg-primary bg-gradient w-100 text-white">تسجيل</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const userEmail = ref("");
const userPassword = ref("");

const btn = ref(false);

async function studentAffairLogin() {
    await auth.studentAffairLogin(
      userEmail.value,
      userPassword.value,
    );
    userEmail.value = "";
    userPassword.value = "";
    router.push("/profile");
  
}
</script>

<style>
</style>