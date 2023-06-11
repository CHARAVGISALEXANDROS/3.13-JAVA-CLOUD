import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Home from "../components/Home.vue";
import store from "@/state/store.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home,
    name: "home",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      if (store.getters["user/loggedIn"]) {
        next({ name: 'Home' });
      } else {
        next({ name: 'login' });
      }
    }
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: "/",
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["user/loggedIn"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
