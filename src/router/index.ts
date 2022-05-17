import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/admin-login",
      name: "admin-login",
      component: () => import("../views/AdminLoginView.vue"),
    },
    {
      path: "/student",
      name: "student",
      component: () => import("../views/StudentsView.vue"),
    },
    {
      path: "/accounter",
      name: "accounter",
      component: () => import("../views/AccounterView.vue"),
    },
    {
      path: "/studentAffair",
      name: "studentAffair",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/teacher",
      name: "teacher",
      component: () => import("../views/TeacherView.vue"),
    },
  ],
});

export default router;
