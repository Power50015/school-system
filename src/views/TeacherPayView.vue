<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center mb-5">المدفوعات</h2>
      <div class="row">
        <table class="table is-bordered is-striped is-truncated text-center">
          <thead>
            <tr>
              <th>الطالب</th>
              <th>المصاريف الدراسيه</th>
              <th>تفاصيل المرتب</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teacherData">
              <td
                data-bs-toggle="modal"
                :data-bs-target="`#exampleModal${teacher.docId}`"
              >
                {{ teacher.name }}
              </td>
              <td>
                {{ teacher.email }}
              </td>
              <td>
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  :data-bs-target="`#salaryModal${teacher.docId}`"
                >
                  تفاصيل المرتب
                </button>
              </td>

              <!--Teache Data Modal -->
              <div
                class="modal fade"
                :id="`exampleModal${teacher.docId}`"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        بيانات الطالب
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div class="modal-body">
                      <img
                        :src="teacher.photo"
                        :alt="teacher.name"
                        width="150"
                        height="150"
                        class="rounded-circle"
                      />
                      <h3>{{ teacher.name }}</h3>
                      <h4>{{ teacher.email }}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal -->
              <div
                class="modal fade"
                :id="`salaryModal${teacher.docId}`"
                tabindex="-1"
                aria-labelledby="salaryModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="salaryModalLabel">
                        {{ teacher.name }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h5>المرتب : {{ teacher.salary }}</h5>
                      <p>{{ teacher.salaryDes }}</p>

                      <input
                        type="number"
                        placeholder="المترب"
                        class="w-100"
                        v-model="salary"
                      />
                      <textarea class="w-100" v-model="salaryDes"></textarea>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        @click="editSalary(teacher.docId)"
                      >
                        حفظ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const db = getFirestore();
const storage = getStorage();
const router = useRouter();
const auth = useAuthStore();

const teacherData = reactive([]);

const salary = ref();
const salaryDes = ref();

getTeacherData();

async function getTeacherData() {
  teacherData.length = 0;
  const querySnapshot = await getDocs(collection(db, "teacher"));
  querySnapshot.forEach(async (doc) => {
    teacherData.push({
      docId: doc.id,
      ...doc.data(),
    });
  });
}

async function editSalary(id: string) {
  await updateDoc(doc(db, "teacher", id), {
    salary: salary.value,
    salaryDes: salaryDes.value,
  }).then(() => {
    getTeacherData();
    salary.value = "";
    salaryDes.value = "";
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
