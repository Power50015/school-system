import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
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
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  const auth = useAuthStore();
  if (user) {
    const q = query(
      collection(db, "studentAffair"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {
      auth.isLogin = true;
      auth.name = doc.data().name;
      auth.email = doc.data().email;
      auth.img = doc.data().img;
      auth.isloaded = true;
    });
  } else {
    auth.isloaded = true;
  }

  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isloaded: false,
    isLogin: false,
    name: "",
    email: "",
    img: "",
    fileUpload: 0,
  }),
  actions: {
    addUser(
      name: string,
      email: string,
      password: string,
      des: string,
      area: string,
      adrres: string,
      phone: string,
      img: string
    ): any {
      this.isloaded = false;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "hospitals"
          addDoc(collection(db, "restaurants"), {
            name: name,
            email: email,
            adrres: adrres,
            area: area,
            des: des,
            img: img,
            phone: phone,
          }).then((user) => {
            this.restaurantId = user.id;
            this.isLogin = true;
            this.restaurantName = name;
            this.restaurantEmail = email;
            this.restaurantAdrres = adrres;
            this.restaurantArea = area;
            this.restaurantDes = des;
            this.restaurantImg = img;
            this.restaurantPhone = phone;
            this.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
      return this.isLogin;
    },
    studentAffairLogin(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "studentAffair"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const auth = useAuthStore();
            auth.isLogin = true;
            auth.name = doc.data().name;
            auth.email = doc.data().email;
            auth.img = doc.data().adrres;
            auth.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    studentLogin(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "student"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const auth = useAuthStore();
            auth.isLogin = true;
            auth.name = doc.data().name;
            auth.email = doc.data().email;
            auth.img = doc.data().adrres;
            auth.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    teacherLogin(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "teacher"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const auth = useAuthStore();
            auth.isLogin = true;
            auth.name = doc.data().name;
            auth.email = doc.data().email;
            auth.img = doc.data().adrres;
            auth.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    accounterLogin(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "accounter"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const auth = useAuthStore();
            auth.isLogin = true;
            auth.name = doc.data().name;
            auth.email = doc.data().email;
            auth.img = doc.data().adrres;
            auth.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.name = "";
        this.email = "";
        this.img = "";
      });
    },
  },
});
