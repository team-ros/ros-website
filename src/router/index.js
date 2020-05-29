import Vue from "vue";
import VueRouter from "vue-router";
import Data from "../components/Data.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/data/",
    name: "Data",
    component: Data,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active",
});

export default router;
