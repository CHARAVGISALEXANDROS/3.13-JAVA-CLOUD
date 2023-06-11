import store from "@/state/store.js";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index.js";
import axios from "axios";

Vue.config.productionTip = false;


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      store.dispatch("user/destroyToken");
      router.push("/login").catch(() => {});
    }
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
