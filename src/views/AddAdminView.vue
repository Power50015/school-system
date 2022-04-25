<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">أضف شئون طالبه</div>

        <div class="col-lg-12 login-form">
          <div class="col-lg-12 login-form">
            <form @submit.prevent="saveUser">
              <div class="form-group">
                <label class="form-control-label">الأسم</label>
                <input type="text" class="form-control" v-model="name" />
              </div>
              <!-- Start image-->
              <div class="mb-3">
                <label for="formFile" class="form-label">الصوره</label>
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
                <label class="form-control-label">البريد الإلكترونى</label>
                <input type="text" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label class="form-control-label">كلمه السر</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
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
                    حفظ البيانات
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col col-lg-3" v-for="item in studentAffairData" :key="item.index">
        <div>
          <img
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            role="img"
            :src="item.photo"
          />
          <h2>{{ item.name }}</h2>
          <h6>{{ item.email }}</h6>
        </div>
      </div>
      <!-- /.col-lg-4 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
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
const password = ref<string>("");
const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const btn = ref(true);
const imgUpload = ref(0);
const studentAffairData = reactive([]);

getStudentAffairData();

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
        auth.addUser(
          name.value,
          email.value,
          imgURL.value,
          password.value,
          "studentAffair"
        );
        createToast("تم حفظ شئون طالبه", {
          type: "success",
        });
        setTimeout(() => {
          name.value = "";
          email.value = "";
          imgURL.value = "";
          password.value = "";
          imgPreview.value = "";
          imgUpload.value = 0;
          imgData.length = 0;
          getStudentAffairData();
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

async function getStudentAffairData() {
  studentAffairData.length = 0;
  const querySnapshot = await getDocs(collection(db, "studentAffair"));
  querySnapshot.forEach((doc) => {
    studentAffairData.push(doc.data());
  });
}
</script>

<style scoped>
.row {
  justify-content: center;
  align-content: center;
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
  text-align: right;
  /* color: #ecf0f5; */
}

.form-group {
  margin-bottom: 40px;
  outline: 0px;
  text-align: right;
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
  color: #6c6c6c;
  font-weight: bold;
  letter-spacing: 1px;
}

.btn-outline-primary {
  border-color: #4550e3;
  color: #4550e3;
  border-radius: 0px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  border-radius: 3px;
}

.btn-outline-primary:hover {
  background-color: #4550e3;
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
.col div {
  background: rgba(238, 238, 238, 0.397);
  padding: 17px 0;
  border-radius: 22px;
  margin-bottom: 15px;
}
</style>
