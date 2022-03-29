import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/accounter-login",
      name: "accounter-login",
      component: () => import("../views/AccounterLoginView.vue"),
    },
    {
      path: "/student-login",
      name: "student-login",
      component: () => import("../views/StudentLoginView.vue"),
    },
    {
      path: "/teacher-login",
      name: "teacher-login",
      component: () => import("../views/TeacherLoginView.vue"),
    },
    {
      path: "/student-affairs-login",
      name: "student-affairs-login",
      component: () => import("../views/StudentAffairsLoginView.vue"),

    },
    {
      path: "/student-affairs-dashbord",
      name: "student-affairs-dashbord",
      component: () => import("../views/StudentDashbordView.vue"),//

    },
  ],
});

export default router;
