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
    {
      path: "/accounter-login",
      name: "accounter-login",
      component: () => import("../views/AccounterLoginView.vue"),
    },
    {
      path: "/expense",
      name: "expense",
      component: () => import("../views/ExpenseView.vue"),
    },
    {
      path: "/bus-expense",
      name: "bus-expense",
      component: () => import("../views/BusExpenseView.vue"),
    },
    {
      path: "/studen-pay-states",
      name: "studen-pay-states",
      component: () => import("../views/StudenPayStates.vue"),
    },
    {
      path: "/student-login",
      name: "student-login",
      component: () => import("../views/StudentsLoginView.vue"),
    },
    {
      path: "/student-expense",
      name: "student-expense",
      component: () => import("../views/StudentsExpenseView.vue"),
    },
    {
      path: "/teacher-pay",
      name: "teacher-pay",
      component: () => import("../views/TeacherPayView.vue"),
    },
    {
      path: "/teacher-login",
      name: "teacher-login",
      component: () => import("../views/TeacherLoginView.vue"),
    },
  ],
});

export default router;
