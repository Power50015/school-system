<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center">الصفحه الشخصيه</h2>
      <div to="/" class="w-100 text-center d-block">
        <img
          :src="auth.photo"
          alt="logo"
          width="150"
          height="150"
          class="rounded-circle"
        />
      </div>
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="studentAffairLogin">
            <div class="form-group">
              <label class="form-control-label">أسم المستخدم</label>
              <input type="text" class="form-control" v-model="name" :disabled="auth.type == 'students' || auth.type == 'teacher'" />
            </div>
            <div class="form-group">
              <label class="form-control-label">البريد الإلكترونى</label>
              <input
                type="text"
                class="form-control"
                v-model="auth.email"
                disabled
              />
            </div>
            <h3 v-if="auth.type == 'teacher'">المرتب : {{auth.salary}}</h3>
            <h3  v-if="auth.type == 'teacher'">تفاصيل المرتب : {{auth.salaryDes}}</h3>
            <!-- Start image-->
            <div class="mb-3" v-if="!auth.type == 'students'">
              <label for="formFile" class="form-label">الصورة الشخصيه</label>
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
                  حاله رفع الصوره :
                  <span v-if="imgUpload == 100">أكتمل</span>
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
            <div class="col-lg-12 loginbttm">
              <div class="col-lg-6 login-btm login-text">
                <!-- Error Message -->
              </div>
              <div class="col-lg-12 login-btm login-button">
                <div class="field">
                  <progress
                    class="progress is-small is-primary"
                    max="100"
                    v-show="isDisabled"
                  >
                    15%
                  </progress>
                  <button
                    type="submit"
                    class="btn btn-outline-primary"
                    v-show="!isDisabled"
                    v-if="!auth.type == 'students'"
                  >
                    تعديل البيانات
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import app from "@/firebase";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const router = useRouter();
const auth = useAuthStore();
const storage = getStorage();
const isDisabled = ref(false);
const img = ref(auth.photo);
const imgData = reactive([]);
const imgPreview = ref("");
const imgUpload = ref(0);

const name = ref<string>(auth.name);
const photo = ref(auth.photo);
function studentAffairLogin() {
  isDisabled.value = false;
  if (imgData.value == undefined) {
    auth.editUser(name.value, photo.value);
    router.push("/");
  } else {
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
          isDisabled.value = true;
          img.value = URL;
          auth.editUser(name.value, img.value);
          router.push("/");
        });
      }
    );
  }
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
