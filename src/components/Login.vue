<template>
  <div class="background-image">
    <v-container fluid class="bg-black py-10">
      <v-card class="mx-auto" max-width="600">
        <v-card-title class="px-8 py-5" primary-title>
          <h4 class="text-uppercase font-weight-bold">Εισοδος</h4>
        </v-card-title>
        <v-card-text class="px-8 py-4">
          <v-form @submit.prevent="login">
            <v-text-field v-model="userName" start-append prepend-icon="mdi-account" name="Username"
              :label="('username')" outlined dense></v-text-field>
            <v-text-field v-model="userPassword" start-append prepend-icon="mdi-lock" name="Password"
              :label="('password')" type="password" autocomplete="on" outlined dense></v-text-field>

            <v-card-actions class="justify-center">
              <v-btn :loading="loadingLogin" type="submit" color="blue" large class="rounded-pill" style="margin-left:9%" block>Εισοδος</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>


import { mapMutations } from 'vuex';

export default {
  name: "login",
  components: {
  },

  data: () => ({
    loadingLogin: false,
    userName: "",
    userPassword: "",
  }),
  methods: {
    ...mapMutations('user', ['setIsLoggedIn']),
    login() {
      this.$store.dispatch("user/authenticate", {
        username: this.userName,
        password: this.userPassword,
      }).then(() => {
        this.setIsLoggedIn(true)
        
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.v-card__actions {
  justify-content: space-between;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5%;
    background-color: #000000 !important;
    color: #ffffff;
    text-align: right !important;
}
.text-input {
  width: 100%;
  margin-bottom: 20px;
}
</style>
