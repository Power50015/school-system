<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center">إضافه طالب</h2>
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="saveUser">
            <div class="form-group">
              <label class="form-control-label">أسم الطالب</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <!-- Start image-->
            <div class="mb-3">
              <label for="formFile" class="form-label">صوره الطالب</label>
              <template v-if="imgPreview">
                <img
                  :src="imgPreview"
                  class="img-fluid"
                  height="300"
                  width="300"
                />
                <p class="mb-0">file name: {{ imgData.value.name }}</p>
                <p class="mb-0">
                  size: {{ Math.round(imgData.value.size / 1024) }}KB
                </p>
              </template>
              <div class="flex">
                <h6 class="mb-3 text-white">
                  حاله الصوره :
                  <span v-if="imgUpload == 100">100%</span>
                </h6>
              </div>
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/jpeg"
                @change="DetectFiles($event.target.files)"
              />
            </div>
            <!-- End image-->
            <div class="form-group">
              <label class="form-control-label">بريد الإلكترونى للطالب</label>
              <input type="text" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label class="form-control-label">كلمه المرور</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="form-group">
              <label class="form-control-label">السنه الدراسيه</label>
              <select class="form-control" v-model="studentClass">
                <option value="الصف الأول الإبتدائي">
                  الصف الأول الإبتدائي
                </option>
                <option value="الصف الثانى الإبتدائي">
                  الصف الثانى الإبتدائي
                </option>
                <option value="الصف الثالث الإبتدائي">
                  الصف الثالث الإبتدائي
                </option>
                <option value="الصف الرابع الإبتدائي">
                  الصف الرابع الإبتدائي
                </option>
                <option value="الصف الخامس الإبتدائي">
                  الصف الخامس الإبتدائي
                </option>
                <option value="الصف السادس الإبتدائي">
                  الصف السادس الإبتدائي
                </option>
                <option value="الصف الأول الإعدادى">الصف الأول الإعدادى</option>
                <option value="الصف الثانى الإعدادى">
                  الصف الثانى الإعدادى
                </option>
                <option value="الصف الثالث الإعدادى">
                  الصف الثالث الإعدادى
                </option>
                <option value="الصف الأول الثانوى">الصف الأول الثانوى</option>
                <option value="الصف الثانى الثانوى">الصف الثانى الثانوى</option>
                <option value="الصف الثالث الثانوى">الصف الثالث الثانوى</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-control-label">العنوان</label>
              <select class="form-control" v-model="address">
                <option value="cairo">القاهره</option>
                <option value="giza">الجيزه</option>
                <option value="helwan">حلوان</option>
              </select>
            </div>
            <div class="col-lg-12 loginbttm">
              <div class="col-lg-6 login-btm login-text">
                <!-- Error Message -->
              </div>
              <div class="col-lg-12 login-btm login-button">
                <button
                  type="submit"
                  class="btn btn-outline-primary"
                  :disabled="!btn"
                >
                  حفظ الطالب
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row text-center">
        <div
          class="col col-lg-3"
          v-for="item in studentsData"
          :key="item.index"
        >
          <div>
            <img
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              role="img"
              :src="item.photo"
            />
            <h2>{{ item.name }}</h2>
            <h4>{{ item.email }}</h4>
            <h6>{{ item.class }}</h6>
            <h6>{{ item.address }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
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
const name = ref<string>("");
const email = ref<string>("");
const studentClass = ref("");
const password = ref<string>("");
const address = ref<string>("cairo");
const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const btn = ref(true);
const imgUpload = ref(0);
const studentsData = reactive([]);
getStudentsData();
function saveUser() {
  btn.value = false;
  const storageRef = refire(storage, `${imgData.value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData.value);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        btn.value = true;
        imgURL.value = URL;
        auth.addStudents(
          name.value,
          email.value,
          imgURL.value,
          password.value,
          studentClass.value,
          address.value
        );

        setTimeout(() => {
          name.value = "";
          email.value = "";
          imgURL.value = "";
          password.value = "";
          imgPreview.value = "";
          imgUpload.value = 0;
          imgData.length = 0;
          studentClass.value = "";
          address.value = "";
          getStudentsData();
        }, 1500);
        // router.push("/dashbord");
      });
    }
  );
}
function DetectFiles(input) {
  imgData.value = input[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target.result;
    };
    reader.readAsDataURL(input[0]);
  }
}
async function getStudentsData() {
  studentsData.length = 0;
  const q = query(collection(db, "students"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    studentsData.push(doc.data());
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
