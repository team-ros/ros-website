import Vue from "vue";
import VueRouter from "vue-router";
import loginVue from "../components/loginVue";
<<<<<<< Updated upstream
import dashboardWrapper from "../components/dashboardWrapper"
import impressum from '../components/impressum.vue';
=======
import dashboardWrapper from "../components/dashboardWrapper";
>>>>>>> Stashed changes

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: loginVue
  },
  {
    path: "/dashboard",
    name: "Dashboard",
<<<<<<< Updated upstream
    component: dashboardWrapper,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: impressum
=======
    component: dashboardWrapper
>>>>>>> Stashed changes
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active"
});

export default router;
