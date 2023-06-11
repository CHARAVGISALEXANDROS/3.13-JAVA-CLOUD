<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <hr><br>
        <i>
          <h4>Welcome, {{ getUserName }} </h4>
        </i>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
  name: "Home",
  components: {

  },
  computed: {
    ...mapGetters('user', ['getUserName']),
  },
};
</script>
