/* eslint-disable no-unused-vars */
import router from "@/router/index.js";
import store from "@/state/store";
import axios from "axios";
import swal from "sweetalert";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default {
  namespaced: true,
  state: {
    authRequestBody: {
      username: "",
      password: "",
    },
    userRole: null,
    token: null,
    userId: " ",
    userName: " ",
    user: {},
    isLoggedIn: false,
  },

  mutations: {
    resetRole(state) {
      state.userRole = null;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    setUser(state, value) {
      state.user = JSON.parse(JSON.stringify(value));
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  },

  actions: {
    authenticate: ({ commit }, authRequestBody) => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8081/auth/authenticate", authRequestBody)
          .then((response) => {
            console.log(response);
            const token = response.data.jwt;
            const userName = authRequestBody.username; 
            localStorage.setItem("jwt", token);
            commit("retrieveToken", token);
            commit("setUserName", userName); 
            commit("setIsLoggedIn", true);
            resolve(true);
            router.push("/home");
          })
          .catch((error) => {
            swal("Incorrect credentials, please try again!");
            reject(error);
          });
      });
    },
    


    destroyToken: (context) => {
      return new Promise((resolve) => {
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        context.commit("destroyToken");
        context.commit("resetRole");
        sessionStorage.clear();
        resolve(true);
      });
    },
  },

  getters: {
    getUserRole(state) {
      return state.userRole;
    },
    loggedIn(state) {
      return state.token !== null;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
    getToken(state) {
      return state.token;
    },
  },
};
