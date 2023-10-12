import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/signup",
    name: "signup",
    component: () => import("./components/SignUp")
  },
  {
    path: "/",
    name: "login",
    component: () => import("./components/LogIn")
  },
  {
    path: "/patients",
    alias: "/patients",
    name: "patients",
    component: () => import("./components/PatientsList")
  },
  {
    path: "/patients/:id/vitals",
    name: "vitals",
    component: () => import("./components/VitalList")
  },
  // {
  //   path: "/add",
  //   name: "add",
  //   component: () => import("./components/AddPatient")
  // },
  {
    path: "/patients/:id/vitals/add",
    name: "vitals-add",
    component: () => import("./components/AddVital")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;