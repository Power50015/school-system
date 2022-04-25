import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore,serverTimestamp } from "firebase/firestore";

import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  const auth = useAuthStore();
  if (user) {
    const q = query(
      collection(db, "doctors"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const q = query(
        collection(db, "studentAffair"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const q = query(
          collection(db, "students"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          auth.isLogin = true;
          auth.name = doc.data().name;
          auth.email = doc.data().email;
          auth.photo = doc.data().photo;

          auth.type = "students";
        });
      } else {
        querySnapshot.forEach((doc) => {
          auth.isLogin = true;
          auth.name = doc.data().name;
          auth.email = doc.data().email;
          auth.photo = doc.data().photo;
          auth.password = doc.data().password;
          auth.type = "studentAffair";
        });
      }
    } else {
      querySnapshot.forEach((doc) => {
        auth.isLogin = true;
        auth.name = doc.data().name;
        auth.email = doc.data().email;
        auth.photo = doc.data().photo;
        auth.type = "doctors";
      });
    }
  }
  auth.load = true;
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    name: "",
    email: "",
    photo: "",
    type: "",
    password: "",
    load: false,
  }),
  actions: {
    doctorLogin(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "doctors"),
            where("email", "==", email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.name = doc.data().name;
            this.email = doc.data().email;
            this.photo = doc.data().photo;
            this.type = "doctors";
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    studentAffairLogin(email: string, password: string) {
      this.load = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "studentAffair"),
            where("email", "==", email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.name = doc.data().name;
            this.email = doc.data().email;
            this.photo = doc.data().photo;
            this.password = doc.data().password;
            this.type = "studentAffair";
            this.load = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.load = true;
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.name = "";
        this.email = "";
        this.photo = "";
        this.type = "";
      });
    },
    addUser(
      name: string,
      email: string,
      photo: string,
      password: string,
      type: string
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Add a new document in collection "doctors"
          if (type == "teachers") {
            addDoc(collection(db, type), {
              name: name,
              email: email,
              photo: photo,
            });
          } else if (type == "students") {
            addDoc(collection(db, type), {
              name: name,
              email: email,
              photo: photo,
            });
          } else {
            addDoc(collection(db, type), {
              name: name,
              email: email,
              photo: photo,
              password:password
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      setTimeout(() => {
        signOut(auth).then(() => {
          signInWithEmailAndPassword(auth, this.email, this.password);
        });
      }, 1500);
    },
  },
});
