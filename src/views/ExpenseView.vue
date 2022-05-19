<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center mb-5">المصاريف</h2>
      <div class="row">
        <div class="col-12 col-md-2">
          <h6 class="">الصف الأول الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="one" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثانى الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="two" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثالث الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="three" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الرابع الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="four" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الخامس الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="five" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف السادس الإبتدائى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="six" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الأول الإعدادى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="one3dadi" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثانى الإعدادى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="two3dadi" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثالث الإعدادى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="three3dadi" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الأول الثانوى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="onethanwi" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثانى الثانوى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="twothanwi" />
          </h6>
        </div>
        <div class="col-12 col-md-2">
          <h6 class="">الصف الثالث الثانوى</h6>
          <h6 class="">
            <input type="number" class="w-100" v-model="threethanwi" />
          </h6>
        </div>
        <button
          type="submit"
          class="btn btn-outline-primary"
          @click="editUser()"
        >
          حفظ المصاريف
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const db = getFirestore();
const storage = getStorage();
const router = useRouter();
const auth = useAuthStore();

const id = ref();
const one = ref();
const two = ref();
const three = ref();
const four = ref();
const five = ref();
const six = ref();
const one3dadi = ref();
const two3dadi = ref();
const three3dadi = ref();
const onethanwi = ref();
const twothanwi = ref();
const threethanwi = ref();

getExpenseData();
async function getExpenseData() {
  const q = query(collection(db, "expense"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    id.value = doc.id;
    one.value = doc.data().one;
    two.value = doc.data().two;
    three.value = doc.data().three;
    four.value = doc.data().four;
    five.value = doc.data().five;
    six.value = doc.data().six;
    one3dadi.value = doc.data().one3dadi;
    two3dadi.value = doc.data().two3dadi;
    three3dadi.value = doc.data().three3dadi;
    onethanwi.value = doc.data().onethanwi;
    twothanwi.value = doc.data().twothanwi;
    threethanwi.value = doc.data().threethanwi;
  });
}

async function editUser() {
  await setDoc(doc(db, "expense", id.value), {
    one: one.value,
    two: two.value,
    three: three.value,
    four: four.value,
    five: five.value,
    six: six.value,
    one3dadi: one3dadi.value,
    two3dadi: two3dadi.value,
    three3dadi: three3dadi.value,
    onethanwi: onethanwi.value,
    twothanwi: twothanwi.value,
    threethanwi: threethanwi.value,
  }).then(() => {
    createToast("تم حفظ ", {
      type: "success",
    });
    getExpenseData();
  });
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
