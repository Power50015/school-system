<template>
  <div class="page">
    <div class="container my-5 p-5">
      <h2 class="text-center mb-5">المدفوعات</h2>
      <div class="row">
        <div class="col-12 col-lg-6 text-center">
          <h3>مصاريف الدراسه</h3>
          <h3>{{ expance }}</h3>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            v-if="expanceState == '0'"
          >
            الدفع أون لابن
          </button>
          <h3 v-else class="text-success">تم {{ expanceState }}</h3>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    دفع مصارف الدراسه
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {{ expance }}
                  <input name="name" placeholder="name" class="w-100" />
                  <br />
                  <input name="name" placeholder="number" class="w-100" />
                  <input name="name" placeholder="cvv" class="w-100" />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="editExpanceStates"
                  >
                    اتمام الدفع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 text-center">
          <h3>مصاريف الباص</h3>
          <h3>{{ bus }}</h3>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalx"
            v-if="busExpanceStates == '0'"
          >
            الدفع أون لابن
          </button>
          <h3 v-else class="text-success">تم {{ busExpanceStates }}</h3>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalx"
            tabindex="-1"
            aria-labelledby="exampleModalxLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    دفع مصارف الباص
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {{ bus }}
                  <input name="name" placeholder="name" class="w-100" />
                  <br />
                  <input name="name" placeholder="number" class="w-100" />
                  <input name="name" placeholder="cvv" class="w-100" />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="editBusExpanceStates('الدفع أونلاين')"
                  >
                    اتمام الدفع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

const studentsData = reactive([]);

const docId = ref("");
const expance = ref();
const expanceState = ref();
const busExpanceStates = ref();
const bus = ref();

getStudentsData();

async function getStudentsData() {
  const q = query(collection(db, "students"), where("email", "==", auth.email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    docId.value = doc.id;
    expance.value = await getExpenseData(doc.data().class);
    expanceState.value = doc.data().expanceStates;
    bus.value = await getBusData(doc.data().address);
    busExpanceStates.value = doc.data().busExpanceStates;
  });
}

async function getExpenseData(studentYear: any) {
  let Expense;
  const querySnapshot = await getDocs(collection(db, "expense"));

  querySnapshot.forEach((doc) => {
    switch (studentYear) {
      case "الصف الأول الإبتدائي":
        Expense = doc.data().one;
        break;
      case "الصف الثانى الإبتدائي":
        Expense = doc.data().two;
        break;
      case "الصف الثالث الإبتدائي":
        Expense = doc.data().three;
        break;
      case "الصف الرابع الإبتدائي":
        Expense = doc.data().four;
        break;
      case "الصف الخامس الإبتدائي":
        Expense = doc.data().five;
        break;
      case "الصف السادس الإبتدائي":
        Expense = doc.data().six;
        break;
      case "الصف الأول الإعدادى":
        Expense = doc.data().one3dadi;
        break;
      case "الصف الثانى الإعدادى":
        Expense = doc.data().two3dadi;
        break;
      case "الصف الثالث الإعدادى":
        Expense = doc.data().three3dadi;
        break;
      case "الصف الأول الثانوى":
        Expense = doc.data().onethanwi;
        break;
      case "الصف الثانى الثانوى":
        Expense = doc.data().twothanwi;
        break;
      case "الصف الثالث الثانوى":
        Expense = doc.data().threethanwi;
        break;
    }
  });
  return Expense;
}

async function getBusData(studentAdress: any) {
  let Expense;
  const querySnapshot = await getDocs(collection(db, "busExpense"));

  querySnapshot.forEach((doc) => {
    switch (studentAdress) {
      case "cairo":
        Expense = doc.data().cairo;
        break;
      case "giza":
        Expense = doc.data().giza;
        break;
      case "helwan":
        Expense = doc.data().helwan;
        break;
    }
  });
  return Expense;
}

async function editExpanceStates() {
  await updateDoc(doc(db, "students", docId.value), {
    expanceStates: "دفع إلكترونى",
  }).then(() => {
    getStudentsData();
    createToast("تم الدفع", {
      type: "success",
    });
  });
}

async function editBusExpanceStates(state: string) {
  await updateDoc(doc(db, "students", docId.value), {
    busExpanceStates: state,
  }).then(() => {
    getStudentsData();
    createToast("تم الدفع", {
      type: "success",
    });
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
