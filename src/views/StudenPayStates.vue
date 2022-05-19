<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center mb-5">المدفوعات</h2>
      <div class="row">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>المريض</th>
                <th>تاريخ الحجز يوم</th>
                <th>تاريخ الحجز شهر</th>
                <th>معاد الحجز من : إلى</th>
                <th>حجز معمل تحاليل</th>
                <th>تم الحضور</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doctorsRequest in resrvationsData">
                <td @click="doctorsRequest.Usermodel = true">
                  {{ doctorsRequest.userName }}
                </td>
                <td>{{ doctorsRequest.day }}</td>
                <td>{{ doctorsRequest.month }}</td>
                <td>{{ doctorsRequest.time }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = doctorsRequest.docId"
                  >
                    حجز معمل تحاليل
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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


/*
getStudentsData();

async function getLaboratoryData() {
  laboratoryData.length = 0;

  const querySnapshot = await getDocs(collection(db, "laboratory"));

  querySnapshot.forEach((doc) => {
    laboratoryData.push({
      docId: doc.id,
      ...doc.data(),
    });
  });
}*/

async function editUser() {
  await setDoc(doc(db, "busExpense", id.value), {
    cairo: cairo.value,
    giza: giza.value,
    helwan: helwan.value,
  }).then(() => {
    createToast("تم حفظ ", {
      type: "success",
    });
    getBusData();
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
