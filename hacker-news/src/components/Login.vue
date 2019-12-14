<template>
  <div id="main">
    <p> {{ authIssue }} </p>
    <form v-on:submit.prevent="loginUser"
      id="registerUserForm" method="POST">
        <label>Login:</label>
        <input type="text" v-model="user.login" name="login" required/>
        <label>Password:</label>
        <input type="password" v-model="user.password" name="password" required/>
        <input type="submit"
          class="btn btn-primary"
          value="Login"/>
    </form>
  </div>
</template>

<script lang="ts">
import { mapMutations } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'News',
  data() {
    return {
      user: {},
      authIssue: '',
    };
  },
  methods: {
    loginUser() {
      const uri = 'http://localhost:4000/auth/login';
      this.axios.post(uri, {
        params: this.user,
        headers: { withCredentials: true },
      })
        .then((response) => {
          console.log(response.data);
          if (typeof (response.data) === 'object') {
            // this.$router.push({ name: 'home' });
            // this.$router.go(0);
            this.logInUser(response.data);
          } else {
            this.authIssue = response.data;
          }
        });
    },
    ...mapMutations('User', {
      logInUser: 'setUser',
    }),
  },
});
</script>

<style scoped>
</style>
